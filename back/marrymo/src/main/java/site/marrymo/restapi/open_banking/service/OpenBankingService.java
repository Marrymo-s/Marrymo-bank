package site.marrymo.restapi.open_banking.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import site.marrymo.restapi.open_banking.dto.request.CodeRequest;
import site.marrymo.restapi.open_banking.dto.request.TokenApiRequest;
import site.marrymo.restapi.open_banking.dto.response.AccountInquiryResponse;
import site.marrymo.restapi.open_banking.dto.response.TokenApiResponse;
import org.springframework.http.HttpHeaders;

@Slf4j
@Service
@Transactional
public class OpenBankingService {

    @Value("${open-banking.client_id}")
    private String clientId;
    @Value("${open-banking.client_secret}")
    private String clientSecret;
    private final WebClient openBankingWebClient = WebClient.builder().baseUrl("https://testapi.openbanking.or.kr").build();

    public TokenApiResponse callTokenApi(CodeRequest codeRequest){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("charset", "UTF-8");

        TokenApiRequest tokenApiRequest = TokenApiRequest.builder()
                .code(codeRequest.getCode())
                .client_id(clientId)
                .client_secret(clientSecret)
                .redirect_uri("http://localhost:8080/api/open-banking/account")
                .grant_type("authorization_code")
                .build();

        return openBankingWebClient
                .post()
                .uri("/oauth/2.0/token")
                .headers(httpHeaders -> httpHeaders.putAll(headers))
                .body(BodyInserters.fromFormData(tokenApiRequest.toMultiValueMap()))
                .retrieve()
                .bodyToMono(TokenApiResponse.class)
                .block();
    }

    public AccountInquiryResponse callAccountListApi(String accessToken, String userSeqNo){
        log.debug("accessToken:"+accessToken+", userSeqNo:"+userSeqNo);

        return openBankingWebClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2.0/account/list")
                        .queryParam("user_seq_no", userSeqNo)
                        .queryParam("include_cancel_yn", "N")
                        .queryParam("sort_order", "D")
                        .build())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(AccountInquiryResponse.class)
                .block();
    }
}
