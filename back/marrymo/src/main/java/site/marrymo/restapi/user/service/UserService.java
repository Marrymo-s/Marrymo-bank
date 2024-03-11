package site.marrymo.restapi.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.marrymo.restapi.card.entity.Card;
import site.marrymo.restapi.card.exception.CardErrorCode;
import site.marrymo.restapi.card.exception.CardException;
import site.marrymo.restapi.card.repository.CardRepository;
import site.marrymo.restapi.global.config.AwsS3Config;
import site.marrymo.restapi.global.service.awsS3Service;
import site.marrymo.restapi.global.util.UserCodeGenerator;
import site.marrymo.restapi.user.dto.request.UserRegistRequest;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;
import site.marrymo.restapi.wedding_img.entity.WeddingImg;
import site.marrymo.restapi.wedding_img.repository.WeddingImgRepository;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final WeddingImgRepository weddingImgRepository;
    private final awsS3Service awsS3Service;

    public String makeUniqueUserCode(){
        UserCodeGenerator userCodeGenerator = new UserCodeGenerator();

        String uniqueUserCode = "";
        while(true){
            String userCode = userCodeGenerator.makeUserCode();

            //userCode가 유니크 한지 확인
            if(userRepository.findByUserCode(userCode).isEmpty()){
                uniqueUserCode = userCode;
                break;
            }
        }

        return uniqueUserCode;
    }

    public void registUserInfo(Long userSequence, UserRegistRequest userRegistRequest) {
        //user table에 email 정보 저장
        User user = userRepository.findByUserSequence(userSequence)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUNT));


        user.modifyUserEmail(userRegistRequest.getEmail());
        userRepository.save(user);

        //card table에 청첩장 정보 저장
        cardRepository.save(Card.builder()
                .user(user)
                .groomName(userRegistRequest.getGroomName())
                .brideName(userRegistRequest.getBrideName())
                .groomContact(userRegistRequest.getGroomContact())
                .brideContact(userRegistRequest.getBrideContact())
                .weddingDate(LocalDate.parse(userRegistRequest.getWeddingDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .weddingTime(LocalTime.parse(userRegistRequest.getWeddingTime(), DateTimeFormatter.ofPattern("HH:mm:ss")))
                .invitationUrl("https://marrymo.site/"+user.getUserCode())
                .location(userRegistRequest.getLocation())
                .groomFather(userRegistRequest.getGroomFather())
                .groomMother(userRegistRequest.getGroomMother())
                .brideFather(userRegistRequest.getBrideFather())
                .brideMother(userRegistRequest.getBrideMother())
                .greeting(userRegistRequest.getGreeting())
                .build());

        //웨딩 이미지에 이미지 정보 저장
        Card card = cardRepository.findByUser(user)
                .orElseThrow(() -> new CardException(CardErrorCode.CARD_NOT_FOUND));

        if(userRegistRequest.getImgUrl() != null){
            for(MultipartFile file : userRegistRequest.getImgUrl()){
                System.out.println("fileName:"+file.getOriginalFilename());
//                try {
                    weddingImgRepository.save(
                            WeddingImg.builder()
                                    .card(card)
                                    .imgUrl(file.getOriginalFilename())
                                    .build());

//                    awsS3Service.uploadFileImage("wedding_img", file, user.getUserCode());
//                } catch (IOException e) {
//                    throw new RuntimeException(e);
//                }
            }
        }
    }
}
