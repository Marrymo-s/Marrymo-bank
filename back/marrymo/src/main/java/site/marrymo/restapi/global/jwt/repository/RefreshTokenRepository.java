package site.marrymo.restapi.global.jwt.repository;

import org.springframework.data.repository.CrudRepository;

import site.marrymo.restapi.global.jwt.entity.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
