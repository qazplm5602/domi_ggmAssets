package com.domi.ggmassetbackend.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        tokenCheck(authorization);
        
        filterChain.doFilter(request, response);
    }
    
    private void tokenCheck(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return; // 이상한 토큰
        }

        String token = authorization.substring(7);

    }
}
