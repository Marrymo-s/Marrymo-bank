package site.bank.restapi.transfer.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferMoneyResponse {
    int tranAmt;
    String senderName;
    String receiverName;
    String senderAccountNum;
    String receiverAccountNum;
    LocalDateTime tranDate;
}
