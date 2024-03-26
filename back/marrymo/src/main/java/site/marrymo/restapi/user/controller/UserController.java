package site.marrymo.restapi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.global.auth.entity.LoginUser;
import site.marrymo.restapi.user.dto.UserDTO;
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
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    @PostMapping
    public void registUserInfo(@LoginUser UserDTO userDTO, @Valid UserRegistRequest userRegistRequest){
        userService.registUserInfo(userDTO, userRegistRequest);
    }

    @PutMapping
    public void modifyUserInfo(@LoginUser UserDTO userDTO, @Valid UserModifyRequest userModifyRequest){
        userService.modifyUserInfo(userDTO, userModifyRequest);
    }

    @GetMapping
    public ResponseEntity<UserGetResponse> getUserInfo(@LoginUser UserDTO userDTO){
        UserGetResponse userGetResponse = userService.getUserInfo(userDTO);
        return ResponseEntity.ok(userGetResponse);
    }

    @DeleteMapping
    public void deleteUser(@LoginUser UserDTO userDTO){
        userService.deleteUser(userDTO);
    }

    @PatchMapping("/invitation")
    public ResponseEntity<InvitationIssueResponse> invitationIssued(@LoginUser UserDTO userDTO, @Valid @RequestBody InvitationIssueRequest invitationIssueRequest){
        InvitationIssueResponse invitationIssueResponse = userService.invitationIssued(userDTO, invitationIssueRequest);
        return ResponseEntity.ok(invitationIssueResponse);
    }

    @PatchMapping("/account")
    public void registWho(@LoginUser UserDTO userDTO, @Valid @RequestBody WhoRegistRequest whoRegistRequest){
        userService.registWho(userDTO, whoRegistRequest);
    }

    @GetMapping("/account")
    public ResponseEntity<VerifyAccountResponse> verifyAccount(@LoginUser UserDTO userDTO){
        VerifyAccountResponse verifyAccountResponse = userService.verifyAccount(userDTO);
        return ResponseEntity.ok(verifyAccountResponse);
    }

    @PatchMapping("/privacy")
    public void patchAgreement(@LoginUser UserDTO userDTO, @Valid @RequestBody PrivacyRegistRequest privacyRegistRequest) {
        userService.patchAgreement(userDTO, privacyRegistRequest);
    }

    @GetMapping("/check")
    public ResponseEntity<PermissionResponse> getUserPermission(@LoginUser UserDTO userDTO) {
        PermissionResponse permissionResponse = userService.getUserPermission(userDTO);
        return ResponseEntity.ok(permissionResponse);
    }
}
