package site.marrymo.restapi.moneygift_history.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MoneygiftGetResponse {
    private Long moneygiftListSum;
    private Long wishItemListSum;
    private Long totalSum;
    private List<MoneyInfo> moneyList;
}
