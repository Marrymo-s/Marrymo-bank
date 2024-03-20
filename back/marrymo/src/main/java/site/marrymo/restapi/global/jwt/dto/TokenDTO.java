package site.marrymo.restapi.global.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class TokenDTO {
    private String token;
    private long expired;
}
