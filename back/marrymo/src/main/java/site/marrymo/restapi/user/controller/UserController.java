package site.marrymo.restapi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.user.dto.Who;
import site.marrymo.restapi.user.dto.request.*;
import site.marrymo.restapi.user.dto.response.InvitationIssueResponse;
import site.marrymo.restapi.user.dto.response.PermissionResponse;
import site.marrymo.restapi.user.dto.response.UserGetResponse;
import site.marrymo.restapi.user.dto.response.VerifyAccountResponse;
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

    @DeleteMapping
    public void deleteUser(){
        userService.deleteUser(1L);
    }

    @PatchMapping("/invitation")
    public ResponseEntity<InvitationIssueResponse> invitationIssued(@Valid @RequestBody InvitationIssueRequest invitationIssueRequest){
        InvitationIssueResponse invitationIssueResponse = userService.invitationIssued(1L, invitationIssueRequest);
        return ResponseEntity.ok(invitationIssueResponse);
    }

    @PatchMapping("/account")
    public void registWho(@Valid @RequestBody WhoRegistRequest whoRegistRequest){
        userService.registWho(1L, whoRegistRequest);
    }

    @GetMapping("/account")
    public ResponseEntity<VerifyAccountResponse> verifyAccount(Long userSequence){
        VerifyAccountResponse verifyAccountResponse = userService.verifyAccount(1L);
        return ResponseEntity.ok(verifyAccountResponse);
    }

    @PatchMapping("/privacy")
    public void patchAgreement(@Valid @RequestBody PrivacyRegistRequest privacyRegistRequest) {
        userService.patchAgreement(1L, privacyRegistRequest);
    }

    @GetMapping("/check")
    public ResponseEntity<PermissionResponse> getUserPermission(@Valid @ResponseBody PermissionResponse permissionResponse) {
        PermissionResponse permissionResponse = userService.getUserPermission(1L);
        return ResponseEntity.ok(permissionResponse);
    }
}
