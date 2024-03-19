package site.marrymo.restapi.rollingpaper.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class RollingPaperEach {
    @NotEmpty(message = "작성자는 필수적입니다")
    private String writer;

    @NotEmpty(message = "내용은 필수적입니다")
    private String content;

    @NotNull(message = "생성일시는 필수적입니다")
    private LocalDateTime createdAt;
}
