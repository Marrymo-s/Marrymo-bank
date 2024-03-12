package site.marrymo.restapi.wishitem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.wishitem.dto.response.WishItemGetResponse;
import site.marrymo.restapi.wishitem.service.WishItemService;

import java.util.List;

@RestController
@RequestMapping("/api/wish-item")
@RequiredArgsConstructor
public class WishItemController {

    private final WishItemService wishItemService;

    @PostMapping
    public void saveWishItem() {

    }

    @GetMapping("/{userCode}")
    public ResponseEntity<WishItemGetResponse> getWishItems(@PathVariable String userCode) {
        WishItemGetResponse items = wishItemService.getWishItems(userCode);
        return ResponseEntity.ok(items);
    }
}
