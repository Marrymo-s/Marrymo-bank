package site.marrymo.restapi.card.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.card.exception.CardErrorCode;
import site.marrymo.restapi.card.exception.CardException;
import site.marrymo.restapi.card.repository.CardRepository;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CardService {

	private final CardRepository cardRepository;

	public List<User> findUserSequenceByWeddingDateAndIsIssued() {
		return cardRepository.findUserByWeddingDateAndIsIssued(
			LocalDate.now(ZoneId.of("Asia/Seoul"))).orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
	}
}
