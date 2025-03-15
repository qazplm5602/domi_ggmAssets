package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.exceptions.NotAllowEmailException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static org.springframework.web.util.UriUtils.encodeQueryParam;

@Component
public class LoginFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String message = "잘못된 인증 입니다.";

        if (exception instanceof NotAllowEmailException) {
            message = "전용 이메일이 아닙니다.";
        }

        response.sendRedirect(String.format("/login?error=%s", URLEncoder.encode(message, StandardCharsets.UTF_8)));
    }
}
