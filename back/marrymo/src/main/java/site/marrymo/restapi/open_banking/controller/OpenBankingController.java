package site.marrymo.restapi.open_banking.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.global.auth.entity.LoginUser;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.open_banking.dto.request.CodeRequest;
import site.marrymo.restapi.open_banking.dto.response.AccountInquiryResponse;
import site.marrymo.restapi.open_banking.dto.response.MoBankTokenApiResponse;
import site.marrymo.restapi.open_banking.dto.response.TokenApiResponse;
import site.marrymo.restapi.open_banking.service.MoBankService;
import site.marrymo.restapi.open_banking.service.OpenBankingService;
import site.marrymo.restapi.user.dto.UserDTO;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/open-banking")
public class OpenBankingController {
    private final OpenBankingService openBankingService;
    private final MoBankService moBankService;

    @PostMapping
    public ResponseEntity<AccountInquiryResponse> getUserAccountInfo(@LoginUser UserDTO userDTO,
                                                                     @Valid @RequestBody CodeRequest codeRequest){
        log.debug("code : " + codeRequest.getCode());

        //토큰 발급 api 호출
        TokenApiResponse tokenApiResponse = openBankingService.callTokenApi(codeRequest);

        //등록 계좌 조회 api 호출
        AccountInquiryResponse accountInquiryResponse = openBankingService.callAccountListApi(tokenApiResponse.getAccess_token(), tokenApiResponse.getUser_seq_no());

        //MoBankTokenApiResponse moBankTokenApiResponse = moBankService.callMoBankTokenApi();

        // 메리모 은행과 메리모 서비스 데이터베이스에 계좌 등록
        moBankService.registerMoBankAccount(userDTO.getUserCode(), codeRequest.getWho(),accountInquiryResponse);


        //log.debug("accessToken = {} ",moBankTokenApiResponse.getAccess_token());

        return ResponseEntity.ok(accountInquiryResponse);
    }

    @PostMapping("/test")
    public ResponseEntity<?> test(){
        MoBankTokenApiResponse moBankTokenApiResponse = moBankService.callMoBankTokenApi();
        log.debug("access-token={}",moBankTokenApiResponse.getAccess_token());
        return ResponseEntity.ok(moBankTokenApiResponse);
    }
}
