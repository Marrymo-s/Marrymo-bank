package site.marrymo.restapi.moneygift_history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.moneygift_history.entity.Moneygift;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wishitem.entity.WishItem;

import java.util.List;

public interface MoneygiftRepository extends JpaRepository<Moneygift, Long> {
    List<Moneygift> findByUser(User user);
    List<Moneygift> findByUserAndWishItem(User user, WishItem wishItem);
}
