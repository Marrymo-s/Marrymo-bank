package site.marrymo.restapi.global.scheduler.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.smtp.service.SmtpService;
import site.marrymo.restapi.card.service.CardService;
import site.marrymo.restapi.global.scheduler.service.ExcelService;
import site.marrymo.restapi.user.dto.MarriedCoupleDTO;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.entity.User;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SchedulerConfig {

	private final CardService cardService;
	private final ExcelService excelService;
	private final SmtpService smtpService;

	@Scheduled(cron = "00 00 03 * * *", zone = "Asia/Seoul")
	public void makeExcel() throws IOException, MessagingException {
		List<User> users = cardService.findUserSequenceByWeddingDateAndIsIssued();
		for (User user : users) {
			UserDTO userDTO = UserDTO.toDTO(user);
			MarriedCoupleDTO marriedCoupleDTO = MarriedCoupleDTO.builder()
				.brideName(user.getCard().getBrideName())
				.groomName(user.getCard().getGroomName())
				.build();
			String excelURL = excelService.moneygiftExcelURL(userDTO);
			smtpService.sendEmail(userDTO.getEmail(), excelURL, marriedCoupleDTO.getBrideName(),
				marriedCoupleDTO.getGroomName());
		}
	}
}

