package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.DomiException;
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
import java.util.Objects;
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

        // 에세스 토큰 가져오깅
        Cookie accessCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("accessToken"))
                .findAny()
                .orElse(null);

        Claims claims = null;

        if (accessCookie != null)
            claims = parseTokenIgnoreExpire(accessCookie.getValue());

        // 이래도 null 이면 에세스 토큰이 만료된듯
        if (claims == null)
            claims = regenerateToken(request, response);

        // 이래도 또 null 이면 그냥 안함 ㅅㄱ
        if (claims == null)
            return;

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
        UserException needLoginException = new UserException(UserException.Type.NEED_LOGIN);

        Cookie refreshCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findAny()
                .orElse(null);

        if (refreshCookie == null)
            return null;

        Claims refreshClaims = parseTokenIgnoreExpire(refreshCookie.getValue());
        if (refreshClaims == null)
            throw needLoginException;

        String email = refreshClaims.getId();

        String token = jwtService.generateToken(email, false);

        Cookie accessCookie = new Cookie("accessToken", token);
        accessCookie.setMaxAge(Math.toIntExact(accessExpire));
        accessCookie.setPath("/");

        response.addCookie(accessCookie);

        return jwtService.parseToken(token);
    }

    private Claims parseTokenIgnoreExpire(String token) {
        try {
            return jwtService.parseToken(token);
        } catch (TokenException e) {
            if (!Objects.equals(e.getCode(), "TOKEN3"))
                throw e;
        }

        return null;
    }
}
