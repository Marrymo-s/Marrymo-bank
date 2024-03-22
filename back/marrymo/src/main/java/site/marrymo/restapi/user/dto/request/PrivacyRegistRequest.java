package site.marrymo.restapi.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrivacyRegistRequest {
    @NotNull(message = "개인정보 제공 동의여부는 필수적입니다")
    private Boolean isAgreement;
}
