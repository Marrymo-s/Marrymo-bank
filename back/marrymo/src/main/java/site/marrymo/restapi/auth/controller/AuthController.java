package site.marrymo.restapi.auth.controller;

import java.io.IOException;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.marrymo.restapi.auth.dto.request.SmtpRegistRequest;
import site.marrymo.restapi.auth.service.SmtpService;
import site.marrymo.restapi.global.service.ExcelService;
import site.marrymo.restapi.user.entity.User;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final SmtpService smtpService;
	private final ExcelService excelService;

	@PostMapping("/send-email")
	public void registMail(@Valid @RequestBody SmtpRegistRequest smtpRegistRequest) {
		smtpService.registMail(smtpRegistRequest.getEmail(), "Marrymo 이메일 인증", "이메일 인증 번호 : ");
	}

	//    @PostMapping("/verify-email")
	//    public ResponseEntity verifyMail(@Valid @RequestBody SmtpVerifyRequest smtpVerifyRequest) {
	//        return true;
	//    }

	// @GetMapping("/excel")
	// public void excel(HttpServletResponse response) throws IOException {
	// 	excelService.getMoneygiftExcel("aaaa1111", response);
	// }
}
