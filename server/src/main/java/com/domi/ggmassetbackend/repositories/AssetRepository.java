package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer> {
}
