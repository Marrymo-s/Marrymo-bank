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
    public ResponseEntity<?> registerAccount(@RequestBody List<AccountRequest> accountRequestList){

        HashMap<String, List<AccountResponse>> resultMap = new HashMap<>();

        List<AccountResponse> registeredAccountList=transferService.registerAccount(accountRequestList);
        resultMap.put("data",registeredAccountList);

        return ResponseEntity.ok(resultMap);
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
