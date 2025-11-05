// CS:GO Marketplace - Основная логика
$(document).ready(function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('csgo-cart')) || [];
    updateCartCounter();

    // Добавление в корзину
    $('body').on('click', '.add-to-cart', function() {
        const itemName = $(this).data('item');
        const itemPrice = $(this).data('price');
        
        // Добавляем товар в корзину
        cart.push({
            name: itemName,
            price: itemPrice,
            id: Date.now() + Math.random(),
            quantity: 1
        });
        
        // Обновляем корзину и показываем уведомление
        updateCartCounter();
        saveCartToStorage();
        showSuccessNotification(`🎉 "${itemName}" добавлен в корзину!`);
        
        // Анимация кнопки
        $(this).text('Добавлено!').addClass('btn-success').prop('disabled', true);
        setTimeout(() => {
            $(this).text('В корзину').removeClass('btn-success').prop('disabled', false);
        }, 2000);
    });

    // Фильтрация товаров
    $('#category-filter, #quality-filter').on('change', filterProducts);
    $('#search-input').on('input', filterProducts);
    $('#reset-filters').on('click', resetFilters);

    // Функция фильтрации
    function filterProducts() {
        const category = $('#category-filter').val();
        const quality = $('#quality-filter').val();
        const searchText = $('#search-input').val().toLowerCase();
        
        $('.col-lg-3').each(function() {
            const itemCategory = $(this).data('category');
            const itemQuality = $(this).data('quality');
            const itemName = $(this).find('h5').text().toLowerCase();
            const itemDesc = $(this).find('p').text().toLowerCase();
            
            const categoryMatch = category === 'all' || itemCategory === category;
            const qualityMatch = quality === 'all' || itemQuality === quality;
            const searchMatch = searchText === '' || 
                               itemName.includes(searchText) || 
                               itemDesc.includes(searchText);
            
            if (categoryMatch && qualityMatch && searchMatch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Сброс фильтров
    function resetFilters() {
        $('#category-filter').val('all');
        $('#quality-filter').val('all');
        $('#search-input').val('');
        filterProducts();
        showSuccessNotification('Фильтры сброшены!');
    }

    // Обновление счетчика корзины
    function updateCartCounter() {
        $('#cart-count').text(cart.length);
    }

    // Сохранение корзины в localStorage
    function saveCartToStorage() {
        localStorage.setItem('csgo-cart', JSON.stringify(cart));
    }

    // Красивое уведомление
    function showSuccessNotification(message) {
        // Создаем временное уведомление
        const notification = $(`
            <div class="alert alert-success position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        // Автоматическое скрытие через 3 секунды
        setTimeout(() => {
            notification.fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    /*// Переход в корзину (пока заглушка)
    $('.navbar-nav .nav-link').last().on('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            showSuccessNotification('🛒 Корзина пуста!');
        } else {
            showSuccessNotification(`🛒 В корзине ${cart.length} товаров на сумму ${calculateTotal()} ₽`);
        }
    });*/

    // Расчет общей суммы
    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    console.log('CS:GO Marketplace initialized!');
});