package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.vo.UserAdminVO;
import com.domi.ggmassetbackend.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/@me")
    UserAdminVO getMyInfo() {
        User user = userService.getCurrentUser();
        return UserAdminVO.from(user);
    }

    @GetMapping("/logout")
    void logoutUser(HttpServletResponse response) {
        Cookie access = new Cookie("accessToken", null);
        access.setMaxAge(0);
        access.setPath("/");

        Cookie refresh = new Cookie("refreshToken", null);
        refresh.setMaxAge(0);
        refresh.setPath("/");

        response.addCookie(access);
        response.addCookie(refresh);
    }
}