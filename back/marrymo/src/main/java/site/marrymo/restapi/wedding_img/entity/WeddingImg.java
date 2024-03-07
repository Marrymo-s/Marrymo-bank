package site.marrymo.restapi.wedding_img.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.global.entity.BaseTimeEntity;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE wish_item SET deleted_at = NOW() WHERE wish_item_sequence = ?")
@Table(name = "wedding_img")
public class WeddingImg extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_sequence")
    private Long imgSequence;

    @ManyToOne
    @JoinColumn(name="card_sequence")
    private Card card;

    @NotNull
    @Column(name="img_url", nullable = false)
    private String imgUrl;
}
