package site.marrymo.restapi.global.smtp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.smtp.dto.request.SmtpRegistRequest;
import site.marrymo.restapi.global.smtp.dto.request.SmtpVerifyRequest;
import site.marrymo.restapi.global.smtp.service.SmtpService;
import site.marrymo.restapi.user.service.UserService;

@Slf4j
@RestController
@RequestMapping("/api/smtp")
@RequiredArgsConstructor
public class SmtpController {

	private final UserService userService;
	@PostMapping("/send")
	public void sendMessage(@Valid @RequestBody SmtpRegistRequest smtpRegistRequest) {
		userService.sendCodeToEmail(smtpRegistRequest.getEmail());
	}

	@PostMapping("/authcode/verifications")
	public ResponseEntity<Boolean> verifiedAuthCode(@Valid @RequestBody SmtpVerifyRequest smtpVerifyRequest){
		Boolean isVerify = userService.verifiedAuthCode(smtpVerifyRequest);
		return ResponseEntity.ok(isVerify);
	}
}
