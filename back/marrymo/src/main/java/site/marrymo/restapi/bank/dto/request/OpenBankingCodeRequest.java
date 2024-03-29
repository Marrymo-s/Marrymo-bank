package site.marrymo.restapi.bank.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.marrymo.restapi.user.dto.Who;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenBankingCodeRequest {
    @NotBlank( message = "누구(GROOM, BRIDE 택 1)의 통장인지 입력하세요")
    private Who who;
    
    @NotBlank( message = "open banking api로 받아온 코드를 입력해주세요")
    private String code;
}
