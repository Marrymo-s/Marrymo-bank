package site.bank.restapi.transfer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.bank.restapi.transfer.dto.request.AccountRequest;
import site.bank.restapi.transfer.dto.response.AccountResponse;
import site.bank.restapi.transfer.dto.response.BankCodeReseponse;
import site.bank.restapi.transfer.exception.TransferErrorCode;
import site.bank.restapi.transfer.exception.TransferException;
import site.bank.restapi.transfer.mapper.TransferMapper;

import java.util.List;
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TransferService {
    @Autowired
    private final TransferMapper transferMapper;
    public List<BankCodeReseponse> findAllBankList(){
        return transferMapper.findAllBankList();
    }

    public long insertAccount(AccountRequest accountRequest){
        try{
            transferMapper.insertAccount(accountRequest);
            return accountRequest.getAccountSequence();
        }catch(Exception e){
            throw new TransferException(TransferErrorCode.TRANSFER_REGISTER_ACCOUNT_FAILED);
        }
    }

    public AccountResponse findAccountByAccountSeq(Long accountSeq){
        try{
            return transferMapper.findAccountByAccountSeq(accountSeq);
        }catch (Exception e){
            throw new TransferException(TransferErrorCode.TRANSFER_ACCOUNT_NOT_FOUND);
        }
    }
}
