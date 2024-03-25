package site.marrymo.restapi.global.jwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.global.jwt.entity.BlackList;

public interface BlackListRepository extends JpaRepository<BlackList, Long> {
}
