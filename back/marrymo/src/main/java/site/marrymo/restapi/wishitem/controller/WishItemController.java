package site.marrymo.restapi.wishitem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.wishitem.service.WishItemService;

@RestController
@RequestMapping("/api/wish-item")
@RequiredArgsConstructor
public class WishItemController {

    private final WishItemService wishItemService;

    @PostMapping
    public void saveWishItem() {

    }

    @GetMapping("/{userCode}")
    public Wish getWishList(@PathVariable Long userCode) {
        return wishItemService.
    }


}
