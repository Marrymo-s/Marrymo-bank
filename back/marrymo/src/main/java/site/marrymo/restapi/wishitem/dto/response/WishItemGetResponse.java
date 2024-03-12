package site.marrymo.restapi.wishitem.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WishItemGetResponse {
    List<WishItemEach> items;
}
