package site.marrymo.restapi.wishitem.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.dto.request.WishItemRegistRequest;
import site.marrymo.restapi.wishitem.dto.response.WishItemEach;
import site.marrymo.restapi.wishitem.dto.response.WishItemGetResponse;
import site.marrymo.restapi.wishitem.entity.WishItem;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class WishItemService {
    private final UserRepository userRepository;
    private final WishItemRepository wishItemRepository;

    //아직 accessToken 없어서 userSequence 파라미터로 넣는 걸로
    public void registWishItem(Long userSequence, WishItemRegistRequest wishItemRegistRequest) {
        //사용자 조회
        User user = userRepository.findByUserSequence(userSequence)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUNT));

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
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUNT));

        //여기 에러 바꾸기
        //2. user로 WishItem 엔티티 목록 조회
        List<WishItem> items = wishItemRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wish items not found"));

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
}
