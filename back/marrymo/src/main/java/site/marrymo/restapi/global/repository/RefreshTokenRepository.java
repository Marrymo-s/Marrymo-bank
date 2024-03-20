package site.marrymo.restapi.global.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.global.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
}
