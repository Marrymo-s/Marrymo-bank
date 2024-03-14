package site.marrymo.restapi.moneygift_history.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.moneygift_history.dto.response.MoneyInfo;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.entity.Moneygift;
import site.marrymo.restapi.moneygift_history.repository.MoneygiftRepository;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MoneygiftService {
    private final UserRepository userRepository;
    private final MoneygiftRepository moneygiftRepository;

    public MoneygiftGetResponse getMoneygiftInfo(Long userSequence){
        User user = userRepository.findByUserSequence(userSequence)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //탈퇴한 회원인지 확인
        if(user.getDeletedAt() != null){
            throw new UserException(UserErrorCode.USER_ALREADY_DELETE);
        }

        List<Moneygift> moneygiftList = moneygiftRepository.findByUser(user);

        long moneygiftListSum = 0L;
        long wishItemListSum = 0L;
        long totalSum = 0L;
        List<MoneyInfo> moneyInfoList = new ArrayList<>();

        for(Moneygift moneygift : moneygiftList){
            int amount = moneygift.getAmount();
            GuestType guestType = moneygift.getGuestType();
            String guestTypeToStr = "";

            if(guestType == GuestType.GROOM)
                guestTypeToStr = "신랑";
            else if(guestType == GuestType.BRIDE)
                guestTypeToStr = "신부";

            //축의금이면
            if(moneygift.getType() == Type.CASH) {
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
            else if(moneygift.getType() == Type.ITEM) {
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
}
