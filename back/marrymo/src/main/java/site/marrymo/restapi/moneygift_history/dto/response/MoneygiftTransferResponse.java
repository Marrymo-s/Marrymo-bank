package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MoneygiftTransferResponse {

    int tranAmt;
    String senderName;
    String receiverName;
    String senderAccountNum;
    String receiverAccountNum;
    LocalDateTime tranDate;

}
