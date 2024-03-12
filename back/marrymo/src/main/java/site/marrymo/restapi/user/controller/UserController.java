package site.marrymo.restapi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.user.dto.request.UserModifyRequest;
import site.marrymo.restapi.user.dto.request.UserRegistRequest;
import site.marrymo.restapi.user.dto.response.UserGetResponse;
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

    @PutMapping
    public void modifyUserInfo(@Valid UserModifyRequest userModifyRequest){
        userService.modifyUserInfo(1L, userModifyRequest);
    }

    @GetMapping
    public ResponseEntity<UserGetResponse> getUserInfo(){
        UserGetResponse userGetResponse = userService.getUserInfo(1L);
        return ResponseEntity.ok(userGetResponse);
    }
}
