package site.bank.restapi.transfer.exception;

import site.bank.restapi.global.exception.BankException;
import site.bank.restapi.global.exception.ErrorCode;

public class TransferException extends BankException {
    public TransferException(ErrorCode erroCode){
        super(erroCode);
    }
}
