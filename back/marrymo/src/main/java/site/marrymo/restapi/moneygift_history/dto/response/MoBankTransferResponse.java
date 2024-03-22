package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Data;

@Data
public class MoBankTransferResponse {
    int tranAmt;

    String senderName;

    String receiverName;

    String senderAccountNum;

    String receiverAccountNum;

    String tranMsg;

}
