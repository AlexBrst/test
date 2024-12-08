document.addEventListener("DOMContentLoaded", function() {
    const shop = {
        products: [
            { name: "Ноутбук ASUS", price: 315000 },
            { name: "Смартфон Samsung", price: 190000 },
            { name: "Телевизор LG", price: 250000 }
        ]
    };

    const cart = {
        items: [],
        total: 0,
        addToCart: function(productName, productPrice) {
            this.items.push({ name: productName, price: productPrice });
            this.total += productPrice;
        },
        clearCart: function() {
            this.items = [];
            this.total = 0;
        }
    };

    function displayCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
    
        // Проверка на наличие элементов
        if (!cartItemsElement || !totalPriceElement) {
            console.error("Элементы корзины не найдены в DOM.");
            return; // Прекращаем выполнение функции, если элементы не найдены
        }
    
        // Очищаем список товаров перед выводом
        cartItemsElement.innerHTML = '';
    
        // Если корзина пустая
        if (cart.items.length === 0) {
            cartItemsElement.innerHTML = '<li>Корзина пуста</li>';
        } else {
            // Выводим каждый товар в корзине
            for (let i = 0; i < cart.items.length; i++) {
                let item = cart.items[i];
                let li = document.createElement('li');
                li.textContent = `${item.name} — ${item.price} тг.`;
                cartItemsElement.appendChild(li);
            }
        }
    
        // Обновляем общую сумму
        totalPriceElement.textContent = cart.total;
    }

    function handleBuyButtonClick(event) {
        const productName = event.target.getAttribute('data-product');
        const productPrice = parseInt(event.target.getAttribute('data-price'));
        cart.addToCart(productName, productPrice);
        displayCart();
    }

    document.querySelectorAll('button[data-product]').forEach(button => {
        button.addEventListener('click', handleBuyButtonClick);
    });

    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            cart.clearCart();
            displayCart();
        });
    }

    displayCart();

    const warehouse = [];

    function addProduct(name, quantity, price) {
        let product = warehouse.find(item => item.name === name);
        if (product) {
            product.quantity += quantity;
        } else {
            warehouse.push({ name, quantity, price });
        }
        displayWarehouse();
    }

    function sellProduct(name, quantity) {
        let product = warehouse.find(item => item.name === name);
        if (product) {
            if (product.quantity >= quantity) {
                product.quantity -= quantity;
            } else {
                alert(`Недостаточно товара: ${name}. На складе только ${product.quantity} шт.`);
            }
        } else {
            alert(`Продукт ${name} не найден на складе.`);
        }
        displayWarehouse();
    }

    function displayWarehouse() {
        const warehouseList = document.getElementById('warehouse-list');
        warehouseList.innerHTML = '';

        warehouse.forEach(product => {
            let li = document.createElement('li');
            li.textContent = `${product.name}: ${product.quantity} шт. по ${product.price} тг.`;
            warehouseList.appendChild(li);
        });
    }

    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            const name = document.getElementById('product-name').value;
            const quantity = parseInt(document.getElementById('product-quantity').value);
            const price = parseFloat(document.getElementById('product-price').value);

            if (name && quantity > 0 && price > 0) {
                addProduct(name, quantity, price);
                alert('Товар добавлен на склад');
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }

    const sellProductBtn = document.getElementById('sell-product-btn');
    if (sellProductBtn) {
        sellProductBtn.addEventListener('click', function() {
            const name = document.getElementById('sell-product-name').value;
            const quantity = parseInt(document.getElementById('sell-product-quantity').value);

            if (name && quantity > 0) {
                sellProduct(name, quantity);
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }

    function outOfStockProducts() {
        const outOfStockList = document.getElementById('out-of-stock-list');
        outOfStockList.innerHTML = '';

        warehouse.forEach(product => {
            if (product.quantity === 0) {
                let li = document.createElement('li');
                li.textContent = `${product.name} отсутствует.`;
                outOfStockList.appendChild(li);
            }
        });
    }
});
