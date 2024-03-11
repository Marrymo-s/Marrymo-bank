package site.marrymo.restapi.wishitem.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WishItemDeleteRequest {
    @NotEmpty(message = "빈칸이면 안되고 null이어도 안됩니다")
    private Long wishItemSequence;
}
