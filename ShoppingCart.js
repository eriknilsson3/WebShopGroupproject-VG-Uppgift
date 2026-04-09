function getShoppingCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveShoppingCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToShoppingCart(product) {
    let cart = getShoppingCart();

    const exists = cart.find(p => p.id === product.id);

    if (exists) {
        exists.quantity++;
    } else {
        cart.push({...product, quantity: 1})
    }

    saveShoppingCart(cart);
}    

function removeFromShoppingCart(id) {
    let cart = getShoppingCart().filter(p => p.id !== id);
    saveShoppingCart(cart);
}

function updateQuantity(id, amount) {
    let cart = getShoppingCart();

    const product = cart.find(p => p.id === id);
    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveShoppingCart(cart);
}

function fullClearShoppingCart() {
    localStorage.removeItem("cart");
}