package site.marrymo.restapi.wishitem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.wishitem.entity.WishItem;

public interface WishItemRepository extends JpaRepository<WishItem, Long> {

}
