package site.marrymo.restapi.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.marrymo.restapi.user.dto.Who;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenBankingCodeRequest {
    private Who who;
    private String code;
}
