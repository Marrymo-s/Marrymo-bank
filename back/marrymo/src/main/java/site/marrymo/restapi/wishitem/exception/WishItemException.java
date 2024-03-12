package site.marrymo.restapi.wishitem.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class WishItemException extends MarrymoException {
    public WishItemException(ErrorCode errorCode) {super(errorCode);}
}
