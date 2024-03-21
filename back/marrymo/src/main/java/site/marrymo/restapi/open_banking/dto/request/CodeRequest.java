package site.marrymo.restapi.open_banking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.marrymo.restapi.user.dto.Who;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodeRequest {
    private Who who;
    private String code;
}
