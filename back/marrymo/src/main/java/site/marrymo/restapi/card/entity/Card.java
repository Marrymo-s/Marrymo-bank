package site.marrymo.restapi.card.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;

import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE card SET deleted_at = NOW() WHERE card_sequence = ?")
@Table(name="card")
public class Card extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_sequence")
    private Long cardSequence;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sequence", referencedColumnName = "user_sequence")
    User user;

    @NotNull
    @Column(name = "groom_name")
    private String groomName;

    @NotNull
    @Column(name = "bride_name")
    private String brideName;

    @NotNull
    @Column(name = "groom_contact")
    private String groomContact;

    @NotNull
    @Column(name = "bride_contact")
    private String brideContact;

    @NotNull
    @Column(name = "wedding_date")
    private LocalDateTime weddingDate;

    @NotNull
    @Column(name = "invitation_url")
    private String invitationUrl;

    @NotNull
    @Column(name = "location")
    private String location;

    @Column(name = "groom_father")
    private String groomFather;

    @Column(name = "groom_mother")
    private String groomMother;

    @Column(name = "bride_father")
    private String brideFather;

    @Column(name = "bride_mother")
    private String brideMother;

    @NotNull
    @Column(name = "is_issued")
    private boolean isIssued;

    @Builder
    public Card(String groomName,
                String brideName,
                String groomContact,
                String brideContact,
                LocalDateTime weddingDate,
                String invitationUrl,
                String location,
                String groomFather,
                String groomMother,
                String brideFather,
                String brideMother,
                boolean isIssued
                ){
        this.groomName = groomName;
        this.brideName = brideName;
        this.groomContact = groomContact;
        this.brideContact = brideContact;
        this.weddingDate = weddingDate;
        this.invitationUrl = invitationUrl;
        this.location = location;
        this.groomFather = groomFather;
        this.groomMother = groomMother;
        this.brideFather = brideFather;
        this.brideMother = brideMother;
        this.isIssued = isIssued;
    }
}
