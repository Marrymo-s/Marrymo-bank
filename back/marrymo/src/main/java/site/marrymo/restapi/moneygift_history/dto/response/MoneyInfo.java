package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Builder;
import lombok.Getter;
import site.marrymo.restapi.moneygift_history.dto.Type;

@Getter
@Builder
public class MoneyInfo {
    private Long moneygiftSequence;
    private Long userSequence;
    private Long wishItemSequence;
    private Type type;
    private String sender;
    private Integer amount;
    private String relationship;
    private String wishItemName;
    private String guestType;
}
