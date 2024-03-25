package site.marrymo.restapi.global.jwt.repository;

import org.springframework.data.repository.CrudRepository;
import site.marrymo.restapi.global.jwt.entity.RefreshToken;

import java.sql.Ref;
import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
