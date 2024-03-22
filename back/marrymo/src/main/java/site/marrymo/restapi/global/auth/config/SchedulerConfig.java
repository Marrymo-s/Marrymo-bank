package site.marrymo.restapi.global.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class SchedulerConfig {

	@Scheduled(cron="0 0 3 * * *",zone = "Asia/Seoul")
	public void makeExcel(){
		// 1. 결혼식 당일인 사람 찾아서
		// 2. 해당 사람들의 데이터를 정제해서
		// 3. 엑셀 파일을 만들고
		// 4. 보낸다.
	}
}
