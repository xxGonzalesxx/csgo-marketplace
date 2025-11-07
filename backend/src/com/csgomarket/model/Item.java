package com.csgomarket.model;

public class Item {
    private Long id;
    private String name;
    private String category;
    private String quality;
    private double price;

    public Item(Long id, String name, String category, String quality, double price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quality = quality;
        this.price = price;
    }

    // Геттеры
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getQuality() { return quality; }
    public double getPrice() { return price; }

    // Сеттеры
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setQuality(String quality) { this.quality = quality; }
    public void setPrice(double price) { this.price = price; }
}