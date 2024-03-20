package site.bank.restapi.transfer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountCheckRequest {
    String bankCode;
    String accountNum;
}
