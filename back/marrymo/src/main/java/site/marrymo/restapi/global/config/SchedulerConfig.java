package site.marrymo.restapi.global.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.auth.service.SmtpService;
import site.marrymo.restapi.card.service.CardService;
import site.marrymo.restapi.global.service.ExcelService;
import site.marrymo.restapi.user.entity.User;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SchedulerConfig {

	private final CardService cardService;
	private final ExcelService excelService;
	private final SmtpService smtpService;

	@Scheduled(cron = "0 0 3 * * *", zone = "Asia/Seoul")
	public void makeExcel() throws IOException, MessagingException {
		List<User> users = cardService.findUserSequenceByWeddingDateAndIsIssued();
		for (User user : users) {
			String excelURL = excelService.moneygiftExcelURL(user.getUserCode());
			smtpService.sendEmail(user.getEmail(), excelURL, user.getCard().getBrideName(),
				user.getCard().getGroomName());
		}
	}
}
