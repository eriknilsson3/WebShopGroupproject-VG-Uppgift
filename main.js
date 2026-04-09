let messageTimeout;

function showShoppingCartMessage(text) {
    const msg = document.getElementById("cart-message");

    if (!msg) return;

    clearTimeout(messageTimeout);
    msg.textContent = text;
    msg.style.opacity = "1";

    messageTimeout = setTimeout(() => {
        msg.style.opacity = "0"
    }, 2000);
}

async function loadProducts() {
    const container = document.getElementById("productContainer");

    try {
        const response = await fetch("https://dummyjson.com/products")
        const data = await response.json();
        const products = data.products;


        products.forEach(product => {
            const col = document.createElement("div");
            col.className = "col-6 col-sm-6 col-md-4 col-lg-3";

            col.innerHTML = `
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price}$</p>
                    <button class="btn btn-dark add-to-shopping-cart"> Add to cart</button>
                </div>
            </div>
            `;
            container.appendChild(col); //Detta lägger till korten på startsidan

            col.querySelector(".add-to-shopping-cart").addEventListener("click", () => {
                addToShoppingCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail
                });
                showShoppingCartMessage(`Added ${product.title} to cart!`);
            });
        });
    } catch (error) {
        console.error("Something went wrong: ", error);
    }
}

loadProducts();