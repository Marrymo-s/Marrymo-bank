package site.marrymo.restapi.rollingpaper.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RollingPaperRegistRequest {
    @NotEmpty(message = "작성자 명은 필수적입니다")
    private String writer;

    @NotEmpty(message = "내용은 필수적입니다")
    private String content;
}
