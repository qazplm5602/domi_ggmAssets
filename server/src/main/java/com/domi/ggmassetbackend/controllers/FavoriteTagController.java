package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.services.FavoriteTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FavoriteTagController {
    private final FavoriteTagService favoriteTagService;
}
