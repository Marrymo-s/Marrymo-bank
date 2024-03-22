package site.bank.restapi.global.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class ControllerExceptionHandler {

    @ExceptionHandler(BankException.class)
    public ResponseEntity<?> handlerException(BankException e){
        int statusCode = e.getStatusCode();
        List<String> errors = new ArrayList<>();
        errors.add(e.getMessage());

        return ResponseEntity.status(statusCode).body(errors);
    }



}
