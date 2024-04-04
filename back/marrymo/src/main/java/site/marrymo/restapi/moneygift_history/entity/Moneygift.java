package site.marrymo.restapi.moneygift_history.entity;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.moneygift_history.dto.GuestType;
import site.marrymo.restapi.moneygift_history.dto.Type;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wishitem.entity.WishItem;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE moneygift_history SET deleted_at = NOW() WHERE moneygift_sequence = ?")
@SQLRestriction("deleted_at IS NULL")
@Table(name = "moneygift_history")
public class Moneygift extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moneygift_sequence")
    private Long moneygiftSequence;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sequence", referencedColumnName = "user_sequence", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_item_sequence", referencedColumnName = "wish_item_sequence")
    private WishItem wishItem;

    @NotNull
    @Column(name = "guest_type", nullable = false)
    private GuestType guestType;

    @NotNull
    @Column(name = "type", nullable = false)
    private Type type;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @NotNull
    @Column(name = "relationship", nullable = false)
    private String relationship;

    @NotNull
    @Column(name = "sender", nullable = false)
    private String sender;

    @Builder
    public Moneygift(
                     Type type,
                     Integer amount,
                     String relationship,
                     String sender
                     ){
        this.type = type;
        this.amount = amount;
        this.relationship = relationship;
        this.sender = sender;
    }

    @Builder
    public Moneygift(
            User user,
            WishItem wishItem,
            GuestType guestType,
            Type type,
            Integer amount,
            String relationship,
            String sender
    ){
        this.user = user;
        this.wishItem = wishItem;
        this.guestType = guestType;
        this.type = type;
        this.amount = amount;
        this.relationship = relationship;
        this.sender = sender;
    }
}
