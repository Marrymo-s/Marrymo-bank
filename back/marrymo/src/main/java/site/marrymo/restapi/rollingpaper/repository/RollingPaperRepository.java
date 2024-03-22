package site.marrymo.restapi.rollingpaper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.rollingpaper.entity.RollingPaper;
import site.marrymo.restapi.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface RollingPaperRepository extends JpaRepository<RollingPaper, Long> {
    Optional<List<RollingPaper>> findByUser(User user);
}
