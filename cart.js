// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualizar contagem de itens no carrinho
function updateCartCount() {
    document.getElementById('cartCount').innerText = cart.length;
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
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Preço: R$ ${item.price.toFixed(
