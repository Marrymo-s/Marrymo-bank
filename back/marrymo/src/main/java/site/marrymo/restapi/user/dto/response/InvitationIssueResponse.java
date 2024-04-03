package site.marrymo.restapi.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InvitationIssueResponse {
    private Boolean isIssued;
}
