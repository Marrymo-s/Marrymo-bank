package site.bank.restapi.transfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {
    String bankCode;
    String bankName;
    String accountNum;
    String fintechUseNum;
    String username;
    Long balance;
}
