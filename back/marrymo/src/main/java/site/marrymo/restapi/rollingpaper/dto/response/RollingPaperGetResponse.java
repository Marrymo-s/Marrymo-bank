package site.marrymo.restapi.rollingpaper.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RollingPaperGetResponse {
    List<RollingPaperEach> letterList;
}
