package site.marrymo.restapi.global.jwt.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "black_list")
public class BlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blacklist_sequence")
    private Long blacklistSequence;

    @NotNull
    @Column(name = "invalid_refresh_token", nullable = false)
    private String invalidRefreshToken;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdDate;

    @Builder
    public BlackList(String invalidRefreshToken){
        this.invalidRefreshToken = invalidRefreshToken;
    }
}
