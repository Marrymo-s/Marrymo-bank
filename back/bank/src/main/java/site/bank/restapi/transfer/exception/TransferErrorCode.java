package site.bank.restapi.transfer.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.bank.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum TransferErrorCode implements ErrorCode {

    TRANSFER_NOT_FOUND_BANK(404,"BAN001","은행 정보 조회 실패"),
    TRANSFER_REGISTER_ACCOUNT_FAILED(404,"BAN002","계좌 등록 실패"),
    TRANSFER_RESISTER_HISTORY_FAILED(404,"BAN003","거래 내역 등록 실패"),
    TRANSFER_ISSUE_TOKEN_FAILED(404,"BAN004","ACCESS TOKEN 발급 실패"),
    TRANSFER_SEND_FAILED(404,"BAN005","이체 실패"),
    TRANSFER_NOT_FOUND_FINTECHNUM(404,"BAN006","등록되지 않은 핀테크 계좌번호"),
    TRANSFER_PROCESS_FAILED(404,"BAN007","API 요청을 처리할 수 없습니다."),
    TRANSFER_ACCOUNT_NOT_FOUND(404,"BAN008","계좌 조회 실패"),
    TRANSFER_BALANCE_NOT_ENOUGH(404,"BAN009","계좌 잔액 부족");
    private int statusCode;
    private String errorCode;
    private String message;
}
