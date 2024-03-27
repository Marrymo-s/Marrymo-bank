package site.marrymo.restapi.user.repository;

import org.springframework.data.repository.CrudRepository;

import site.marrymo.restapi.global.jwt.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
