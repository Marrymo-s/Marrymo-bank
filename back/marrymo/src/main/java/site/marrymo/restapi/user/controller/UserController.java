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
@RequestMapping("/users")
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
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

    @GetMapping("/{userCode}")
    @Operation(summary = "사용자 정보 조회 (테스트 완료)", description = "사용자 정보를 조회합니다.")
    public ResponseEntity<UserGetResponse> getUserInfo(@LoginUser UserDTO userDTO, @PathVariable String userCode){
        UserGetResponse userGetResponse = userService.getUserInfo(userDTO, userCode);
        return ResponseEntity.ok(userGetResponse);
    }

    @DeleteMapping
    @Operation(summary = "사용자 탈퇴 (테스트 완료)", description = "사용자 탈퇴를 진행합니다.")
    public void deleteUser(@LoginUser UserDTO userDTO){
        userService.deleteUser(userDTO);
    }

    @PatchMapping("/invitation")
    @Operation(summary = "사용자 청첩장 발급 (테스트 완료)", description = "사용자가 청첩장을 발급합니다.")
    public ResponseEntity<InvitationIssueResponse> invitationIssued(@LoginUser UserDTO userDTO, @Valid @RequestBody InvitationIssueRequest invitationIssueRequest){
        InvitationIssueResponse invitationIssueResponse = userService.invitationIssued(userDTO, invitationIssueRequest);
        return ResponseEntity.ok(invitationIssueResponse);
    }

    @PatchMapping("/account")
    @Operation(summary = "계좌 등록 대상 정보 등록 (테스트 완료)", description = "계좌 등록 대상 정보를 등록합니다.")
    public void registWho(@LoginUser UserDTO userDTO, @Valid @RequestBody WhoRegistRequest whoRegistRequest){
        userService.registWho(userDTO, whoRegistRequest);
    }

    @GetMapping("/account")
    @Operation(summary = "계좌 등록 여부 확인 (테스트 완료)", description = "계좌가 모두 등록되었는지 확인합니다.")
    public ResponseEntity<VerifyAccountResponse> verifyAccount(@LoginUser UserDTO userDTO){
        VerifyAccountResponse verifyAccountResponse = userService.verifyAccount(userDTO);
        return ResponseEntity.ok(verifyAccountResponse);
    }

    @PatchMapping("/privacy")
    @Operation(summary = "사용자 동의여부 등록 (테스트 완료)", description = "사용자가 동의하기를 체크하면 동의여부를 등록합니다.")
    public void patchAgreement(@LoginUser UserDTO userDTO, @Valid @RequestBody PrivacyRegistRequest privacyRegistRequest) {
        userService.patchAgreement(userDTO, privacyRegistRequest);
    }

    @GetMapping("/check")
    @Operation(summary = "사용자가 동의 했는지 정보 등록을 완료 했는지 체크 (테스트 완료)", description = "사용자가 동의를 완료 했는지 청첩장 정보 등록을 완료 했는지 확인합니다.")
    public ResponseEntity<PermissionResponse> getUserPermission(@LoginUser UserDTO userDTO) {
        PermissionResponse permissionResponse = userService.getUserPermission(userDTO);
        return ResponseEntity.ok(permissionResponse);
    }

    @GetMapping("/logout")
    @Operation(summary = "사용자 로그아웃 (테스트 완료)", description = "사용자가 로그아웃을 진행합니다.")
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        userService.logout(httpServletRequest, httpServletResponse);
    }

    @GetMapping("/usercode")
    @Operation(summary = "사용자 유저코드 조회 (테스트 완료)", description = "사용자 유저코드를 조회합니다.")
    public ResponseEntity<?> getUserCode(@LoginUser UserDTO userDTO) {
        return ResponseEntity.ok(userDTO.getUserCode());
    }
}

