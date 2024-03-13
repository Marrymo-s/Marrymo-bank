package site.marrymo.restapi.rollingpaper.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RollingPaperGetResponse {
    List<RollingPaperEach> letterList;
}
