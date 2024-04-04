package site.marrymo.restapi.global.smtp.controller;

import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/smtp")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class SmtpController {

	private final UserService userService;
	@PostMapping("/send")
	@Operation(summary = "smtp 메일 인증번호 전송 (테스트 완료)", description = "사용자 정보 등록 시, 사용자 메일을 입력하고 인증 버튼을 누르면 메일이 갑니다.")
	public void sendMessage(@Valid @RequestBody SmtpRegistRequest smtpRegistRequest) {
		log.debug("/stmp/send 실행");
		userService.sendCodeToEmail(smtpRegistRequest.getEmail());
	}

	@PostMapping("/authcode/verifications")
	@Operation(summary = "smtp 메일 인증 확인 (테스트 완료)", description = "사용자는 marrymo가 보낸 인증번호를 입력하여 메일 인증을 할 수 있습니다.")
	public ResponseEntity<Boolean> verifiedAuthCode(@Valid @RequestBody SmtpVerifyRequest smtpVerifyRequest){
		Boolean isVerify = userService.verifiedAuthCode(smtpVerifyRequest);
		return ResponseEntity.ok(isVerify);
	}
}
