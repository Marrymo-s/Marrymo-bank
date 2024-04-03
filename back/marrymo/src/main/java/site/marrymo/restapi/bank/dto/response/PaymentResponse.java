package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

@Data
public class PaymentResponse {
	private String tid;
	private String next_redirect_pc_url;
}
