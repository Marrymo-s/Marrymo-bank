package site.marrymo.restapi.rollingpaper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.rollingpaper.entity.RollingPaper;

public interface RollingPaperRepository extends JpaRepository<RollingPaper, Long> {

}
