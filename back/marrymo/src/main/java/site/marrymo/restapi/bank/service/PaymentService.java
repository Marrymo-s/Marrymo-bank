package site.marrymo.restapi.bank.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import net.minidev.json.JSONObject;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import site.marrymo.restapi.bank.dto.request.MoBankTokenApiRequest;
import site.marrymo.restapi.bank.dto.request.OpenBankingCodeRequest;
import site.marrymo.restapi.bank.dto.request.OpenBankingTokenApiRequest;
import site.marrymo.restapi.bank.dto.request.PaymentRequest;
import site.marrymo.restapi.bank.dto.response.MoBankTokenApiResponse;
import site.marrymo.restapi.bank.dto.response.OpenBankingTokenApiResponse;
import site.marrymo.restapi.bank.dto.response.PaymentResponse;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

	@Value("${kakaopay.client_id}")
	private String clientId;
	@Value("${kakaopay.secret_key}")
	private String secretKey;
	@Value("${kakaopay.redirect_url}")
	private String redirectUrl;
	private final String CID = "TC0ONETIME";
	private final String PID = "Marrymo";
	private final UserRepository userRepository;

	private String forWho = "축의금";
	private final WebClient kakaopayWebClient = WebClient.builder()
		.baseUrl("https://open-api.kakaopay.com/online/v1/payment/ready")
		.build();

	public PaymentResponse paymentApi(MoneygiftTransferRequest transfer) throws JsonProcessingException {
		log.debug("게스트 타입.네임={}", transfer.getGuestType().name());
		log.debug("게스트 타입.투스트링={}", transfer.getGuestType().toString());
		log.debug("타입.네임={}", transfer.getType().name());
		log.debug("타입.투스트링={}", transfer.getType().toString());
		log.debug("금액={}", transfer.getAmount());
		log.debug("관계={}", transfer.getRelationship());
		log.debug("발송자={}", transfer.getSender());
		// User user = userRepository.findByUserCode(transfer.getUserCode()).orElseThrow(() -> new UserException(
		// 	UserErrorCode.USER_NOT_FOUND));
		// log.debug("통과함?");
		// if (transfer.getGuestType() == GuestType.GROOM)
		// 	forWho = user.getCard().getGroomName();
		// else
		// 	forWho = user.getCard().getBrideName();
		// forWho += "님에게 전달할 축의금(Marrymo)";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("cid", CID);
		jsonObject.put("partner_order_id", PID);
		jsonObject.put("partner_user_id", PID);
		jsonObject.put("item_name", forWho);
		jsonObject.put("quantity", "1");
		jsonObject.put("total_amount", String.valueOf(transfer.getAmount()));
		jsonObject.put("tax_free_amount", "0");
		jsonObject.put("approval_url", redirectUrl);
		jsonObject.put("cancel_url", redirectUrl);
		jsonObject.put("fail_url", redirectUrl);

		return kakaopayWebClient
			.post()
			.header("Authorization", "SECRET_KEY DEV9E319E8DD99C907F55D02AFBEBFFBABA46A53")
			.contentType(MediaType.APPLICATION_JSON)
			.body(Mono.just(jsonObject.toString()), JSONObject.class)
			.retrieve()
			.bodyToMono(PaymentResponse.class)
			.block();
	}

}
