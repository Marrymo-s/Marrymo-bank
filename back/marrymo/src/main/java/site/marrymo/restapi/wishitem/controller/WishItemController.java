package site.marrymo.restapi.wishitem.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.annotation.LoginUser;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.wishitem.dto.request.WishItemDeleteRequest;
import site.marrymo.restapi.wishitem.dto.request.WishItemRegistRequest;
import site.marrymo.restapi.wishitem.dto.response.WishItemDetailResponse;
import site.marrymo.restapi.wishitem.dto.response.WishItemGetResponse;
import site.marrymo.restapi.wishitem.service.WishItemService;

@Slf4j
@RestController
@RequestMapping("/wish-item")
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
@RequiredArgsConstructor
public class WishItemController {
    private final WishItemService wishItemService;

    @PostMapping
    @Operation(summary = "위시 아이템 등록 (테스트 완료)", description = "위시 아이템 하나를 등록합니다.")
    public void registWishItem(@LoginUser UserDTO userDTO, @Valid @RequestBody WishItemRegistRequest wishItemRegistRequest) {
        wishItemService.registWishItem(userDTO, wishItemRegistRequest);
    }

    @GetMapping("/{userCode}")
    @Operation(summary = "위시 아이템 조회 (테스트 완료)", description = "유저 코드로 등록한 위시 상품들을 조회합니다.")
    public ResponseEntity<WishItemGetResponse> getWishItems(@PathVariable String userCode) {
        WishItemGetResponse items = wishItemService.getWishItems(userCode);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{userCode}/{wishItemSequence}")
    @Operation(summary = "위시 아이템 상세 조회 (테스트 완료)", description = "유저코드와 위시아이템 sequence로 각 위시 아이템을 상세 조회합니다.")
    public ResponseEntity<WishItemDetailResponse> getWishItemDetail(@PathVariable String userCode, @PathVariable Long wishItemSequence) {
        WishItemDetailResponse wishItemDetailResponse = wishItemService.getWishItemDetail(userCode, wishItemSequence);
        return ResponseEntity.ok(wishItemDetailResponse);
    }

    @DeleteMapping
    @Operation(summary = "위시 아이템 삭제 (테스트 완료)", description = "위시아이템 sequence로 해당 위시 아이템을 삭제합니다.")
    public void deleteWishItem(@LoginUser UserDTO userDTO, @Valid @RequestBody WishItemDeleteRequest wishItemDeleteRequest) {
        wishItemService.deleteWishItem(userDTO, wishItemDeleteRequest);
    }
}
