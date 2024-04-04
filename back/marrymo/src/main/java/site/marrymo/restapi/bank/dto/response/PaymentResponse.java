package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

@Data
public class PaymentResponse {
	private String tid;
	private String tms_result;
	private String created_at;
	private String next_redirect_pc_url;
	private String next_redirect_mobile_url;
	private String next_redirect_app_url;
	private String android_app_scheme;
	private String ios_app_scheme;
}
