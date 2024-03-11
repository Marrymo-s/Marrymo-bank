package site.marrymo.restapi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.marrymo.restapi.user.dto.request.UserRegistRequest;
import site.marrymo.restapi.user.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    @PostMapping
    public void registUserInfo(@Valid UserRegistRequest userRegistRequest){
        userService.registUserInfo(1L, userRegistRequest);
    }
}
