package site.marrymo.restapi.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PermissionResponse {
    private Boolean isAgreement;
    private Boolean isRequired;
}
