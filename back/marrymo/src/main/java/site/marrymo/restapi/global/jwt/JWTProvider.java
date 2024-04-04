package site.marrymo.restapi.global.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import site.marrymo.restapi.global.jwt.dto.TokenDTO;
import site.marrymo.restapi.global.jwt.dto.VerifyToken;
import site.marrymo.restapi.global.jwt.entity.RefreshToken;
import site.marrymo.restapi.global.redis.service.RedisService;
import site.marrymo.restapi.user.repository.BlackListRepository;
import site.marrymo.restapi.user.repository.UserRepository;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTProvider {
    @Value("${jwt.salt}")
    private String salt;

    //access token 만료 기한 1 hour
    @Value("${jwt.access-token.expiretime}")
    private long accessTokenExpireTime;

    //refresh token 만료 기한 30 days
    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;

    private long accessTokenExpiresIn;
    private long refreshTokenExpiresIn;

    private final UserRepository userRepository;
    private final BlackListRepository blackListRepository;
    private final RedisService redisService;

    public TokenDTO createAccessToken(String userCode){
        String token = create(userCode, "access-token", accessTokenExpireTime);
        return TokenDTO.builder()
                .token(token)
                .expired(this.accessTokenExpiresIn)
                .build();
    }

    public TokenDTO createRefreshToken(String userCode){
        String token = create(userCode, "refresh-token", refreshTokenExpireTime);
        return TokenDTO.builder()
                .token(token)
                .expired(this.refreshTokenExpiresIn)
                .build();
    }

    //Token 발급
    //payload
    //"userCode" : "abcd1234" (앞 네자리는 소문자 랜덤, 뒤 네자리는 0-9까지 숫자 랜덤)
    private String create(String userCode, String subject, long expireTime){
        //payload 설정 : 생성일(IssuedAt), 유효기간(Expiration)
        //토큰 제목 (subject), 데이터 (claim) 정보 셋팅
        Date expTime = new Date(System.currentTimeMillis() + expireTime);
        if(subject.equals("access-token")){
            this.accessTokenExpiresIn = expTime.getTime()/1000;
        }
        else{
            this.refreshTokenExpiresIn = expTime.getTime()/1000;
        }
        Claims claims = Jwts.claims()
                .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                .setIssuedAt(new Date()) // 생성일 설정
                .setExpiration(expTime); // 만료일 설정 (유효기간)

        //저장할 data의 key, value
        claims.put("userCode", userCode);

        String jwt = Jwts.builder()
                .setHeaderParam("typ","JWT").setClaims(claims) // Header 설정 : 토큰의 타입, 해쉬 알고리즘 정보 세팅
                .signWith(SignatureAlgorithm.HS256, this.generateKey()) // Signature 설정 : secret key를 활용한 암호화
                .compact(); // 직렬화 처리

        return jwt;
    }

    public VerifyToken generateVerifyToken(String userCode) {
        TokenDTO accessToken = this.createAccessToken(userCode);
        TokenDTO refreshToken = this.createRefreshToken(userCode);

        //redis에 refresh 토큰 저장
        RefreshToken redis = new RefreshToken(refreshToken.getToken(), userCode);
        redisService.setValue(redis.getRefreshToken(), userCode, refreshTokenExpireTime);

        return VerifyToken.builder()
                .accessToken(accessToken.getToken())
                .accessTokenExpiresIn(accessToken.getExpired())
                .refreshToken(refreshToken.getToken())
                .refreshTokenExpiresIn(refreshToken.getExpired())
                .build();
    }

    // Signature에 설정에 들어갈 key 생성
    private byte[] generateKey(){
        byte[] key = null;
        try{
            key = salt.getBytes("UTF-8");
        } catch(UnsupportedEncodingException e){
            if(log.isInfoEnabled()){
                e.printStackTrace();
            } else{
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }
        return key;
    }

    public String getUserCode(String token){
        Jws<Claims> claims = null;

        try{
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
        } catch(ExpiredJwtException e){
            //토큰이 만료된 경우
            log.error("Token is expired: {}", e.getMessage());

            Claims expiredClaims = e.getClaims();
            String userCode = (String)expiredClaims.get("userCode");

            return userCode;
        } catch(Exception e){
            //기타 예외 처리
            log.error(e.getMessage());
        }

        Map<String, Object> value = claims.getBody();
        log.info("value : {}", value);

        return (String)value.get("userCode");
    }

    //토큰 유효성 검증
    //1. 두 개의 토큰이 모두 만료 되면 -> 재 로그인 에러 메시지를 띄우고, refresh와 access 모두 새로 발급
    //2. access 토큰이 만료되고, refresh 토큰은 유효 하면 -> refresh 토큰 검증하고 aceess 토큰 발급
    //3. access 토큰은 유효하고, refresh 토큰은 만료된 경우 -> access 토큰 검증하고 refresh 토큰 발급

    //토큰 만료 시간 조회
    public Date getExpirationDateFromToken(String token){
        Date expiration = null;
        Claims claims = null;

        try{
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token).getBody();
            expiration = claims.getExpiration();
        } catch(ExpiredJwtException e){
            //토큰이 만료된 경우
            log.error("Token is expired: {}", e.getMessage());

            Claims expiredClaims = e.getClaims();
            expiration = expiredClaims.getExpiration();

            return expiration;
        } catch(Exception e){
            log.error("Unhandled exception occurred while invoke getExpirationDateFromToken()");
        }

        return expiration;
    }

    //토큰 만료 여부 검증
    public Boolean isTokenExpired(String token){
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //토큰으로 부터 받아온 userCode가 marrymo db에 존재하는가?
    public boolean isExistUserCodeInMarrymo(String token){
        String userCode = getUserCode(token);

        if(userRepository.findByUserCode(userCode).isPresent())
            return true;
        else
            return false;
    }

    //refresh token이 redis에 존재하는가?
    public boolean isExistRefreshTokenInRedis(String refreshToken){
        if(redisService.getValue(refreshToken).equals(getUserCode(refreshToken))){
            return true;
        }
        else{
            return false;
        }
    }


    // 이미 로그아웃 돼서 없어진 refresh token을 가지고 접근 할 경우에 대비하여
    // black_list 테이블에서 해당 refresh token이 있는지 확인
    public boolean validateLogoutToken(String refreshToken) {
        if (blackListRepository.findByInvalidRefreshToken(refreshToken).isPresent()) {
            return true;
        }
        else{
            return false;
        }
    }

    //토큰이 유효한가
    public boolean isValidateToken(String token){
        //토큰이 유효기간이 남아 있고
        //메리모 user table 안에 해당하는 usercode가 있는지 확인
        if(!isTokenExpired(token) && isExistUserCodeInMarrymo(token)){
            return true;
        }
        else{
            return false;
        }
    }

    public Map<String, Object> reIssueToken(String accessToken, String refreshToken, String userCode){
        Map<String, Object> tokens = new HashMap<>();

        // 두 개 토큰이 모두 유효하지 않은 경우
        if(!isValidateToken(accessToken) && !isValidateToken(refreshToken)){
            TokenDTO accessTokenDTO = createAccessToken(userCode);
            TokenDTO refreshTokenDTO = createRefreshToken(userCode);

            tokens.put("accessToken", accessTokenDTO);
            tokens.put("refreshToken", refreshTokenDTO);
        }
        // refresh 토큰만 만료 된 경우
        // refresh 토큰만 새로 발급
        else if(isValidateToken(accessToken) && !isValidateToken(refreshToken)){
            TokenDTO refreshTokenDTO = createRefreshToken(userCode);

            tokens.put("refreshToken", refreshTokenDTO);
        }
        // access 토큰만 만료 된 경우
        // acess 토큰을 발급하고
        // refresh 토큰이 redis에 있는지 확인
        // 없다면 refresh token도 같이 발급
        else if(!isValidateToken(accessToken) && isValidateToken(refreshToken)){
            TokenDTO accessTokenDTO = createAccessToken(userCode);

            tokens.put("accessToken", accessTokenDTO);

            if(!isExistRefreshTokenInRedis(refreshToken)){
                TokenDTO refreshTokenDTO = createRefreshToken(userCode);

                tokens.put("refreshToken", refreshTokenDTO);
            }
        }

        return tokens;
    }
}

