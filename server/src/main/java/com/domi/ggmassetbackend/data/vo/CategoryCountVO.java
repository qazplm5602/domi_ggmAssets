package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Category;
import lombok.Getter;

@Getter
public class CategoryCountVO extends CategoryVO {
    private int count;

    public void initData(Category category, int count) {
        initData(category);
        this.count = count;
    }
}
