let cart = JSON.parse(localStorage.getItem('cart')) || [];

window.onload = function() {
    console.log('Página carregada');
    loadCartItems();
    calculateTotal();

    document.getElementById('checkoutButton').addEventListener('click', checkout);
};

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
    const totalPriceElement = document.getElementById('cartTotal');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = `<h2>Total: R$ ${total.toFixed(2)}</h2>`;
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
}

function checkout() {
    const totalPrice = document.getElementById('cartTotal').innerText.replace('Total: R$ ', '');
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5573981135119&text=Olá! Gostaria de finalizar a compra. Total: R$ ${totalPrice}`;
    window.open(whatsappLink, '_blank');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
}

