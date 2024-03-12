package site.marrymo.restapi.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InvitationIssueResponse {
    private String cardUrl;

    public static InvitationIssueResponse toDto(String cardUrl){
        return InvitationIssueResponse.builder()
                .cardUrl(cardUrl)
                .build();
    }
}
