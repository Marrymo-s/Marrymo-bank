package site.marrymo.restapi.moneygift_history.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.card.exception.CardErrorCode;
import site.marrymo.restapi.card.exception.CardException;
import site.marrymo.restapi.card.repository.CardRepository;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.moneygift_history.dto.request.MoBankTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoneyInfo;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.moneygift_history.entity.Moneygift;
import site.marrymo.restapi.moneygift_history.repository.MoneygiftRepository;
import site.marrymo.restapi.open_banking.dto.response.MoBankAccountResponse;
import site.marrymo.restapi.open_banking.dto.response.MoBankTokenApiResponse;
import site.marrymo.restapi.open_banking.service.MoBankService;
import site.marrymo.restapi.user.dto.Who;
import site.marrymo.restapi.user.dto.response.UserGetResponse;
import site.marrymo.restapi.user.dto.response.UserInfoResponse;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
    private final CardRepository cardRepository;
    private final WebClient moBankWebClient = WebClient.builder().baseUrl("http://3.37.251.197/api/").build();

    public MoneygiftGetResponse getMoneygiftInfo(Long userSequence) {
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

        // 메리모 은행에 접근하기 위한 token 발급
        MoBankTokenApiResponse moBankToken = moBankService.callMoBankTokenApi();

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
                .tranMsg("[메리모] 축의금 정산")
                .build();

        // 송금을 각자 받을 경우
        if (userInfoResponse.getIsGroomOnce() && userInfoResponse.getIsBrideOnce()){
            if (moneygiftTransferRequest.getGuestType()==GuestType.GROOM){
                moBankTransferRequest.toBuilder()
                        .receiverName(userInfoResponse.getGroomName())
                        .receiverAccountNum(userInfoResponse.getGroomAccount())
                        .build();
            }
            else if(moneygiftTransferRequest.getGuestType()==GuestType.BRIDE){
                moBankTransferRequest.toBuilder()
                        .receiverName(userInfoResponse.getBrideName())
                        .receiverAccountNum(userInfoResponse.getBrideAccount())
                        .build();
            }
        }
        // 신랑 계좌로만 돈을 받을 경우
        else if (userInfoResponse.getIsGroomOnce()){
            moBankTransferRequest.toBuilder()
                    .receiverName(userInfoResponse.getGroomName())
                    .receiverAccountNum(userInfoResponse.getGroomAccount())
                    .build();
        }
        // 신부 계좌로만 돈을 받을 경우
        else if (userInfoResponse.getIsBrideOnce()){
            moBankTransferRequest.toBuilder()
                    .receiverName(userInfoResponse.getBrideName())
                    .receiverAccountNum(userInfoResponse.getBrideAccount())
                    .build();
        }
        return moBankService.sendMoney(moneygiftTransferRequest);
    }
}
