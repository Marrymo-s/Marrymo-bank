package site.marrymo.restapi.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MarriedCoupleDTO {
	private String brideName;
	private String groomName;
}
