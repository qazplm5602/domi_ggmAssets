package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    // ggm 로그인 콜백
    @GetMapping("/ggm/callback")
    void ggmLoginCallback(
            @Valid
            @NotEmpty
            @RequestParam("token")
            String token,
            HttpServletResponse response
    ) throws IOException {
        authService.authenticateWithGgmToken(response, token);
    }

}
