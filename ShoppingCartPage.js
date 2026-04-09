function renderShoppingCart() {
    const container = document.getElementById("cart-container");
    const sum = document.getElementById("total-price");
    const cart = getShoppingCart();
    const checkoutContainer = document.getElementById("checkout-container");

    container.innerHTML ="";
    checkoutContainer.innerHTML ="";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center mt-5">
                <h4> Your cart is currently empty. </h4>
                <p class="text-muted"> Head back to the store to add products. </P>
                <a href="ProductPage.html" class="btn btn-dark mt-3">
                    Continute Shopping
                </a>
            </div>
        `;

        sum.textContent ="";
        checkoutContainer.innerHTML ="";

        return;
    };

    cart.forEach(product => {
        const div = document.createElement("div");
        div.className = "d-flex justify-content-between align-items-center border p-2 mb-2";
        const productTotal = product.price * product.quantity;
        total += productTotal;

        div.innerHTML = `
            <div>
                <img src="${product.thumbnail}" width="59">
                <strong>${product.title}</strong>
                <p>${product.price}$ x ${product.quantity}</P>
            </div>

            <div>
                <button onclick="updateQuantity(${product.id}, 1); renderShoppingCart()">+</button>
                <button onclick="updateQuantity(${product.id}, -1); renderShoppingCart()">-</button>
                <button onclick="removeFromShoppingCart(${product.id}); renderShoppingCart()">Remove</button>
                <a href="OrderPage.html?id=${product.id}" class="btn btn-dark btn-sm">Buy</a>
            </div>

            <div>
                ${productTotal.toFixed(2)} $
            </div>
        `;

        container.appendChild(div);
    });
    sum.textContent = `Total: ${total.toFixed(2)} $`;
    if (cart.length === 1) {
    const product = cart[0];
        checkoutContainer.innerHTML = `
            <a href="OrderPage.html?id=${product.id}" class="btn btn-dark">
                Buy Item
            </a>
        `;
    } else if (cart.length > 1) {
        checkoutContainer.innerHTML = `
            <a href="OrderPage.html?cart=all" class="btn btn-success">
                Buy All
            </a>
        `;
    }
}

renderShoppingCart();