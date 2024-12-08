const app = Vue.createApp({
    data() {
        return {
            products: [
                { name: 'Ноутбук ASUS', price: 315000 },
                { name: 'Смартфон Samsung', price: 190000 },
                { name: 'Телевизор LG', price: 250000 }
            ],
            isTableVisible: true
        };
    },
    methods: {
        // Сортировка товаров
        sortTable(order) {
            if (order === 'asc') {
                this.products.sort((a, b) => a.price - b.price);
            } else {
                this.products.sort((a, b) => b.price - a.price);
            }
        },
        // Добавление нового товара
        addProduct() {
            const name = prompt('Введите название товара:');
            const price = parseInt(prompt('Введите цену товара:'), 10);

            if (name && !isNaN(price)) {
                this.products.push({ name, price });
            } else {
                alert('Пожалуйста, введите корректные данные.');
            }
        }
    }
});

app.mount('#app');