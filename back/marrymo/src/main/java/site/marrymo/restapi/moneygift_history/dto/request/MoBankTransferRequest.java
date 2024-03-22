package site.marrymo.restapi.moneygift_history.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class MoBankTransferRequest {

    int tranAmt;

    String senderName;

    String receiverName;

    String senderAccountNum;

    String receiverAccountNum;

    String tranMsg;

}
