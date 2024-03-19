package site.bank.restapi.transfer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountRequest {

    Long accountSequence;

    @NotBlank(message = "은행 코드를 입력해야 합니다.")
    String bankCode;

    @NotBlank(message = "계좌번호를 입력해야 합니다.")
    String accountNum;

    @NotBlank(message = "핀테크번호를 입력해야 합니다.")
    String fintechUseNum;

    @NotBlank(message = "사용자 이름을 입력해야 합니다.")
    String username;
}
