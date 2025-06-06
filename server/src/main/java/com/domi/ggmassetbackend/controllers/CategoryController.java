package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.dto.CategoryFormDTO;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.data.vo.CategoryCountVO;
import com.domi.ggmassetbackend.data.vo.CategoryVO;
import com.domi.ggmassetbackend.repositories.CategoryRepository;
import com.domi.ggmassetbackend.services.AssetService;
import com.domi.ggmassetbackend.services.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api/asset/category")
@RestController
public class CategoryController {
    private final CategoryService categoryService;
    private final AssetService assetService;
//    private final CategoryRepository categoryRepository;

    @GetMapping("")
    List<CategoryVO> getAllCategory() {
        return categoryService.getAllCategory().stream().map(CategoryVO::from).collect(Collectors.toList());
    }

    @GetMapping("/admin")
    List<CategoryCountVO> getAllCategoryAdmin() {
        return categoryService.getAllCategory().stream().map(v -> {
            CategoryCountVO result = new CategoryCountVO();
            List<Integer> childrenIds = categoryService.findSubCategoryIds(v.getId());
            result.initData(v, assetService.getCategoryCount(childrenIds));

            return result;
        }).toList();
    }

    @PutMapping("/admin")
    int createCategory(@RequestBody CategoryFormDTO form) {
        return categoryService.createCategory(form).getId();
    }

    @DeleteMapping("/admin")
    @Transactional
    void removeCategory(@RequestBody int id) {
        List<Integer> ids = categoryService.findSubCategoryIds(id);
        assetService.setCategoryCancel(ids);

        ids.sort(Integer::compareTo);
        categoryService.deleteCategorys(ids.reversed());
    }

    @GetMapping("/admin/parents/{id}")
    List<CategoryVO> getAdminCategoryParents(@PathVariable int id) {
        Category target = categoryService.getCategoryById(id);
        List<Category> categories = categoryService.getCategoryParents(target);

        return categories.stream()
                .map(CategoryVO::from)
                .collect(Collectors.toList())
                .reversed();
    }

    @PostMapping("/rename")
    void changeName(@RequestParam("id") int id, @RequestBody String newName) {
        categoryService.changeCategoryName(id, newName);
    }

    @GetMapping("/random")
    List<CategoryVO> getRandomCategory() {
        return categoryService.getRandomCategory(3)
                .stream()
                .map(CategoryVO::from)
                .collect(Collectors.toList());
    }
}
