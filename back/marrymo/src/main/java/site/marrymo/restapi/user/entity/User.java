package site.marrymo.restapi.user.entity;

import jakarta.persistence.*;
import lombok.*;
import site.marrymo.restapi.global.entity.BaseTimeEntity;

import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE user SET deleted_at = NOW() WHERE user_sequence = ?")
@Table(name="user")
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_sequence")
    private Long userSequence;

    @NotNull
    @Column(name="kakao_id", nullable = false)
    private String kakaoId;

    @Column(name="bank_code")
    private String bankCode;

    @Column(name="account")
    private String account;

    @Column(name = "fintech_use_num")
    private String fintechUseNum;
    @Column(name="user_code",length=10)
    private String userCode;

    private String email;

    @Column(name="refresh_token")
    private String refreshToken;

    @Column(name="is_withdraw")
    private Boolean isWithdraw;

    @Column(name="withdraw_at")
    private LocalDateTime withdrawAt;

    @Builder
    public User(String kakaoId,
                String bankCode,
                String account,
                String fintechUseNum,
                String userCode,
                String email,
                String refreshToken,
                boolean isWithdraw){
        this.kakaoId = kakaoId;
        this.bankCode = bankCode;
        this.account = account;
        this.fintechUseNum = fintechUseNum;
        this.userCode = userCode;
        this.email = email;
        this.refreshToken = refreshToken;
        this.isWithdraw = isWithdraw;
        this.withdrawAt = withdrawAt;
    }
}
