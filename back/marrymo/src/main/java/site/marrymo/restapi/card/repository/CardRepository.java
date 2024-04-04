package site.marrymo.restapi.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
	Optional<Card> findByUser(User user);

	@Query("SELECT c.user FROM Card c WHERE c.weddingDate = :weddingDate AND c.isIssued=TRUE")
	Optional<List<User>> findUserByWeddingDateAndIsIssued(@Param("weddingDate") LocalDate localDate);
}
