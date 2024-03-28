package site.bank.restapi.transfer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BalanceUpdateRequest {
    String accountNum;
    int amount;
}
