package site.marrymo.restapi.wishitem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.user.entity.User;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE wish_item SET deleted_at = NOW() WHERE wish_item_sequence = ?")
@SQLRestriction("deleted_at IS NULL")
@Table(name = "wish_item")
public class WishItem extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_item_sequence")
    private Long wishItemSequence;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_sequence", nullable = false)
    private User user;

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false)
    private Integer price;

    @NotNull
    @Column(nullable = false)
    private String img;

    @Builder
    public WishItem(User user, String name, Integer price, String img){
        this.user = user;
        this.name = name;
        this.price = price;
        this.img = img;
    }
}
