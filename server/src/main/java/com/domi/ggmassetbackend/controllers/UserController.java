package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.vo.UserVO;
import com.domi.ggmassetbackend.services.UserService;
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
    UserVO getMyInfo() {
        User user = userService.getCurrentUser();
        return UserVO.from(user);
    }
}