package site.marrymo.restapi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserCode(String userCode);
    Optional<User> findByUserSequence(Long userSequence);
    Optional<User> findByKakaoId(String kakaoId);
}
