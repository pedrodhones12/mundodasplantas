// Inicialize o carrinho a partir do localStorage ou como um array vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

window.onload = function() {
    console.log('Página carregada');
    updateCartCount();
    loadCartItems();
    calculateTotal();
};

function addToCart(id, name, price) {
    console.log('Produto adicionado ao carrinho:', id, name, price);
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

function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.innerText = total.toFixed(2);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
    updateCartCount();
}

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

function updateCartCount() {
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}



