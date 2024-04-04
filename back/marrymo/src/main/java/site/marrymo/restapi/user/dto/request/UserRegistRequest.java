package site.marrymo.restapi.user.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
@Builder
public class UserRegistRequest {
    @NotEmpty(message = "신랑 이름은 빈칸이면 안되고 null이어도 안됩니다")
    private String groomName;

    @NotEmpty(message = "신부 이름은 빈칸이면 안되고 null이어도 안됩니다")
    private String brideName;

    @NotEmpty(message = "신랑 연락처는 빈칸이면 안되고 null이어도 안됩니다")
    private String groomContact;

    @NotEmpty(message = "신부 연락처는 빈칸이면 안되고 null이어도 안됩니다")
    private String brideContact;

    @NotEmpty(message = "결혼식 날짜는 빈칸이면 안되고 null이어도 안됩니다")
    private String weddingDate;

    @NotEmpty(message = "결혼식 요일은 필수적입니다")
    private String weddingDay;

    @NotEmpty(message = "결혼식 시간은 빈칸이면 안되고 null이어도 안됩니다")
    private String weddingTime;

    @NotEmpty(message = "결혼식 장소는 빈칸이면 안되고 null이어도 안됩니다")
    private String location;

    @NotEmpty(message = "정산을 받을 이메일은 빈칸이면 안되고 null이어도 안됩니다")
    private String email;

    @NotEmpty(message = "결혼 인사말은 빈칸이면 안되고 null이어도 안됩니다")
    private String greeting;

    private String groomFather;
    private String groomMother;
    private String brideFather;
    private String brideMother;
    private List<MultipartFile> imgUrl;
}
