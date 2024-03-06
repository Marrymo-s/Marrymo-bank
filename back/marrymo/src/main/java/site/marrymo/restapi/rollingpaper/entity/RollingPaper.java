package site.marrymo.restapi.rollingpaper.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "rolling_paper")
public class RollingPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rolling_paper_id")
    private Long rollingPaperId;

    @ManyToOne
    @JoinColumn(name = "user_sequence")
    private User user;

    @Column
    private String writer;

    @Column
    private String content;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public RollingPaper(User user, String writer, String content){
        this.user = user;
        this.writer = writer;
        this.content = content;
    }
}
