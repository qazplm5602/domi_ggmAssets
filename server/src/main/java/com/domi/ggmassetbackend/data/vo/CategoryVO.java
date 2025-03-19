package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Category;
import lombok.Getter;

@Getter
public class CategoryVO {
    private int id;
    private String name;
    private Integer parentId;

    public static CategoryVO from(Category category) {
        CategoryVO result = new CategoryVO();

        result.id = category.getId();
        result.name = category.getDisplayName();

        if (category.getParent() != null) {
            result.parentId = category.getParent().getId();
        }

        return result;
    }
}
