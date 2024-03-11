package site.marrymo.restapi.user.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class UserException extends MarrymoException {
    public UserException(ErrorCode errorCode){
        super(errorCode);
    }
}
