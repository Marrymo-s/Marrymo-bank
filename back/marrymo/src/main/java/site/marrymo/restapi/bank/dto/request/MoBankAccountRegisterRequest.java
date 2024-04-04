package site.marrymo.restapi.bank.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoBankAccountRegisterRequest {
    String bankCode;
    String accountNum;
    String fintechUseNum;
    String username;
}
