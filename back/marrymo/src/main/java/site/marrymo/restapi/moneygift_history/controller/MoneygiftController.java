package site.marrymo.restapi.moneygift_history.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.global.annotation.LoginUser;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.moneygift_history.service.MoneygiftService;
import site.marrymo.restapi.user.dto.UserDTO;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/moneygift")
public class MoneygiftController {
    private final MoneygiftService moneygiftService;

    @GetMapping
    public ResponseEntity<MoneygiftGetResponse> getMoneygiftListInfo(@LoginUser UserDTO userDTO){
        MoneygiftGetResponse moneygiftGetResponse = moneygiftService.getMoneygiftInfo(userDTO);
        return ResponseEntity.ok(moneygiftGetResponse);
    }
    @PostMapping
    public ResponseEntity<MoneygiftTransferResponse> sendMoneygift(@RequestBody MoneygiftTransferRequest moneygiftTransferRequest){
        MoneygiftTransferResponse moneygiftTransferResponse = moneygiftService.sendMoneygift(moneygiftTransferRequest);
        return ResponseEntity.ok(moneygiftTransferResponse);
    }
}
