package site.marrymo.restapi.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.global.annotation.LoginUser;
import site.marrymo.restapi.user.dto.UserDTO;
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
    @Operation(summary = "사용자 정보 등록 (테스트 완료)", description = "카카오 로그인 후, 사용자 정보를 등록합니다.")
    public void registUserInfo(@LoginUser UserDTO userDTO, @Valid UserRegistRequest userRegistRequest){
        userService.registUserInfo(userDTO, userRegistRequest);
    }

    @PutMapping
    @Operation(summary = "사용자 정보 수정 (테스트 완료)", description = "사용자 정보를 수정합니다.")
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

    @GetMapping("/logout")
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        userService.logout(httpServletRequest, httpServletResponse);
    }

    @GetMapping("/usercode")
    public ResponseEntity<?> getUserCode(@LoginUser UserDTO userDTO) {
        return ResponseEntity.ok(userDTO.getUserCode());
    }
}
