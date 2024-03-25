package site.marrymo.restapi.open_banking.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import net.minidev.json.JSONObject;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.moneygift_history.dto.request.MoBankTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoBankTransferResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.open_banking.dto.request.MoBankAccountRegisterRequest;
import site.marrymo.restapi.open_banking.dto.request.MoBankTokenApiRequest;
import site.marrymo.restapi.open_banking.dto.response.*;
import site.marrymo.restapi.user.dto.Who;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MoBankService {

	private final UserRepository userRepository;

	@Value("${mo-bank.client_id}")
	private String clientId;

	@Value("${mo-bank.client_secret}")
	private String clientSecret;
	private final WebClient moBankWebClient = WebClient.builder().baseUrl("http://3.37.251.197/").build();

    public MoBankService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


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

	public HashMap<String,List<MoBankAccountResponse>> registerMoBankAccount(String userCode, Who who, AccountInquiryResponse accountInquiryResponse){
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
				.exchangeToMono(response -> {
					if (response.statusCode().is2xxSuccessful()) {
						User user=userRepository.findByUserCode(userCode)
								.orElseThrow(()-> new UserException(UserErrorCode.USER_NOT_FOUND));

						if (who==Who.BRIDE){
							user.setbrideAccount(moBankAccountRegisterRequestList.get(0).getAccountNum());
							user.setBrideFintechUseNum(moBankAccountRegisterRequestList.get(0).getFintechUseNum());
						}
						else if (who==Who.GROOM){
							user.setGroomAccount(moBankAccountRegisterRequestList.get(0).getAccountNum());
							user.setGroomFintechUseNum(moBankAccountRegisterRequestList.get(0).getFintechUseNum());
						}
						userRepository.save(user);
						return response.bodyToMono(new ParameterizedTypeReference<HashMap<String, List<MoBankAccountResponse>>>() {});
					} else {
						// 에러 처리 로직
						return response.createException().flatMap(Mono::error);
					}
				})
				.block();
	}

	public MoBankTransferResponse sendMoney(MoBankTransferRequest moBankTransferRequest){
		MoBankTokenApiResponse moBankToken = callMoBankTokenApi();
		return moBankWebClient.post()
				.uri("/account/transfer")
				.header("Authorization", moBankToken.getTokenType() + " " + moBankToken.getAccess_token())
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(moBankTransferRequest)
				.retrieve()
				.bodyToMono(MoBankTransferResponse.class)
				.block();
	}

}
