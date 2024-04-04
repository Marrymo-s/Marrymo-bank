package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

@Data
public class OpenBankingTokenApiResponse {
    private String access_token;
    private String user_seq_no;
}
