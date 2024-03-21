package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MoneygiftTransferResponse {

    String senderName;
    String receiverName;
    String receiverAccountNum;
    int tranAmt;
    LocalDateTime tranDate;

}
