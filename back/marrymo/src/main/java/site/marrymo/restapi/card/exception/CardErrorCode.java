package site.marrymo.restapi.card.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum CardErrorCode implements ErrorCode {
    CARD_NOT_FOUND(404, "CAR_001", "청첩장 조회 실패");

    private int statusCode;
    private String errorCode;
    private String message;
}
