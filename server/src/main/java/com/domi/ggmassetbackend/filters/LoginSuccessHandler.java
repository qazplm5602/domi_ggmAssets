package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.data.dto.LoginTokenDTO;
import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.services.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService;
//    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${domi.jwt.access.expire}")
    private Long accessExpire;

    @Value("${domi.jwt.refresh.expire}")
    private Long refreshExpire;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 토큰 만들기
        Object principalBoxing = authentication.getPrincipal();
        if (!(principalBoxing instanceof PrincipalDetails principalDetails)) {
            throw new DomiException("LOGIN0", "인증 서버 로그인 오류.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String email = principalDetails.getUsername();
        String accessToken = jwtService.generateToken(email, false);
        String refreshToken = jwtService.generateToken(email, true);

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge(Math.toIntExact(accessExpire));
        accessCookie.setPath("/");
//        accessCookie.setHttpOnly(true);
//        accessCookie.setSecure(true);

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setMaxAge(Math.toIntExact(refreshExpire));
        refreshCookie.setPath("/");
//        refreshCookie.setHttpOnly(true);
//        refreshCookie.setSecure(true);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);

        response.sendRedirect("/login/process");

//        LoginTokenDTO tokenData = new LoginTokenDTO(accessToken, refreshToken);
//        String result = objectMapper.writeValueAsString(tokenData);

//        response.getWriter().write(result);
    }
}
