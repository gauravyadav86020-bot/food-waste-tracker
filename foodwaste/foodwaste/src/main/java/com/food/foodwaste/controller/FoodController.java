package com.food.foodwaste.controller;

import com.food.foodwaste.model.FoodItem;
import com.food.foodwaste.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

    @Autowired
    private FoodRepository repo;

    @GetMapping
    public List<FoodItem> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public FoodItem add(@RequestBody FoodItem item) {
        long days = ChronoUnit.DAYS.between(LocalDate.now(), item.getExpiryDate());
        if (days < 0) item.setStatus("EXPIRED");
        else if (days <= 2) item.setStatus("URGENT");
        else item.setStatus("SAFE");
        return repo.save(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
