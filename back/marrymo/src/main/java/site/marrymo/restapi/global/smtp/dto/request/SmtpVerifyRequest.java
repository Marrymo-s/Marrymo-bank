package site.marrymo.restapi.global.smtp.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;

@Data
@NoArgsConstructor
public class SmtpVerifyRequest {
    @Email
    @NotEmpty(message = "이메일은 필수적입니다")
    private String email;

    @NotNull(message = "인증번호는 필수적입니다")
    private String code;
}
