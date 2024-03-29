package site.marrymo.restapi.global.smtp.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum SmtpErrorCode implements ErrorCode {
    UNABLE_TO_SEND_EMAIL(400, "smtp_001", "이메일을 전송 할 수 없습니다.");

    private int statusCode;
    private String errorCode;
    private String message;
}
