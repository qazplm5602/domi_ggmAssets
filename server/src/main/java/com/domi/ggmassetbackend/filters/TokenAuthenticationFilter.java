package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.TokenException;
import com.domi.ggmassetbackend.services.JwtService;
import com.domi.ggmassetbackend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String authorization = request.getHeader("Authorization");
        Optional<Cookie> cookieToken = Arrays.stream(request.getCookies())
                                            .filter(cookie -> cookie.getName().equals("accessToken"))
                                            .findFirst();

        cookieToken.ifPresent(cookie -> tokenCheck(cookie.getValue()));

        filterChain.doFilter(request, response);
    }
    
    private void tokenCheck(String authorization) {
//        if (authorization == null || !authorization.startsWith("Bearer ")) {
//            return; // 이상한 토큰
//        }

//        String token = authorization.substring(7);
        String token = authorization;
        Claims claims = jwtService.parseToken(token);

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
}
