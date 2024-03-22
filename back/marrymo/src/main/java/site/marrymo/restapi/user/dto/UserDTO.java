package site.marrymo.restapi.user.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.marrymo.restapi.user.entity.User;

@Data
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long userSequence;
    private String kakaoId;
    private String bankCode;
    private String userCode;
    private String email;
    private Who who;
    private String brideAccount;
    private String brideFintechUseNum;
    private String groomAccount;
    private String groomFintechUseNum;
    private Boolean isBrideOnce;
    private Boolean isGroomOnce;

    public static UserDTO toDTO(User user){
        return UserDTO.builder()
                .userSequence(user.getUserSequence())
                .kakaoId(user.getKakaoId())
                .bankCode(user.getBankCode())
                .userCode(user.getUserCode())
                .email(user.getEmail())
                .who(user.getWho())
                .brideAccount(user.getBrideAccount())
                .brideFintechUseNum(user.getBrideFintechUseNum())
                .groomAccount(user.getGroomAccount())
                .groomFintechUseNum(user.getGroomFintechUseNum())
                .isBrideOnce(user.getIsBrideOnce())
                .isGroomOnce(user.getIsGroomOnce())
                .build();
    }
}
