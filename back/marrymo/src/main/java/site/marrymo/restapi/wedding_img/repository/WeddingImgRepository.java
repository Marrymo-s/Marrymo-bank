package site.marrymo.restapi.wedding_img.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.wedding_img.entity.WeddingImg;

import java.util.List;

public interface WeddingImgRepository extends JpaRepository<WeddingImg, Long> {
    List<WeddingImg> findByCard(Card card);
}
