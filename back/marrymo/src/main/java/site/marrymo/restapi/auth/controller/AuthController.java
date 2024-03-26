package site.marrymo.restapi.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.marrymo.restapi.auth.service.AuthService;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	@GetMapping("/logout")
	public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
		authService.logout(httpServletRequest, httpServletResponse);
	}

}
