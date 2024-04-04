package site.marrymo.restapi.moneygift_history.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.card.exception.CardErrorCode;
import site.marrymo.restapi.card.exception.CardException;
import site.marrymo.restapi.card.repository.CardRepository;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.moneygift_history.dto.request.MoBankTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoBankTransferResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneyInfo;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.moneygift_history.entity.Moneygift;
import site.marrymo.restapi.moneygift_history.repository.MoneygiftRepository;
import site.marrymo.restapi.bank.service.MoBankService;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.dto.response.UserInfoResponse;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.entity.WishItem;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MoneygiftService {

    @Value("${mo-bank.client_name}")
    String clientName;

    @Value("${mo-bank.client_account}")
    String clientAccount;

    private final MoBankService moBankService;
    private final UserRepository userRepository;
    private final MoneygiftRepository moneygiftRepository;
    private final WishItemRepository wishItemRepository;
    private final CardRepository cardRepository;
    private final WebClient moBankWebClient = WebClient.builder().baseUrl("http://3.37.251.197/api/").build();

    public MoneygiftGetResponse getMoneygiftInfo(UserDTO userDTO) {
        Long userSequence = userDTO.getUserSequence();

        User user = userRepository.findByUserSequence(userSequence)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //탈퇴한 회원인지 확인
        if (user.getDeletedAt() != null) {
            throw new UserException(UserErrorCode.USER_ALREADY_DELETE);
        }

        List<Moneygift> moneygiftList = moneygiftRepository.findByUser(user);

        long moneygiftListSum = 0L;
        long wishItemListSum = 0L;
        long totalSum = 0L;
        List<MoneyInfo> moneyInfoList = new ArrayList<>();

        for (Moneygift moneygift : moneygiftList) {
            int amount = moneygift.getAmount();
            GuestType guestType = moneygift.getGuestType();
            String guestTypeToStr = "";

            if (guestType == GuestType.GROOM)
                guestTypeToStr = "신랑";
            else if (guestType == GuestType.BRIDE)
                guestTypeToStr = "신부";

            //축의금이면
            if (moneygift.getType() == Type.CASH) {
                moneygiftListSum += amount;

                moneyInfoList.add(
                        MoneyInfo.builder()
                                .moneygiftSequence(moneygift.getMoneygiftSequence())
                                .userSequence(userSequence)
                                .type(moneygift.getType())
                                .sender(moneygift.getSender())
                                .amount(amount)
                                .relationship(moneygift.getRelationship())
                                .guestType(guestTypeToStr)
                                .build()
                );
            }
            //펀딩이면
            else if (moneygift.getType() == Type.ITEM) {
                wishItemListSum += amount;

                moneyInfoList.add(
                        MoneyInfo.builder()
                                .moneygiftSequence(moneygift.getMoneygiftSequence())
                                .userSequence(userSequence)
                                .wishItemSequence(moneygift.getWishItem().getWishItemSequence())
                                .type(moneygift.getType())
                                .sender(moneygift.getSender())
                                .amount(amount)
                                .relationship(moneygift.getRelationship())
                                .wishItemName(moneygift.getWishItem().getName())
                                .guestType(guestTypeToStr)
                                .build()
                );
            }

            totalSum += amount;
        }

        return MoneygiftGetResponse.builder()
                .moneygiftListSum(moneygiftListSum)
                .wishItemListSum(wishItemListSum)
                .totalSum(totalSum)
                .moneyList(moneyInfoList)
                .build();
    }

    public MoneygiftTransferResponse sendMoneygift(MoneygiftTransferRequest moneygiftTransferRequest) {


        // userCode로 송금 보낼 사람을 찾는다.
        User user = userRepository.findByUserCode(moneygiftTransferRequest.getUserCode())
                .orElseThrow(()-> new UserException(UserErrorCode.USER_NOT_FOUND));

        Card card = cardRepository.findByUser(user)
                .orElseThrow(() -> new CardException(CardErrorCode.CARD_NOT_FOUND));

        // 신랑 이름과 신부 이름을 구한다.
        UserInfoResponse userInfoResponse = UserInfoResponse.toDto(user, card);

        // 송금하는 사람은 메리모 정보로 통일
        MoBankTransferRequest moBankTransferRequest=MoBankTransferRequest
                .builder()
                .senderName(clientName)
                .senderAccountNum(clientAccount)
                .tranAmt(moneygiftTransferRequest.getAmount())
                .tranMsg("[메리모] "+moneygiftTransferRequest.getSender() + "송금")
                .build();
        // 송금을 각자 받을 경우
        if (userInfoResponse.getIsGroomOnce() && userInfoResponse.getIsBrideOnce()){
            if (moneygiftTransferRequest.getGuestType()==GuestType.GROOM){
                moBankTransferRequest=moBankTransferRequest.toBuilder()
                        .receiverName(userInfoResponse.getGroomName())
                        .receiverAccountNum(userInfoResponse.getGroomAccount())
                        .build();
            }
            else if(moneygiftTransferRequest.getGuestType()==GuestType.BRIDE){
                moBankTransferRequest=moBankTransferRequest.toBuilder()
                        .receiverName(userInfoResponse.getBrideName())
                        .receiverAccountNum(userInfoResponse.getBrideAccount())
                        .build();
            }
        }
        // 신랑 계좌로만 돈을 받을 경우
        else if (userInfoResponse.getIsGroomOnce()){
            moBankTransferRequest=moBankTransferRequest.toBuilder()
                    .receiverName(userInfoResponse.getGroomName())
                    .receiverAccountNum(userInfoResponse.getGroomAccount())
                    .build();
        }
        // 신부 계좌로만 돈을 받을 경우
        else if (userInfoResponse.getIsBrideOnce()){
            moBankTransferRequest=moBankTransferRequest.toBuilder()
                    .receiverName(userInfoResponse.getBrideName())
                    .receiverAccountNum(userInfoResponse.getBrideAccount())
                    .build();
        }
        try{
            MoBankTransferResponse moBankTransferResponse=moBankService.sendMoney(moBankTransferRequest);

        }catch (WebClientResponseException e){
            e.printStackTrace();
        }
        // 메리모 moneygift history 데이터베이스에 저장할 entity를 만든다.
        User receiver = userRepository.findByUserCode(userInfoResponse.getUserCode())
                .orElseThrow(()->new UserException(UserErrorCode.USER_NOT_FOUND));

        WishItem wishItem=null;
        if (moneygiftTransferRequest.getType()==Type.ITEM){
            wishItem =wishItemRepository.findByWishItemSequenceAndUser(moneygiftTransferRequest.getWishItemSequence(), user)
                    .orElseThrow(()->new NoSuchElementException("찾을 수 없는 위시아이템입니다. 위시 아이템 sequence 혹은 사용자를 확인해주세요"));
        }


        Moneygift moneygift = new Moneygift(receiver,
                wishItem,
                moneygiftTransferRequest.getGuestType(),
                moneygiftTransferRequest.getType(),
                moneygiftTransferRequest.getAmount(),
                moneygiftTransferRequest.getRelationship(),
                moneygiftTransferRequest.getSender());

        Moneygift savedMoneygift = moneygiftRepository.save(moneygift);
        MoneygiftTransferResponse moneygiftTransferResponse = MoneygiftTransferResponse.builder()
                .amount(savedMoneygift.getAmount())
                .relationship(savedMoneygift.getRelationship())
                .guestType(savedMoneygift.getGuestType())
                .type(savedMoneygift.getType())
                .guestType(savedMoneygift.getGuestType())
                .build();

        return moneygiftTransferResponse;
    }
}
