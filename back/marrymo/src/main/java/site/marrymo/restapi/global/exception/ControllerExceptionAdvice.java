package site.marrymo.restapi.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ControllerExceptionAdvice {
    @ExceptionHandler(MarrymoException.class)
    public ResponseEntity<?> handlerException(MarrymoException e){
        int statusCode = e.getStatusCode();
        List<String> errors = new ArrayList<>();
        errors.add(e.getMessage());

        return ResponseEntity.status(statusCode).body(errors);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handlerException(MethodArgumentNotValidException e){
        List<String> errors = new ArrayList<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.add(error.getDefaultMessage());
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
