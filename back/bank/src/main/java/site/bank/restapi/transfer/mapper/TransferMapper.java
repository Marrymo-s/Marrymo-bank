package site.bank.restapi.transfer.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.bank.restapi.transfer.dto.request.AccountCheckRequest;
import site.bank.restapi.transfer.dto.request.AccountRequest;
import site.bank.restapi.transfer.dto.request.BalanceUpdateRequest;
import site.bank.restapi.transfer.dto.request.TransferMoneyRequest;
import site.bank.restapi.transfer.dto.response.AccountResponse;
import site.bank.restapi.transfer.dto.response.BankCodeReseponse;
import site.bank.restapi.transfer.dto.response.TransferMoneyResponse;

import java.util.List;

@Mapper
public interface TransferMapper {
    List<BankCodeReseponse> findAllBankList();
    Long insertAccount(AccountRequest accountRequest);
    AccountResponse findAccountByAccountSeq(Long accountSeq);
    long insertTransferHistory(TransferMoneyRequest transferMoneyRequest);
    TransferMoneyResponse findTransferHistoryByTranSequence(long tranSequence);
    long findAccountByAccountNum(String accountNum);
    long updateBalancee(BalanceUpdateRequest balanceUpdateRequest);
    int countAccountNum(String accoutNum);
    int findByBankCodeAndAccountNum(AccountCheckRequest accountCheckRequest);
}
