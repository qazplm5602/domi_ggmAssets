package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.dto.CategoryFormDTO;
import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.data.vo.CategoryCountVO;
import com.domi.ggmassetbackend.exceptions.CategoryException;
import com.domi.ggmassetbackend.repositories.CategoryRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@RequiredArgsConstructor
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    // 자식 id 다 가져오깅
    public List<Integer> findSubCategoryIds(int targetId) {
        List<Integer> ids = new ArrayList<>();
        Queue<Integer> queueIds = new LinkedList<>();

        ids.add(targetId);
        queueIds.add(targetId);

        while (!queueIds.isEmpty()) {
            Integer id = queueIds.poll();

            List<Integer> childrenIds = categoryRepository.findIdByParentId(id);
            ids.addAll(childrenIds);
            queueIds.addAll(childrenIds);
        }

        return ids;
    }

    public Specification<Asset> hasCategory(String categoryList) {
        List<Integer> ids = new ArrayList<>();
        String[] categorys = categoryList.split(",");
        boolean isNotCategoryInclude = false;

        for (String category : categorys) {
            int idx = Integer.parseInt(category);

            if (idx == -1) {
                isNotCategoryInclude = true;
                continue;
            }

            ids.addAll(findSubCategoryIds(idx)); // 자식 id 다 넣음
        }

        boolean finalIsNotCategoryInclude = isNotCategoryInclude;
        return (root, query, cb) -> {
            Predicate predicate = root.get("category").get("id").in(ids);

            // -1은 분류되지 않은것도 포함임 ㅁㄴㅇㄹ
            if (finalIsNotCategoryInclude)
                predicate = cb.or(predicate, cb.isNull(root.get("category").get("id")));

            return predicate;
        };
    }

    public List<Category> getCategoryParents(Category category) {
        return categoryRepository.findByParents(category.getId());
    }

    public List<Category> getRandomCategory(int amount) {
        return categoryRepository.findByRandom(amount);
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryException(CategoryException.Type.NOT_FOUND_USER));
    }

    public void changeCategoryName(int id, String newName) {
        Category category = getCategoryById(id);
        category.setDisplayName(newName);

        categoryRepository.save(category);
    }

    public Category createCategory(CategoryFormDTO form) {
        Category parentCategory = null;
        if (form.getParentId() != null) {
            parentCategory = getCategoryById(form.getParentId());
        }

        Category category = new Category();
        category.setDisplayName(form.getName());
        category.setParent(parentCategory);

        return categoryRepository.save(category);
    }
}
