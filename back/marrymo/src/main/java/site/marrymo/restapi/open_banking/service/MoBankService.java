package site.marrymo.restapi.open_banking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import net.minidev.json.JSONObject;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.open_banking.dto.request.MoBankTokenApiRequest;
import site.marrymo.restapi.open_banking.dto.response.AccountInquiryResponse;
import site.marrymo.restapi.open_banking.dto.response.MoBankTokenApiResponse;
import site.marrymo.restapi.open_banking.dto.response.TokenApiResponse;

@Slf4j
@Service
public class MoBankService {

	@Value("${mo-bank.client_id}")
	private String clientId;

	@Value("${mo-bank.client_secret}")
	private String clientSecret;
	private final WebClient moBankWebClient = WebClient.builder().baseUrl("http://3.37.251.197/api/").build();

	public MoBankTokenApiResponse callMoBankTokenApi() {

		MoBankTokenApiRequest tokenApiRequest = MoBankTokenApiRequest.builder()
			.clientId(clientId)
			.clientSecret(clientSecret)
			.build();

		return moBankWebClient
			.post()
			.uri("/api/auth/token")
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(tokenApiRequest))
			.retrieve()
			.bodyToMono(MoBankTokenApiResponse.class)
			.block();
	}

}
