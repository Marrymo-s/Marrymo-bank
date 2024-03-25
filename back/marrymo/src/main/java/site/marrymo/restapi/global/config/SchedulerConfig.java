package site.marrymo.restapi.global.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.card.service.CardService;
import site.marrymo.restapi.global.service.ExcelService;
import site.marrymo.restapi.user.entity.User;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SchedulerConfig {

	private final CardService cardService;
	private final ExcelService excelService;

	@Scheduled(cron = "0 0 3 * * *", zone = "Asia/Seoul")
	public void makeExcel() throws IOException {
		// 1. 결혼식 당일인 사람 찾아서
		List<User> users = cardService.findUserSequenceByWeddingDateAndIsIssued();
		// 2. 해당 사람들의 데이터를 정제해서
		for(User user : users){
			// 3. 엑셀 파일을 만들고
		//	String excelURL=schedulerService.getMoneygiftExcel(user);

		}
		// 4. 보낸다.
	}
}
