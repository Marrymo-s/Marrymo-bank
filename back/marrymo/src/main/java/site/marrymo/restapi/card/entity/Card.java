package site.marrymo.restapi.card.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.SQLDelete;

import site.marrymo.restapi.global.entity.BaseTimeEntity;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.wedding_img.entity.WeddingImg;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE card SET deleted_at = NOW() WHERE card_sequence = ?")
@Table(name="card")
public class Card extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_sequence")
    private Long cardSequence;

    @NotNull
    @OneToOne
    @JoinColumn(name = "user_sequence", referencedColumnName = "user_sequence", nullable = false)
    private User user;

    @NotNull
    @Column(name = "groom_name", nullable = false)
    private String groomName;

    @NotNull
    @Column(name = "bride_name", nullable = false)
    private String brideName;

    @NotNull
    @Column(name = "groom_contact", nullable = false)
    private String groomContact;

    @NotNull
    @Column(name = "bride_contact", nullable = false)
    private String brideContact;

    @NotNull
    @Column(name = "wedding_date", nullable = false)
    private LocalDate weddingDate;

    @NotNull
    @Column(name = "wedding_day", nullable = false)
    private String weddingDay;

    @NotNull
    @Column(name = "wedding_time", nullable = false)
    private LocalTime weddingTime;

    @Column(name = "invitation_url")
    private String invitationUrl;

    @NotNull
    @Column(name = "location", nullable = false)
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
    @Column(name = "is_issued", nullable = false)
    private Boolean isIssued;

    @NotNull
    @Column(nullable = false)
    private String greeting;

    @OneToMany(mappedBy = "card")
    private List<WeddingImg> weddingImgs=new ArrayList<>();

    @Builder
    public Card(
                User user,
                String groomName,
                String brideName,
                String groomContact,
                String brideContact,
                LocalDate weddingDate,
                String weddingDay,
                LocalTime weddingTime,
                String invitationUrl,
                String location,
                String groomFather,
                String groomMother,
                String brideFather,
                String brideMother,
                Boolean isIssued,
                String greeting
                ){
        this.user = user;
        this.groomName = groomName;
        this.brideName = brideName;
        this.groomContact = groomContact;
        this.brideContact = brideContact;
        this.weddingDate = weddingDate;
        this.weddingDay = weddingDay;
        this.weddingTime = weddingTime;
        this.invitationUrl = invitationUrl;
        this.location = location;
        this.groomFather = groomFather;
        this.groomMother = groomMother;
        this.brideFather = brideFather;
        this.brideMother = brideMother;
        this.isIssued = isIssued;
        this.greeting = greeting;
    }

    public void modifyGroomName(String groomName){
        this.groomName = groomName;
    }

    public void modifyBrideName(String brideName){
        this.brideName = brideName;
    }

    public void modifyGroomContact(String groomContact){
        this.groomContact = groomContact;
    }

    public void modifyBrideContact(String brideContact){
        this.brideContact = brideContact;
    }

    public void modifyWeddingDate(LocalDate weddingDate){
        this.weddingDate = weddingDate;
    }

    public void modifyWeddingDay(String weddingDay) { this.weddingDay = weddingDay; }

    public void modifyWeddingTime(LocalTime weddingTime){
        this.weddingTime = weddingTime;
    }

    public void modifyLocation(String location){
        this.location = location;
    }

    public void modifyGreeting(String greeting){
        this.greeting = greeting;
    }

    public void modifyGroomFather(String groomFather){
        this.groomFather = groomFather;
    }

    public void modifyGroomMother(String groomMother){
        this.groomMother = groomMother;
    }

    public void modifyBrideFather(String brideFather){
        this.brideFather = brideFather;
    }

    public void modifyBrideMother(String brideMother){
        this.brideMother = brideMother;
    }

    public void modifyIsIssued(Boolean isIssued) {this.isIssued = isIssued;}

    public void modifyInvitationUrl(String invitationUrl){this.invitationUrl = invitationUrl;}
}
