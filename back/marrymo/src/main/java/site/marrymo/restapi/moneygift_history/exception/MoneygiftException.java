package site.marrymo.restapi.moneygift_history.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class MoneygiftException extends MarrymoException {
    public MoneygiftException(ErrorCode errorCode){ super(errorCode);}
}
