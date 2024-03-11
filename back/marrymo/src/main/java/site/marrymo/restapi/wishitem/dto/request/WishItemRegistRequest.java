package site.marrymo.restapi.wishitem.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WishItemRegistRequest {
    @NotEmpty(message = "상품 이름은 빈칸이면 안되고 null이어도 안됩니다")
    private String name;

    @NotEmpty(message = "가격은 빈칸이면 안되고 null이어도 안됩니다")
    private Integer price;

    @NotEmpty(message = "사진은 빈칸이면 안되고 null이어도 안됩니다")
    private String img;
}
