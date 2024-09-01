// Código do carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCountElement = document.getElementById('cartCount');
let cartTotalElement = document.getElementById('cartTotal');
let cartItemsElement = document.getElementById('cartItems');

function addToCart(id, name, price, image) {
    const product = { id, name, price, image, quantity: 1 };
    const existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    updateCartCount();
    displayCartItems();
    saveCart();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function displayCartItems() {
    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';
    
    cart.forEach(product => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <span>${product.name} - R$ ${product.price.toFixed(2)} x ${product.quantity}</span>
            <button onclick="removeFromCart(${product.id})">Remover</button>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

function removeFromCart(id) {
    const productIndex = cart.findIndex(item => item.id === id);
    
    if (productIndex > -1) {
        const product = cart[productIndex];
        
        if (product.quantity > 1) {
            product.quantity--;
        } else {
            cart.splice(productIndex, 1);
        }
        
        updateCartCount();
        displayCartItems();
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicializar contagem e itens do carrinho na página de carregamento
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});

