package site.marrymo.restapi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.global.jwt.entity.BlackList;

import java.util.Optional;

public interface BlackListRepository extends JpaRepository<BlackList, Long> {
    Optional<BlackList> findByInvalidRefreshToken(String refreshToken);
}
