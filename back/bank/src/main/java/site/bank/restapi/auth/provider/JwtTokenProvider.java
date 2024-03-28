package site.bank.restapi.auth.provider;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import site.bank.restapi.auth.dto.common.TokenDto;

@Slf4j
@Component
public class JwtTokenProvider {

	private static final String AUTHORITIES_KEY = "role";
	private static final String TOKEN_TYPE = "Bearer";

	private final Key key;

	public JwtTokenProvider(@Value("${jwt.key}") String SECRET_KEY) {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public TokenDto generateToken(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));

		String accessToken = Jwts.builder()
			.setSubject(authentication.getName()) // 사용자 userId
			.claim(AUTHORITIES_KEY, authorities)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();

		log.debug("Access Token = {}", accessToken);

		return TokenDto.builder()
			.accessToken(accessToken)
			.tokenType(TOKEN_TYPE)
			.build();
	}

	public Claims parseClaims(String token) {
		try {
			log.debug("토큰으로부터 정보 추출...");
			return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}

	// 토큰으로부터 추출한 정보를 기반으로 AuthenticationToken 객체 생성
	public Authentication getAuthentication(String token) {
		Claims claims = parseClaims(token);
		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.toList();
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
		}
		return false;
	}

	public String resolveToken(String token) {
		if (token != null && token.startsWith(TOKEN_TYPE)) {
			return token.substring(7);
		}
		throw new UnsupportedJwtException("지원하지 않는 토큰 형식입니다.");
	}

}
