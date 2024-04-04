package site.marrymo.restapi.user.dto.response;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.user.dto.Who;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Builder
public class  UserInfoResponse {
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
    private Boolean isWithdraw;
    private LocalDateTime withdrawAt;

    private String groomName;
    private String brideName;

    public static UserInfoResponse toDto(User user, Card card){
        return UserInfoResponse.builder()
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
                .isWithdraw(user.getIsWithdraw())
                .withdrawAt(user.getWithdrawAt())
                .groomName(card.getGroomName())
                .brideName(card.getBrideName())
                .build();
    }
}
