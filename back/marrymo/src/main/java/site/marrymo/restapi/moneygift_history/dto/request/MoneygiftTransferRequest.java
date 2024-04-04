package site.marrymo.restapi.moneygift_history.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.user.dto.Who;

@Data
@Builder
public class MoneygiftTransferRequest {
    Long userSequence;

    //@NotBlank(message = "userCode를 입력해주세요")
    String userCode;

    Long wishItemSequence;          // 위시리스트 고유번호

    @NotBlank(message = "누구(GROOM, BRIDE 택 1)에게 보낼 지 입력해주세요")
    GuestType guestType;            // 누구에게 송금할건지
    
    @NotBlank(message = "송금 유형(ITEM,CASH 택 1)을 입력해주세요")
    Type type;                      // 유형
    
    @NotBlank(message = "금액을 입력해주세요")
    int amount;                    // 금액

    String relationship;            // 관계
    
    @NotBlank(message = "송금 보내는 사람의 이름을 입력해주세요")
    String sender;                  // 보낸 사람 이름
}
