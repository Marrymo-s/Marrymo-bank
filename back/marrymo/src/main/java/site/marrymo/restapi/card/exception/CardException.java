package site.marrymo.restapi.card.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class CardException extends MarrymoException {
    public CardException(ErrorCode errorCode){
        super(errorCode);
    }
}
