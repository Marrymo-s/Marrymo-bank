package site.bank.restapi.transfer.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BankCodeReseponse {
    String bankCode;
    String name;
}
