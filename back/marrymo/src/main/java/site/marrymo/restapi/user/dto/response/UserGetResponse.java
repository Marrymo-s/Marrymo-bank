package site.marrymo.restapi.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.user.entity.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
public class UserGetResponse {
    private Long userSequence;
    private String groomName;
    private String brideName;
    private String groomContact;
    private String brideContact;
    private LocalDate weddingDate;
    private LocalTime weddingTime;
    private String location;
    private String email;
    private String greeting;
    private String groomFather;
    private String groomMother;
    private String brideFather;
    private String brideMother;
    private List<String> imgUrl;

    public static UserGetResponse toDto(User user, Card card, List<String> imgUrl){
        return UserGetResponse.builder()
                .userSequence(user.getUserSequence())
                .groomName(card.getGroomName())
                .brideName(card.getBrideName())
                .groomContact(card.getGroomContact())
                .brideContact(card.getBrideContact())
                .weddingDate(card.getWeddingDate())
                .weddingTime(card.getWeddingTime())
                .location(card.getLocation())
                .email(user.getEmail())
                .greeting(card.getGreeting())
                .groomFather(card.getGroomFather())
                .groomMother(card.getGroomMother())
                .brideFather(card.getBrideFather())
                .brideMother(card.getBrideMother())
                .imgUrl(imgUrl)
                .build();
    }
}
