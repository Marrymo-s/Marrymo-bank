package site.bank.restapi.transfer.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.bank.restapi.transfer.dto.request.AccountRequest;
import site.bank.restapi.transfer.dto.response.AccountResponse;
import site.bank.restapi.transfer.dto.response.BankCodeReseponse;

import java.util.List;

@Mapper
public interface TransferMapper {
    List<BankCodeReseponse> findAllBankList();
    Long insertAccount(AccountRequest accountRequest);

    AccountResponse findAccountByAccountSeq(Long accountSeq);

}
