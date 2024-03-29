package site.marrymo.restapi.global.smtp.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class SmtpException extends MarrymoException {
    public SmtpException(ErrorCode errorCode){
        super(errorCode);
    }
}
