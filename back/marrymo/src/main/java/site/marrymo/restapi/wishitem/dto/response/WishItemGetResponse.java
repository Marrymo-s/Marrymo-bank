package site.marrymo.restapi.wishitem.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.wishitem.entity.WishItem;

import java.util.List;

@Data
@Builder
public class WishItemGetResponse {
    private List<WishItem> wishItems;

    @Data
    @Builder
    public static class WishItem {
        @NotEmpty(message = "빈칸이면 안되고 null이어도 안됩니다")
        private Long wishItemSequence;

        @NotEmpty(message = "상품 이름은 빈칸이면 안되고 null이어도 안됩니다")
        private String name;

        @NotEmpty(message = "가격은 빈칸이면 안되고 null이어도 안됩니다")
        private Integer price;

        @NotEmpty(message = "사진은 빈칸이면 안되고 null이어도 안됩니다")
        private String img;
    }
}
