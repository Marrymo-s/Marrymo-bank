package site.marrymo.restapi.bank.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.global.annotation.LoginUser;
import site.marrymo.restapi.bank.dto.request.OpenBankingCodeRequest;
import site.marrymo.restapi.bank.dto.response.OpenBankingAccountInquiryResponse;
import site.marrymo.restapi.bank.dto.response.OpenBankingTokenApiResponse;
import site.marrymo.restapi.bank.service.MoBankService;
import site.marrymo.restapi.bank.service.OpenBankingService;
import site.marrymo.restapi.user.dto.UserDTO;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
@RequestMapping("/open-banking")
public class OpenBankingController {
    private final OpenBankingService openBankingService;
    private final MoBankService moBankService;

    @PostMapping
    public ResponseEntity<OpenBankingAccountInquiryResponse> getUserAccountInfo(@LoginUser UserDTO userDTO,
                                                                     @Valid @RequestBody OpenBankingCodeRequest openBankingCodeRequest){
        log.debug("code : " + openBankingCodeRequest.getCode());

        //토큰 발급 api 호출
        OpenBankingTokenApiResponse openBankingTokenApiResponse = openBankingService.callTokenApi(openBankingCodeRequest);

        //등록 계좌 조회 api 호출
        OpenBankingAccountInquiryResponse openBankingAccountInquiryResponse = openBankingService.callAccountListApi(
            openBankingTokenApiResponse.getAccess_token(), openBankingTokenApiResponse.getUser_seq_no());

        //MoBankTokenApiResponse moBankTokenApiResponse = moBankService.callMoBankTokenApi();

        // 메리모 은행과 메리모 서비스 데이터베이스에 계좌 등록
        moBankService.registerMoBankAccount(userDTO.getUserCode(), openBankingCodeRequest.getWho(),
            openBankingAccountInquiryResponse);


        //log.debug("accessToken = {} ",moBankTokenApiResponse.getAccess_token());

        return ResponseEntity.ok(openBankingAccountInquiryResponse);
    }

}
