package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.TokenException;
import com.domi.ggmassetbackend.exceptions.UserException;
import com.domi.ggmassetbackend.services.JwtService;
import com.domi.ggmassetbackend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserService userService;

    @Value("${domi.jwt.access.expire}")
    private Long accessExpire;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String authorization = request.getHeader("Authorization");
        tokenCheck(request, response);
        filterChain.doFilter(request, response);
    }
    
    private void tokenCheck(HttpServletRequest request, HttpServletResponse response) {
        Claims claims = null;

        // 에세스 토큰 가져오깅
        Cookie accessCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("accessToken"))
                .findAny()
                .orElse(null);


        try {
            if (accessCookie != null)
                claims = jwtService.parseToken(accessCookie.getValue());
        } catch (TokenException e) {
            if (e.getCode().equals("TOKEN3")) {
//                claims = regenerateToken(request, response);
            } else
                throw e;
        }

        // 이래도 null 이면 에세스 토큰이 만료된듯
        if (claims == null)
            claims = regenerateToken(request, response);


        // 리프레시 토큰은 재발급 하셔야지ㅣㅣㅣ
        Boolean isRefresh = (Boolean) claims.get("refresh");

        if (isRefresh) {
            throw new TokenException(TokenException.Type.NOT_ACCESS_TOKEN);
        }

        String email = claims.getId();
        User user = userService.getUserByEmail(email);

        // 인증 그거
        UserDetails userDetails = new PrincipalDetails(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Claims regenerateToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie refreshCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findAny()
                .orElseThrow(() -> new UserException(UserException.Type.NEED_LOGIN));

        Claims refreshClaims = jwtService.parseToken(refreshCookie.getValue());
        String email = refreshClaims.getId();

        String token = jwtService.generateToken(email, false);

        Cookie accessCookie = new Cookie("accessToken", token);
        accessCookie.setMaxAge(Math.toIntExact(accessExpire));
        accessCookie.setPath("/");

        response.addCookie(accessCookie);

        return jwtService.parseToken(token);
    }
}
