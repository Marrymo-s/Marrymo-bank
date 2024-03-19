package site.bank.restapi.transfer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.bank.restapi.transfer.dto.request.AccountRequest;
import site.bank.restapi.transfer.dto.response.AccountResponse;
import site.bank.restapi.transfer.dto.response.BankCodeReseponse;
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
        long accountSeq= transferService.insertAccount(accountRequest);
        System.out.println(accountSeq);
        AccountResponse accountResponse=transferService.findAccountByAccountSeq(accountSeq);
        return ResponseEntity.ok(accountResponse);
    }

    @GetMapping
    public void checkAccount(){

    }

    @PostMapping("/transfer")
    public void transferMoney(){

    }

    @GetMapping("/bank")
    public ResponseEntity<?> getBankCode(){
        HashMap<String, Object> result=new HashMap<>();
        List<BankCodeReseponse> bankList = transferService.findAllBankList();
        result.put("bankList",bankList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
