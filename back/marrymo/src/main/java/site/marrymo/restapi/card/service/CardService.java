package site.marrymo.restapi.card.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.card.repository.CardRepository;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CardService {

	private final CardRepository cardRepository;

	public List<Card> findAllByWeddingDate(LocalDate localDate){

	}
}
