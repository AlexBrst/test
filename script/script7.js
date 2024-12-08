document.addEventListener("DOMContentLoaded", function () {
    // Загрузка XML-файла
    fetch('products.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "application/xml");

            const products = Array.from(xml.querySelectorAll("product"));
            displayList(products);
            displayTable(products);


            document.querySelectorAll("th").forEach(th => {
                th.addEventListener("click", () => {
                    const sortKey = th.dataset.sort;
                    const sortedProducts = [...products].sort((a, b) => {
                        const valA = a.querySelector(sortKey).textContent;
                        const valB = b.querySelector(sortKey).textContent;

                        if (sortKey === "price") {
                            return parseInt(valA) - parseInt(valB); // Сортировка по числу
                        }

                        return valA.localeCompare(valB); // Сортировка по тексту
                    });

                    displayTable(sortedProducts);
                });
            });

            // Фильтрация
            document.getElementById("filter-category").addEventListener("change", event => {
                const category = event.target.value;
                const filteredProducts = category === "Все"
                    ? products
                    : products.filter(product => product.querySelector("category").textContent === category);

                displayList(filteredProducts);
                displayTable(filteredProducts);
            });
        });

    function displayList(products) {
        const list = document.getElementById("product-list");
        list.innerHTML = "";

        products.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${product.querySelector("name").textContent} — ${product.querySelector("price").textContent} тг`;
            list.appendChild(li);
        });
    }

    function displayTable(products) {
        const table = document.getElementById("product-table");
        table.innerHTML = "";

        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.querySelector("name").textContent}</td>
                <td>${product.querySelector("price").textContent}</td>
                <td>${product.querySelector("category").textContent}</td>
            `;
            table.appendChild(row);
        });
    }
});
