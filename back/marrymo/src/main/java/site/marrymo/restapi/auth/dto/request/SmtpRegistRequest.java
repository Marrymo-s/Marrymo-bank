package site.marrymo.restapi.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SmtpRegistRequest {
    @NotEmpty(message = "이메일은 필수적입니다")
    private String email;
}
