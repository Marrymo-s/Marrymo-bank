package site.bank.restapi.transfer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/api")
public class TransferController {

    @PostMapping("/account/token")
    public void getAccessToken(){

    }

    @PostMapping("/account")
    public void registerAccount(){

    }

    @GetMapping("/account")
    public void checkAccount(){

    }

    @PostMapping("/account/transfer")
    public void transferMoney(){

    }

    @GetMapping("/bank")
    public void getBankCode(){

    }

}
