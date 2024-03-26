package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class OpenBankingAccountInquiryResponse {
    private String user_name;
    private List<OpenBankingAccountResponse> res_list;
}
