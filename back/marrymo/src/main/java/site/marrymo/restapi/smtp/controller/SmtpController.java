package site.marrymo.restapi.smtp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.marrymo.restapi.smtp.service.SmtpService;

@Slf4j
@RestController
@RequestMapping("/smtp")
@RequiredArgsConstructor
public class SmtpController {
    private final SmtpService smtpService;

    @PostMapping("/send-email")
    public ResponseEntity sendMail(@RequestBody ) {

        smtpService.sendMail("ehtjd33@gmail.com", "제목입니다.", "테스트입니다.");
}
