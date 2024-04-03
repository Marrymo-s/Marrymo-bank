package site.marrymo.restapi.bank.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentRequest {
	private String cid;
	private String partner_order_id;
	private String partner_user_id;
	private String item_name;
	private Integer quantity;
	private Integer total_amount;
	private Integer tax_free_amount;
	private String approval_url;
	private String cancel_url;
	private String fail_url;

}
