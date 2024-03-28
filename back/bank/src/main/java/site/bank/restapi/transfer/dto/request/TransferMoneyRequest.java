package site.bank.restapi.transfer.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferMoneyRequest {
    long tranSequence;

    long accountSequence;

    @NotEmpty(message = "거래 금액을 입력해야 합니다.")
    int tranAmt;

    @NotEmpty(message = "송금인 이름을 입력해야 합니다.")
    String senderName;

    @NotEmpty(message = "수취인 이름을 입력해야 합니다.")
    String receiverName;

    @NotEmpty(message = "송금 계좌번호를 입력해야 합니다.")
    String senderAccountNum;

    @NotEmpty(message = "수취 계좌번호를 입력해야 합니다.")
    String receiverAccountNum;

    @NotNull(message = "거래 내용은 null이 되면 안됩니다.")
    String tranMsg;
}
