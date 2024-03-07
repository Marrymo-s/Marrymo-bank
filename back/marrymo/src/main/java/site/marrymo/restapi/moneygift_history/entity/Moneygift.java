package site.marrymo.restapi.moneygift_history.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wishitem.entity.WishItem;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "moneygift_history")
public class Moneygift extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moneygift_sequence")
    private Long moneygiftSequence;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sequence", referencedColumnName = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_item_sequence", referencedColumnName = "wish_item_sequence")
    private WishItem wishItem;

    @NotNull
    @Column(name = "type", nullable = false)
    private Type type;

    @NotNull
    @Column(name = "amount", nullable = false)
    private int amount;

    @NotNull
    @Column(name = "relationship", nullable = false)
    private String relationship;

    @NotNull
    @Column(name = "sender", nullable = false)
    private String sender;

    @Builder
    public Moneygift(
                     int amount,
                     String relationship,
                     String sender
                     )
}
