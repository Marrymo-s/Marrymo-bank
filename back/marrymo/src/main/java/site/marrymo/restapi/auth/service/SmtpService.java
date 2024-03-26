package site.marrymo.restapi.auth.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SmtpService {

	private final JavaMailSender javaMailSender;

	public void registMail(String mail, String title, String text) {

		SimpleMailMessage emailForm = createEmailForm(mail, title, text);
		try {
			javaMailSender.send(emailForm);
		} catch (RuntimeException e) {
			log.debug("MailService.sendEmail exception occur toEmail: {}, " +
				"title: {}, text: {}", mail, title, text);
			throw new IllegalArgumentException("틀림요");
		}
	}

	// 발신할 이메일 데이터 세팅
	private SimpleMailMessage createEmailForm(String mail,
		String title,
		String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mail);
		message.setSubject(title);
		message.setText(text);

		return message;
	}

	public void sendEmail(String email, String fileUrl, String bride, String groom) throws MessagingException {
		String setForm = "smarp4643@gmail.com";
		String title = bride + "님, " + groom + "님의 축의금 정산 내역입니다.";
		String content =
			"안녕하세요, Marrymo 입니다. <br>" +
				"<strong>" + bride + "</strong>님, <strong>" + groom
				+ "</strong>님의 결혼을 진심으로 축하드립니다. 두 분의 새로운 시작을 응원하며, 행복한 결혼 생활을 기원합니다. <br>" +
				"결혼식에 참석해주신 모든 분들의 따뜻한 마음과 축복의 메시지가 담긴 축의금 정산 내역을 첨부하여 드립니다. <br>"
				+ " 모든 분들께서 보내주신 사랑과 지원에 감사드리며, 정산 내역을 통해 두 분의 새 출발이 더욱 뜻깊어지길 바랍니다. <br><br>"
				+ " <a href = " + fileUrl + "> 축의금 정산 내역 파일 링크</a> <br><br>"
				+ "정산 내역에 대해 궁금하신 점이나 논의하고 싶으신 부분이 있으시면 언제든지 연락 주시기 바랍니다.<br>"
				+ "다시 한번 축하의 말씀을 드리며, 두 분의 앞날에 행복이 가득하기를 기원합니다.<br>" +
				"감사합니다.<br><br>"
				+ "이메일 : officialmarrymo@gmail.com";

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false, "UTF-8");
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject(title);
		mimeMessageHelper.setFrom(setForm);
		mimeMessageHelper.setText(content, true);
		javaMailSender.send(message);
		log.info("request to send email successfully.");
	}
}
