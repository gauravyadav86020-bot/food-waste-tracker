package com.food.foodwaste.repository;

import com.food.foodwaste.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<FoodItem, Long> {
}
