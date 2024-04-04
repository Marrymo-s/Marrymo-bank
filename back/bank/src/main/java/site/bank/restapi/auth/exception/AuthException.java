package site.bank.restapi.auth.exception;

import site.bank.restapi.global.exception.BankException;
import site.bank.restapi.global.exception.ErrorCode;

public class AuthException extends BankException {
    public AuthException(ErrorCode errorCode){
        super(errorCode);
    }
}
