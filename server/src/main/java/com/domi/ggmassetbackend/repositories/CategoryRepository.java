package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c.id FROM Category c WHERE c.parent.id = :id")
    List<Integer> findIdByParentId(@Param("id") Integer parentId);
}
