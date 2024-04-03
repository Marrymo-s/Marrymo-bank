package site.marrymo.restapi.moneygift_history.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import site.marrymo.restapi.bank.dto.response.PaymentResponse;
import site.marrymo.restapi.bank.service.PaymentService;
import site.marrymo.restapi.global.annotation.LoginUser;
import site.marrymo.restapi.moneygift_history.dto.request.MoneygiftTransferRequest;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftGetResponse;
import site.marrymo.restapi.moneygift_history.dto.response.MoneygiftTransferResponse;
import site.marrymo.restapi.moneygift_history.service.MoneygiftService;
import site.marrymo.restapi.user.dto.UserDTO;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/moneygift")
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class MoneygiftController {
	private final MoneygiftService moneygiftService;
	private final PaymentService paymentService;

	@GetMapping
	@ResponseBody
	@Operation(summary = "축의금 송금 내역 조회 (테스트 완료)", description = "축의금 내역을 조회하는 API입니다.")
	public ResponseEntity<MoneygiftGetResponse> getMoneygiftListInfo(@LoginUser UserDTO userDTO) {
		log.info("call getMoneygiftListInfo....");
		MoneygiftGetResponse moneygiftGetResponse = moneygiftService.getMoneygiftInfo(userDTO);
		return ResponseEntity.ok(moneygiftGetResponse);
	}

	@PostMapping("/send")
	@Operation(summary = "하객이 부부에게 송금하기 (테스트 완료)", description = "축의금 or 펀딩을 위한 송금 API입니다.")
	public ResponseEntity<?> sendMoneygift(@RequestBody MoneygiftTransferRequest moneygiftTransferRequest) throws
		IOException {
		log.info("call sendMoneygift...");
		PaymentResponse paymentResponse = paymentService.paymentApi(moneygiftTransferRequest);
		log.debug(paymentResponse.toString());
		Map<String, String> response = new HashMap<>();
		response.put("payment_url", paymentResponse.getNext_redirect_pc_url());
		log.debug("kakao url 생성");
		return ResponseEntity.ok(response);
	}
}
