package site.marrymo.restapi.bank.service;

import java.util.HashMap;
import java.util.Map;

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

	private String forWho = "";
	private final WebClient kakaopayWebClient = WebClient.builder()
		.baseUrl("https://open-api.kakaopay.com/online/v1/payment/ready")
		.build();

	public PaymentResponse paymentApi(MoneygiftTransferRequest transfer) throws JsonProcessingException {

		User user = userRepository.findByUserCode(transfer.getUserCode()).orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
		if (transfer.getGuestType() == GuestType.GROOM)
		forWho = user.getCard().getGroomName();
		else
		forWho = user.getCard().getBrideName();
		forWho += "님에게 전달할 축의금(Marrymo)";

		Map<String, Object> bodyMap = new HashMap<>();
		bodyMap.put("cid", CID);
		bodyMap.put("partner_order_id", PID);
		bodyMap.put("partner_user_id", PID);
		bodyMap.put("item_name", forWho);
		bodyMap.put("quantity", 1);
		bodyMap.put("total_amount", transfer.getAmount());
		bodyMap.put("tax_free_amount", 0);
		bodyMap.put("approval_url", redirectUrl);
		bodyMap.put("cancel_url", redirectUrl);
		bodyMap.put("fail_url", redirectUrl);

		ObjectMapper objectMapper = new ObjectMapper();
		// Map을 JSON 문자열로 직렬화
		String jsonBody = objectMapper.writeValueAsString(bodyMap);

		return kakaopayWebClient.post()
			.header(HttpHeaders.AUTHORIZATION, "SECRET_KEY " + secretKey)
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(jsonBody) // JSON 문자열을 바로 전달
			.retrieve()
			.bodyToMono(PaymentResponse.class)
			.block();
	}

}
