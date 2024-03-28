package site.marrymo.restapi.wishitem.controller;

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
@RequestMapping("/api/wish-item")
@RequiredArgsConstructor
public class WishItemController {
    private final WishItemService wishItemService;

    @PostMapping("/")
    public void registWishItem(@LoginUser UserDTO userDTO, @Valid @RequestBody WishItemRegistRequest wishItemRegistRequest) {
        wishItemService.registWishItem(userDTO, wishItemRegistRequest);
    }

    @GetMapping("/{userCode}")
    public ResponseEntity<WishItemGetResponse> getWishItems(@PathVariable String userCode) {
        WishItemGetResponse items = wishItemService.getWishItems(userCode);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{userCode}/{wishItemSequence}")
    public ResponseEntity<WishItemDetailResponse> getWishItemDetail(@PathVariable String userCode, @PathVariable Long wishItemSequence) {
        WishItemDetailResponse wishItemDetailResponse = wishItemService.getWishItemDetail(userCode, wishItemSequence);
        return ResponseEntity.ok(wishItemDetailResponse);
    }

    @DeleteMapping
    public void deleteWishItem(@LoginUser UserDTO userDTO, @Valid @RequestBody WishItemDeleteRequest wishItemDeleteRequest) {
        wishItemService.deleteWishItem(userDTO, wishItemDeleteRequest);
    }
}
