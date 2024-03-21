package site.marrymo.restapi.open_banking.dto.response;

import lombok.Data;

@Data
public class MoBankAccountResponse {
    String bankCode;
    String bankName;
    String accountNum;
    String fintechUseNum;
    String username;
    Long balance;
}
