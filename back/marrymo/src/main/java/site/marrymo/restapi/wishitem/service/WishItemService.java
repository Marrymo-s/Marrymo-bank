package site.marrymo.restapi.wishitem.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wishitem.dto.request.WishItemRegistRequest;
import site.marrymo.restapi.wishitem.entity.WishItem;
import site.marrymo.restapi.wishitem.repository.WishItemRepository;

import java.util.List;

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


}
