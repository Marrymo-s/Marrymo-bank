package site.marrymo.restapi.open_banking.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.open_banking.dto.request.MoBankCheckAccountRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mo-banking")
public class MoBankingController {

    @GetMapping
    public ResponseEntity<?> checkAccount(@RequestBody MoBankCheckAccountRequest){
        // 등록할 수 있는 계좌인지 확인
        return ResponseEntity.ok("");
    }
}
