package com.csgomarket.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class Order {
    private Long id;
    private User user;
    private List<Item> items;
    private double totalPrice;
    private Date orderDate;
    private String status;  // "pending", "completed", "cancelled"

    public Order(Long id, User user) {
        this.id = id;
        this.user = user;
        this.items = new ArrayList<>();
        this.totalPrice = 0.0;
        this.orderDate = new Date();
        this.status = "pending";
    }

    // Геттеры
    public Long getId() { return id; }
    public User getUser() { return user; }
    public List<Item> getItems() { return items; }
    public double getTotalPrice() { return totalPrice; }
    public Date getOrderDate() { return orderDate; }
    public String getStatus() { return status; }

    // Сеттеры
    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setStatus(String status) { this.status = status; }

    // Методы для работы с заказом
    public void addItem(Item item) {
        items.add(item);
        totalPrice += item.getPrice();
    }

    public void removeItem(Item item) {
        if (items.remove(item)) {
            totalPrice -= item.getPrice();
        }
    }

    public void calculateTotal() {
        totalPrice = items.stream().mapToDouble(Item::getPrice).sum();
    }
}