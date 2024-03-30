package site.marrymo.restapi.wishitem.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum WishItemErrorCode implements ErrorCode{
    WISH_ITEM_NOT_FOUNT_FOR_USER(404, "WIS_001", "USER를 통해 WISH ITEM을 찾을 수 없습니다.");

    private int statusCode;
    private String errorCode;
    private String message;
}
