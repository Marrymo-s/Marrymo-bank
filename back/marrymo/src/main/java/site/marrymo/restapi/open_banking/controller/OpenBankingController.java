package site.marrymo.restapi.open_banking.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.marrymo.restapi.open_banking.dto.request.CodeRequest;
import site.marrymo.restapi.open_banking.dto.response.TokenApiResponse;
import site.marrymo.restapi.open_banking.service.OpenBankingService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/open-banking")
public class OpenBankingController {
    private final OpenBankingService openBankingService;
    @GetMapping("/token")
    public ResponseEntity<TokenApiResponse> tokenApi(@Valid @RequestBody CodeRequest codeRequest){
        log.debug("code : " + codeRequest.getCode());
        TokenApiResponse tokenApiResponse = openBankingService.callTokenApi(codeRequest);
        return ResponseEntity.ok(tokenApiResponse);
    }
}
