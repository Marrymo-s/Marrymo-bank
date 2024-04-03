package site.marrymo.restapi.bank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

	private String forWho="축의금";
	private final WebClient kakaopayWebClient = WebClient.builder()
		.baseUrl("https://open-api.kakaopay.com")
		.build();

	public PaymentResponse paymentApi(MoneygiftTransferRequest transfer) {
		log.debug("게스트 타입.네임={}",transfer.getGuestType().name());
		log.debug("게스트 타입.투스트링={}",transfer.getGuestType().toString());
		log.debug("타입.네임={}",transfer.getType().name());
		log.debug("타입.투스트링={}",transfer.getType().toString());
		log.debug("금액={}",transfer.getAmount());
		log.debug("관계={}",transfer.getRelationship());
		log.debug("발송자={}",transfer.getSender());
		// User user = userRepository.findByUserCode(transfer.getUserCode()).orElseThrow(() -> new UserException(
		// 	UserErrorCode.USER_NOT_FOUND));
		// log.debug("통과함?");
		// if (transfer.getGuestType() == GuestType.GROOM)
		// 	forWho = user.getCard().getGroomName();
		// else
		// 	forWho = user.getCard().getBrideName();
		// forWho += "님에게 전달할 축의금(Marrymo)";

		PaymentRequest paymentRequest = PaymentRequest.builder()
			.cid(CID)
			.partner_order_id(PID)
			.partner_user_id(PID)
			.item_name(forWho)
			.quantity(1)
			.total_amount(transfer.getAmount())
			.tax_free_amount(0)
			.approval_url(redirectUrl)
			.cancel_url(redirectUrl)
			.fail_url(redirectUrl)
			.build();

		return kakaopayWebClient
			.post()
			.uri("/online/v1/payment/ready")
			.header("Authorization","SECRET_KEY "+secretKey)
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(BodyInserters.fromValue(paymentRequest))
			.retrieve()
			.bodyToMono(PaymentResponse.class)
			.block();
	}

}
