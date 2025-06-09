package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.vo.FavoriteTagVO;
import com.domi.ggmassetbackend.services.FavoriteTagService;
import com.domi.ggmassetbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/asset/tag")
@RestController
public class FavoriteTagController {
    private final FavoriteTagService favoriteTagService;
    private final UserService userService;

    @GetMapping("")
    List<FavoriteTagVO> getMyTags() {
        User user = userService.getCurrentUser();
        List<FavoriteTag> tags = favoriteTagService.getFavoriteTagsByOwner(user);

        return tags.stream()
                .map(FavoriteTagVO::toEntity)
                .toList();
    }
}
