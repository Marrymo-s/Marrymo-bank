package site.marrymo.restapi.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InvitationIssueResponse {
    private String cardUrl;
    private Boolean isIssued;

    public static InvitationIssueResponse toDto(String cardUrl, Boolean isIssued){
        return InvitationIssueResponse.builder()
                .cardUrl(cardUrl)
                .isIssued(isIssued)
                .build();
    }
}
