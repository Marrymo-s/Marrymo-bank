package site.marrymo.restapi.open_banking.dto.response;

import lombok.Data;

@Data
public class TokenApiResponse {
    private String access_token;
    private String user_seq_no;
}
