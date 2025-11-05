// Логика страницы корзины
$(document).ready(function() {
    console.log('✅ cart.js loaded successfully!');
    
    let cart = JSON.parse(localStorage.getItem('csgo-cart')) || [];
    console.log('Cart items from localStorage:', cart);
    
    // Инициализация корзины
    function initCartPage() {
        updateCartCounter();
        renderCartItems();
        updateSummary();
        
        // Показываем соответствующее состояние
        if (cart.length === 0) {
            $('#empty-cart').removeClass('d-none');
            $('#cart-with-items').addClass('d-none');
        } else {
            $('#empty-cart').addClass('d-none');
            $('#cart-with-items').removeClass('d-none');
        }
    }
    
    // Отрисовка товаров в корзине
    function renderCartItems() {
        const cartItemsList = $('#cart-items-list');
        cartItemsList.empty();
        
        cart.forEach((item, index) => {
            const cartItem = `
                <div class="cart-item product-card p-3 mb-3" data-index="${index}">
                    <div class="row align-items-center">
                        <div class="col-md-2 text-center">
                            <div class="item-icon" style="width: 50px; height: 50px; background: linear-gradient(135deg, #2a2a2a, #4b69ff); border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                🗡️
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-white mb-1">${item.name}</h6>
                            <small class="text-muted">CS:GO Скин</small>
                        </div>
                        <div class="col-md-2">
                            <span class="price">${item.price} ₽</span>
                        </div>
                        <div class="col-md-2">
                            <div class="quantity-controls d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary decrease-qty">-</button>
                                <span class="mx-2 text-white">${item.quantity || 1}</span>
                                <button class="btn btn-sm btn-outline-secondary increase-qty">+</button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger btn-sm remove-item">
                                🗑️ Удалить
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsList.append(cartItem);
        });
    }
    
    // Обновление итогов
    function updateSummary() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        
        $('#items-count').text(totalItems);
        $('#total-price').text(totalPrice + ' ₽');
        $('#final-price').text(totalPrice + ' ₽');
    }
    
    // Обновление счетчика в навигации
    function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        $('.badge').text(totalItems);
    }
    
    // Удаление товара
    $(document).on('click', '.remove-item', function() {
        const index = $(this).closest('.cart-item').data('index');
        cart.splice(index, 1);
        saveCart();
        initCartPage();
        showNotification('Товар удален из корзины', 'danger');
    });
    
    // Увеличение количества
    $(document).on('click', '.increase-qty', function() {
        const index = $(this).closest('.cart-item').data('index');
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        saveCart();
        initCartPage();
    });
    
    // Уменьшение количества
    $(document).on('click', '.decrease-qty', function() {
        const index = $(this).closest('.cart-item').data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
        initCartPage();
    });
    
    // Очистка корзины
    $('#clear-cart-btn').on('click', function() {
        if (confirm('Вы уверены, что хотите очистить корзину?')) {
            cart = [];
            saveCart();
            initCartPage();
            showNotification('Корзина очищена', 'warning');
        }
    });
    
    // Оформление заказа
    $('#checkout-btn').on('click', function() {
        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        alert(`🎉 Заказ оформлен!\nТоваров: ${cart.length}\nОбщая сумма: ${total} ₽\n\nСпасибо за покупку!`);
        cart = [];
        saveCart();
        initCartPage();
    });
    
    // Сохранение корзины
    function saveCart() {
        localStorage.setItem('csgo-cart', JSON.stringify(cart));
    }
    
    // Уведомления
    function showNotification(message, type = 'success') {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const notification = $(`
            <div class="alert ${alertClass} position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(() => {
            notification.fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // Инициализация страницы
    initCartPage();
});