package site.marrymo.restapi.rollingpaper.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE rolling_paper SET deleted_at = NOW() WHERE rolling_paper_sequence = ?")
@Table(name = "rolling_paper")
public class RollingPaper extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rolling_paper_sequence")
    private Long rollingPaperSequence;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_sequence", nullable = false)
    private User user;

    @NotNull
    @Column(nullable = false)
    private String writer;

    @NotNull
    @Column(nullable = false)
    private String content;

    @Builder
    public RollingPaper(User user, String writer, String content){
        this.user = user;
        this.writer = writer;
        this.content = content;
    }
}
