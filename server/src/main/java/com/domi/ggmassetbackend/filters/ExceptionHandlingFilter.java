package com.domi.ggmassetbackend.filters;

import com.domi.ggmassetbackend.exceptions.DomiException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ExceptionHandlingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (DomiException e) {
            errorResponse(e, response);
        }
    }

    private void errorResponse(DomiException e, HttpServletResponse response) throws IOException {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("code", e.getCode());
        jsonObject.put("message", e.getMessage());

        response.setStatus(e.getStatus().value());
        response.setContentType("application/json;charset=utf-8");

        response.getWriter().write(jsonObject.toString());
    }
}
