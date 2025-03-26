package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Category;
import lombok.Getter;

@Getter
public class CategoryVO {
    private int id;
    private String name;
    private Integer parentId;

    public void initData(Category category) {
        this.id = category.getId();
        this.name = category.getDisplayName();

        if (category.getParent() != null) {
            this.parentId = category.getParent().getId();
        }
    }

    public static CategoryVO from(Category category) {
        CategoryVO result = new CategoryVO();
        result.initData(category);
        return result;
    }
}
