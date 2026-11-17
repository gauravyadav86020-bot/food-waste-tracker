package com.food.foodwaste.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Food Waste Tracker API is LIVE! Use /api/food to get data.";
    }
}