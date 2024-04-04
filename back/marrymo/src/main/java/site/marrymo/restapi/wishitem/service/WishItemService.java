package site.marrymo.restapi.wishitem.service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.moneygift_history.entity.Moneygift;
import site.marrymo.restapi.moneygift_history.repository.MoneygiftRepository;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.dto.request.WishItemDeleteRequest;
import site.marrymo.restapi.wishitem.dto.request.WishItemRegistRequest;
import site.marrymo.restapi.wishitem.dto.response.WishItemDetailResponse;
import site.marrymo.restapi.wishitem.dto.response.WishItemEach;
import site.marrymo.restapi.wishitem.dto.response.WishItemGetResponse;
import site.marrymo.restapi.wishitem.entity.WishItem;
import site.marrymo.restapi.wishitem.exception.WishItemErrorCode;
import site.marrymo.restapi.wishitem.exception.WishItemException;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class WishItemService {
    private final UserRepository userRepository;
    private final WishItemRepository wishItemRepository;
    private final MoneygiftRepository moneygiftRepository;

    //아직 accessToken 없어서 userSequence 파라미터로 넣는 걸로
    public void registWishItem(UserDTO userDTO, WishItemRegistRequest wishItemRegistRequest) {
        //사용자 조회
        User user = userRepository.findByUserSequence(userDTO.getUserSequence())
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //WishItem 생성 및 저장
        WishItem wishItem = WishItem.builder()
                .user(user)
                .name(wishItemRegistRequest.getName())
                .price(wishItemRegistRequest.getPrice())
                .img(wishItemRegistRequest.getImg())
                .build();

        wishItemRepository.save(wishItem);
    }

    public WishItemGetResponse getWishItems(String userCode) {
        //1. userCode로 사용자 조회
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //여기 에러 바꾸기
        //2. user로 WishItem 엔티티 목록 조회
        List<WishItem> items = wishItemRepository.findByUser(user);

        //3. WishItem 엔티티 -> WishItemEach dto로 변환
        //4. WishItem들을 리스트에 추가
        List<WishItemEach> wishItemEachList = items.stream().map(item -> WishItemEach.builder()
                        .wishItemSequence(item.getWishItemSequence())
                        .name(item.getName())
                        .price(item.getPrice())
                        .img(item.getImg())
                        .build())
                .collect(Collectors.toList());

        //5. WishItemGetResponse 객체에 설정, 반환
        return WishItemGetResponse.builder()
                .items(wishItemEachList)
                .build();
    }

    public WishItemDetailResponse getWishItemDetail(String userCode, Long wishItemSequence) {
        //1. userCode로 사용자 조회
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //2. wishItemSequence로 wishItem 조회
        WishItem wishItem = wishItemRepository.findByWishItemSequenceAndUser(wishItemSequence, user)
                .orElseThrow(() -> new WishItemException(WishItemErrorCode.WISH_ITEM_NOT_FOUNT_FOR_USER));

        //3. user와 wishItem으로 moneygift 내역 list로 가져오기
        List<Moneygift> moneygiftList = moneygiftRepository.findByUserAndWishItem(user, wishItem);

        //4. moneygiftList에서 amount 합산하여 fund 계산
        int fund = moneygiftList.stream()
                .mapToInt(Moneygift::getAmount)
                .sum();

        long person=moneygiftList.stream()
                .count();

        //5. 반환
        return WishItemDetailResponse.builder()
                .wishItemSequence(wishItem.getWishItemSequence())
                .name(wishItem.getName())
                .fund(fund)
                .person(person)
                .price(wishItem.getPrice())
                .img(wishItem.getImg())
                .build();
    }

    public void deleteWishItem(UserDTO userDTO, WishItemDeleteRequest wishItemDeleteRequest) {
        //사용자 조회
        User user = userRepository.findByUserSequence(userDTO.getUserSequence())
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        //wishItemSequence로 wishItem 조회
        WishItem wishItem = wishItemRepository.findByWishItemSequenceAndUser(wishItemDeleteRequest.getWishItemSequence(), user)
                .orElseThrow(() -> new WishItemException(WishItemErrorCode.WISH_ITEM_NOT_FOUNT_FOR_USER));

        wishItemRepository.delete(wishItem);
    }
}
