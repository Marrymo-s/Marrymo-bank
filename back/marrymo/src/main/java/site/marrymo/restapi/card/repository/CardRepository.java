package site.marrymo.restapi.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByUser(User user);

    Optional<List<Card>> findAllByWeddingDate(LocalDate localDate);
}
