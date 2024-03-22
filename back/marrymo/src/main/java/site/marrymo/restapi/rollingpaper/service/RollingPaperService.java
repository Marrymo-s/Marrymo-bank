package site.marrymo.restapi.rollingpaper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.rollingpaper.dto.request.RollingPaperRegistRequest;
import site.marrymo.restapi.rollingpaper.dto.response.RollingPaperEach;
import site.marrymo.restapi.rollingpaper.dto.response.RollingPaperGetResponse;
import site.marrymo.restapi.rollingpaper.entity.RollingPaper;
import site.marrymo.restapi.rollingpaper.repository.RollingPaperRepository;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RollingPaperService {
    private final RollingPaperRepository rollingPaperRepository;
    private final UserRepository userRepository;

    public void registRollingPaper(String userCode, RollingPaperRegistRequest rollingPaperRegistRequest) {
        //1. userCode로 사용자 조회
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        RollingPaper rollingPaper = RollingPaper.builder()
                .user(user)
                .writer(rollingPaperRegistRequest.getWriter())
                .content(rollingPaperRegistRequest.getContent())
                .build();

        rollingPaperRepository.save(rollingPaper);
    }

    public RollingPaperGetResponse getRollingPaper(UserDTO userDTO) {
        //사용자 조회
        User user = userRepository.findByUserSequence(userDTO.getUserSequence())
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        List<RollingPaper> letterList = rollingPaperRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wish items not found"));

        List<RollingPaperEach> rollingPaperEachList = letterList.stream().map(letter -> RollingPaperEach.builder()
                        .writer(letter.getWriter())
                        .content(letter.getContent())
                        .createdAt(letter.getCreatedDate())
                        .build())
                .collect(Collectors.toList());

        return RollingPaperGetResponse.builder()
                .letterList(rollingPaperEachList)
                .build();
    }

}
