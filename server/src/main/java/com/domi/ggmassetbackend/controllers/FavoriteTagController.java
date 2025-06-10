package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.dto.FavoriteTagActionDTO;
import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.vo.FavoriteTagVO;
import com.domi.ggmassetbackend.services.FavoriteTagService;
import com.domi.ggmassetbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    List<String> saveTags(@RequestBody List<FavoriteTagActionDTO> actions) {
        return favoriteTagService.applyFavoriteTags(actions);
    }
}
