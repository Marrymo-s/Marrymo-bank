package site.marrymo.restapi.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.user.entity.User;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByUser(User user);
}
