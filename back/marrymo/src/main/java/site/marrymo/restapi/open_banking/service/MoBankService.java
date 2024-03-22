package site.marrymo.restapi.open_banking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import net.minidev.json.JSONObject;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.open_banking.dto.request.MoBankAccountRegisterRequest;
import site.marrymo.restapi.open_banking.dto.request.MoBankTokenApiRequest;
import site.marrymo.restapi.open_banking.dto.response.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
public class MoBankService {

	@Value("${mo-bank.client_id}")
	private String clientId;

	@Value("${mo-bank.client_secret}")
	private String clientSecret;
	private final WebClient moBankWebClient = WebClient.builder().baseUrl("http://3.37.251.197/").build();

	public MoBankTokenApiResponse callMoBankTokenApi() {

		MoBankTokenApiRequest tokenApiRequest = MoBankTokenApiRequest.builder()
			.clientId(clientId)
			.clientSecret(clientSecret)
			.build();

		return moBankWebClient
			.post()
			.uri("/auth/token")
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(tokenApiRequest))
			.retrieve()
			.bodyToMono(MoBankTokenApiResponse.class)
			.block();
	}

	public HashMap<String,List<MoBankAccountResponse>> registerMoBankAccount(AccountInquiryResponse accountInquiryResponse){
		MoBankTokenApiResponse moBankToken = callMoBankTokenApi();

		// accountInqueryResponse -> MoBankAccountRegisterRequest로 변환
		List<MoBankAccountRegisterRequest> moBankAccountRegisterRequestList = new ArrayList<>();
		String username=accountInquiryResponse.getUser_name();
		for (BankAccountResponse bankAccountResponse : accountInquiryResponse.getRes_list()){
			moBankAccountRegisterRequestList.add(
					MoBankAccountRegisterRequest.builder()
					.username(username)
					.bankCode(bankAccountResponse.getBank_code_std())
					.fintechUseNum(bankAccountResponse.getFintech_use_num())
					.accountNum(bankAccountResponse.getAccount_num_masked())
					.build());
		}

		return moBankWebClient
				.post()
				.uri("/account")
				.header("Authorization", moBankToken.getTokenType()+ " " + moBankToken.getAccess_token())
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(moBankAccountRegisterRequestList)
				.retrieve()
				.bodyToMono(new ParameterizedTypeReference<HashMap<String, List<MoBankAccountResponse>>>() {})
				.block();
	}

	public MoneygiftTransferResponse sendMoney(MoneygiftTransferRequest moneygiftTransferRequest){
		MoBankTokenApiResponse moBankToken = callMoBankTokenApi();
		return moBankWebClient.post()
				.uri("/account/transfer")
				.header("Authorization", moBankToken.getTokenType() + " " + moBankToken.getAccess_token())
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(moneygiftTransferRequest)
				.retrieve()
				.bodyToMono(MoneygiftTransferResponse.class)
				.block();
	}

}
