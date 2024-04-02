package site.marrymo.restapi.home.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/home")
@CrossOrigin(origins = {"https://marrymo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class HomeController {
    @GetMapping("/{userCode}")
    public void home(){}
}
