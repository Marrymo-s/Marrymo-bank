package site.marrymo.restapi.open_banking.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class AccountInquiryResponse {
    private String user_name;
    private List<BankAccountResponse> res_list;
}
