package site.marrymo.restapi.wishitem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wishitem.entity.WishItem;

import java.util.List;
import java.util.Optional;

public interface WishItemRepository extends JpaRepository<WishItem, Long> {
    //db참조가 아니라 메서드로 찾아오기 user로 wishItem 찾아서 리스트로 반환
    //optional은 null을 자동으로 검사해줌
    //optional은 list일때는, 빈 list 받아와줌
    //원래는 findById가 기본으로 제공, 우리는 userSequence를 써서 선언해줘야 함.
    List<WishItem> findByUser(User user);
    Optional<WishItem>  findByWishItemSequenceAndUser(Long wishItemSequence, User user);
}
