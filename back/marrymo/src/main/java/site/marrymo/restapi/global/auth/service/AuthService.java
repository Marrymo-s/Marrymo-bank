package site.marrymo.restapi.global.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.global.auth.dto.response.VerifyTokenResponse;
import site.marrymo.restapi.global.entity.RefreshToken;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.dto.TokenDTO;
import site.marrymo.restapi.global.repository.RefreshTokenRepository;
import site.marrymo.restapi.user.repository.UserRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final JWTProvider jwtProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public VerifyTokenResponse generateVerifyToken(String userCode){
        TokenDTO accessToken = jwtProvider.createAccessToken(userCode);
        TokenDTO refreshToken = jwtProvider.createRefreshToken(userCode);

        // redis에 저장
        refreshTokenRepository.save(RefreshToken.builder()
                .id(userCode)
                .value(refreshToken.getToken())
                .build());

        return VerifyTokenResponse.builder()
                .accessToken(accessToken.getToken())
                .accessTokenExpiresIn(accessToken.getExpired())
                .refreshToken(refreshToken.getToken())
                .refreshTokenExpiresIn(refreshToken.getExpired())
                .build();
    }
}
