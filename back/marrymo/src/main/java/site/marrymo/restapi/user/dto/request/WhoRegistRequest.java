package site.marrymo.restapi.user.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WhoRegistRequest {
    @NotEmpty(message = "계좌 등록 대상은 빈칸이거나 null 값이 들어오면 안됩니다")
    private String who;
}
