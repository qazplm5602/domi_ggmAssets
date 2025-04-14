package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.vo.CategoryVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>, JpaSpecificationExecutor<Asset> {
    int countByCategoryIdIn(List<Integer> ids);

    @Modifying
    @Query("UPDATE Asset a SET a.category = NULL WHERE a.category.id IN :categorys")
    void updateCategoryCancel(@Param("categorys") List<Integer> categorys);

    List<Asset> findByTitleLike(String title);
}
