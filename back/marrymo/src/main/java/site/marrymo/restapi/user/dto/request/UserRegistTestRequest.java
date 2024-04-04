package site.marrymo.restapi.user.dto.request;

import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.user.dto.UserDTO;

@Data
@Builder
public class UserRegistTestRequest {
    UserDTO userDTO;
    UserRegistRequest userRegistRequest;
}
