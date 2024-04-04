package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

@Data
public class OpenBankingAccountResponse {
    private String account_num_masked;
    private String fintech_use_num;
    private String bank_code_std;
}
