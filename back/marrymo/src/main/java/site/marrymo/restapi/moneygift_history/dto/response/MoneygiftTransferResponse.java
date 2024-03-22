package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;

import java.time.LocalDateTime;

@Data
@Builder
public class MoneygiftTransferResponse {

    GuestType guestType;            // 누구에게 송금할건지
    Type type;                      // 유형
    int amount;                    // 금액
    String relationship;            // 관계
    String sender;                  // 보낸 사람 이름

}
