package site.marrymo.restapi.wishitem.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WishItemEach {
    @NotNull(message = "빈칸이면 안되고 null이어도 안됩니다")
    private Long wishItemSequence;

    @NotEmpty(message = "상품 이름은 빈칸이면 안되고 null이어도 안됩니다")
    private String name;

    @NotNull(message = "가격은 빈칸이면 안되고 null이어도 안됩니다")
    private Integer price;

    @NotEmpty(message = "사진은 빈칸이면 안되고 null이어도 안됩니다")
    private String img;
}
