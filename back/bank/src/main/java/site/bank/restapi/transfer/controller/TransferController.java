package site.bank.restapi.transfer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.bank.restapi.transfer.dto.request.AccountCheckRequest;
import site.bank.restapi.transfer.dto.request.AccountRequest;
import site.bank.restapi.transfer.dto.request.TransferMoneyRequest;
import site.bank.restapi.transfer.dto.response.AccountResponse;
import site.bank.restapi.transfer.dto.response.BankCodeReseponse;
import site.bank.restapi.transfer.dto.response.TransferMoneyResponse;
import site.bank.restapi.transfer.service.TransferService;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/account")
public class TransferController {

    private final TransferService transferService;
    @PostMapping
    public ResponseEntity<?> registerAccount(@RequestBody AccountRequest accountRequest){
        AccountCheckRequest accountCheckRequest=new AccountCheckRequest(accountRequest.getBankCode(), accountRequest.getAccountNum());
        int accountCnt=transferService.findByBankCodeAndAccountNum(accountCheckRequest);

        AccountResponse accountResponse;
        // 메리모 은행에 이미 등록되어 있는 계좌번호인 경우, 계좌를 등록할 수 없음
        // 기존에 저장된 계좌 정보를 반환
        if (accountCnt==1){
            accountResponse=transferService.findAccountByAccountNum(accountRequest.getAccountNum());
        }
        // 매리모 은행에 등록되지 않은 계좌번호인 경우 은행 DB에 저장 후 반환
        else{
            long accountSeq= transferService.insertAccount(accountRequest);
            accountResponse=transferService.findAccountByAccountSeq(accountSeq);
        }
        return ResponseEntity.ok(accountResponse);
    }

    // 유효한 계좌인지 확인하는 api
    @GetMapping
    public ResponseEntity<?> checkValidAccount(@RequestBody AccountCheckRequest accountCheckRequest){
        int accountCnt=transferService.findByBankCodeAndAccountNum(accountCheckRequest);
        log.info("accountCnt "+accountCnt);
        // 계좌가 없는 경우
        if (accountCnt==0){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        // 계좌가 있는 경우
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transferMoney(@RequestBody TransferMoneyRequest transferMoneyRequest){
        TransferMoneyResponse transferMoneyResponse=transferService.insertTransferHistory(transferMoneyRequest);
        return ResponseEntity.ok(transferMoneyResponse);
    }

    @GetMapping("/bank")
    public ResponseEntity<?> getBankCode(){
        HashMap<String, Object> result=new HashMap<>();
        List<BankCodeReseponse> bankList = transferService.findAllBankList();
        result.put("bankList",bankList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
