package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
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
}
