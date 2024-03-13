package site.marrymo.restapi.rollingpaper.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.rollingpaper.dto.request.RollingPaperRegistRequest;
import site.marrymo.restapi.rollingpaper.entity.RollingPaper;
import site.marrymo.restapi.rollingpaper.repository.RollingPaperRepository;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class RollingPaperService {
    private final RollingPaperRepository rollingPaperRepository;
    private final UserRepository userRepository;

    public void registRollingPaper(String userCode, RollingPaperRegistRequest rollingPaperRegistRequest) {
        //1. userCode로 사용자 조회
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUNT));

        RollingPaper rollingPaper = RollingPaper.builder()
                .writer(rollingPaperRegistRequest.getWriter())
                .content(rollingPaperRegistRequest.getContent())
                .build();

        rollingPaperRepository.save(rollingPaper);
    }


}
