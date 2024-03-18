package site.marrymo.restapi.wedding_img.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.wedding_img.entity.WeddingImg;

public interface WeddingImgRepository extends JpaRepository<WeddingImg, Long> {
}
