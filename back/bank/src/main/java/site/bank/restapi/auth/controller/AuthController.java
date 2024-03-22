package site.bank.restapi.auth.controller;

import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.bank.restapi.auth.dto.common.TokenDto;
import site.bank.restapi.auth.dto.request.ClientRequest;
import site.bank.restapi.auth.service.AuthService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/token")
	public ResponseEntity<?> authenticateClient(@RequestBody ClientRequest client, HttpServletRequest request) {
		TokenDto token = authService.authenticateClient(client);
		return ResponseEntity.ok(token.toResponse());
	}
}
