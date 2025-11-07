package com.csgomarket.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private Long id;
    private String username;
    private String email;
    private List<Item> cart;  // Корзина пользователя

    public User(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.cart = new ArrayList<>();
    }

    // Геттеры
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public List<Item> getCart() { return cart; }

    // Сеттеры
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }

    // Методы для работы с корзиной
    public void addToCart(Item item) {
        cart.add(item);
    }

    public void removeFromCart(Item item) {
        cart.remove(item);
    }

    public void clearCart() {
        cart.clear();
    }
}