package site.marrymo.restapi.open_banking.dto.response;

import lombok.Data;

@Data
public class BankAccountResponse {
    private String account_num_masked;
    private String fintech_use_num;
    private String bank_code_std;
}
