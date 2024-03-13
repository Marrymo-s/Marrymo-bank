package site.marrymo.restapi.rollingpaper.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.rollingpaper.dto.request.RollingPaperRegistRequest;
import site.marrymo.restapi.rollingpaper.dto.response.RollingPaperGetResponse;
import site.marrymo.restapi.rollingpaper.service.RollingPaperService;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class RollingPaperController {
    private final RollingPaperService rollingPaperService;

    @PostMapping("/{userCode}")
    public void registRollingPaper(@PathVariable String userCode, @Valid @RequestBody RollingPaperRegistRequest rollingPaperRegistRequest) {
        rollingPaperService.registRollingPaper(userCode, rollingPaperRegistRequest);
    }

    @GetMapping
    public ResponseEntity<RollingPaperGetResponse> getRollingPaper() {
        RollingPaperGetResponse letterList = rollingPaperService.getRollingPaper(1L);
        return ResponseEntity.ok(letterList);
    }
}
