package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.data.vo.CategoryVO;
import com.domi.ggmassetbackend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api/asset/category")
@RestController
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @GetMapping("")
    List<CategoryVO> getAllCategory() {
        return categoryRepository.findAll().stream().map(CategoryVO::from).collect(Collectors.toList());
    }
}
