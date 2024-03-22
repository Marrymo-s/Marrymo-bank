package site.marrymo.restapi.moneygift_history.dto.request;

import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.user.dto.Who;

@Data
@Builder
public class MoneygiftTransferRequest {

    String userCode;
    Long wishItemSequence;          // 위시리스트 고유번호
    GuestType guestType;            // 누구에게 송금할건지
    Type type;                      // 유형
    int amount;                    // 금액
    String relationship;            // 관계
    String sender;                  // 보낸 사람 이름
}
