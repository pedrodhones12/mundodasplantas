// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualizar contagem de itens no carrinho
function updateCartCount() {
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalQuantity;
}

// Carregar itens do carrinho ao carregar a página
window.onload = function() {
    loadCartItems();
    calculateTotal();
    updateCartCount();
};

// Função para adicionar item ao carrinho
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Produto adicionado ao carrinho!');
}

// Função para carregar itens do carrinho
function loadCartItems() {
    let cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
            <p>Quantidade: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Função para calcular o total do carrinho
function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (document.getElementById('totalPrice')) {
        document.getElementById('totalPrice').innerText = total.toFixed(2);
    }
}

// Função para remover um item do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
    updateCartCount();
}

// Função para finalizar a compra
function checkout() {
    const totalPrice = document.getElementById('totalPrice').innerText;
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5573981135119&text=Olá! Gostaria de finalizar a compra. Total: R$ ${totalPrice}`;
    window.open(whatsappLink, '_blank');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
    updateCartCount();
}
