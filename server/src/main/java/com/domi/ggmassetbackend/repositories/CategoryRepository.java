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

    @Query(value = """
     WITH RECURSIVE category_tree AS (
         SELECT id, parent_id, display_name FROM category WHERE id = :id
         UNION ALL
         SELECT c.id, c.parent_id, c.display_name FROM category c
         INNER JOIN category_tree ct ON c.id = ct.parent_id
     )
     SELECT * FROM category_tree;
    """, nativeQuery = true)
    List<Category> findByParents(@Param("id") Integer id);

    @Query("SELECT c FROM Category c ORDER BY RAND() LIMIT :amount")
    List<Category> findByRandom(@Param("amount") int amount);
}
