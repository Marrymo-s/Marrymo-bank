package site.marrymo.restapi.wedding_img.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.global.entity.BaseTimeEntity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE wedding_img SET deleted_at = NOW() WHERE img_sequence = ?")
@Table(name = "wedding_img")
public class WeddingImg extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_sequence")
    private Long imgSequence;

    @NotNull
    @ManyToOne
    @JoinColumn(name="card_sequence", nullable = false)
    private Card card;

    @NotNull
    @Column(name="img_url", nullable = false)
    private String imgUrl;

    @Builder
    public WeddingImg(
            Card card,
            String imgUrl
    ) {
        this.card = card;
        this.imgUrl = imgUrl;
    }
}
