package site.marrymo.restapi.global.smtp.controller;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.smtp.dto.request.SmtpRegistRequest;
import site.marrymo.restapi.global.smtp.service.SmtpService;

@Slf4j
@RestController
@RequestMapping("/api/smtp")
@RequiredArgsConstructor
public class SmtpController {

	private final SmtpService smtpService;
	@PostMapping("/send-email")
	public void registMail(@Valid @RequestBody SmtpRegistRequest smtpRegistRequest) {
		smtpService.registMail(smtpRegistRequest.getEmail(), "Marrymo 이메일 인증", "이메일 인증 번호 : ");
	}

	//    @PostMapping("/verify-email")
	//    public ResponseEntity verifyMail(@Valid @RequestBody SmtpVerifyRequest smtpVerifyRequest) {
	//        return true;
	//    }

}
