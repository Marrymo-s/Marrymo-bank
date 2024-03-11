package site.marrymo.restapi.wishitem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wishitem.entity.WishItem;

import java.util.List;
import java.util.Optional;

public interface WishItemRepository extends JpaRepository<WishItem, Long> {
    //db참조가 아니라 메서드로 찾아오기 user로 찾아고기
    //optional은 null을 자동으로 검사해줌
    Optional<List<WishItem>> findByUser(User user);
}
