package site.marrymo.restapi.bank.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import site.marrymo.restapi.moneygift_history.dto.request.MoBankTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoBankTransferResponse;
import site.marrymo.restapi.bank.dto.request.MoBankAccountRegisterRequest;
import site.marrymo.restapi.bank.dto.request.MoBankTokenApiRequest;
import site.marrymo.restapi.bank.dto.response.*;
import site.marrymo.restapi.user.dto.Who;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@Transactional
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
			.uri("/api/auth/token")
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(tokenApiRequest))
			.retrieve()
			.bodyToMono(MoBankTokenApiResponse.class)
			.block();
	}

	public HashMap<String,List<MoBankAccountResponse>> registerMoBankAccount(String userCode, Who who, OpenBankingAccountInquiryResponse openBankingAccountInquiryResponse){
		MoBankTokenApiResponse moBankToken = callMoBankTokenApi();

		// accountInqueryResponse -> MoBankAccountRegisterRequest로 변환
		List<MoBankAccountRegisterRequest> moBankAccountRegisterRequestList = new ArrayList<>();
		String username= openBankingAccountInquiryResponse.getUser_name();
		for (OpenBankingAccountResponse openBankingAccountResponse : openBankingAccountInquiryResponse.getRes_list()){
			moBankAccountRegisterRequestList.add(
					MoBankAccountRegisterRequest.builder()
					.username(username)
					.bankCode(openBankingAccountResponse.getBank_code_std())
					.fintechUseNum(openBankingAccountResponse.getFintech_use_num())
					.accountNum(openBankingAccountResponse.getAccount_num_masked())
					.build());
		}

		return moBankWebClient
				.post()
				.uri("/api/account")
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
				.uri("/api/account/transfer")
				.header("Authorization", moBankToken.getTokenType() + " " + moBankToken.getAccess_token())
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(moBankTransferRequest)
				.retrieve()
				.bodyToMono(MoBankTransferResponse.class)
				.block();
	}

}
