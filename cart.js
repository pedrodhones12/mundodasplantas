document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    calculateTotal();
    updateCartCount();

    document.getElementById('checkoutButton').addEventListener('click', checkout);
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ''; // Limpar o conteúdo existente

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById('cartTotal');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = `<h2>Total: R$ ${total.toFixed(2)}</h2>`;
    }
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    calculateTotal();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.innerText = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Exibir a notificação por 3 segundos
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Atualizar o contador do carrinho
    showNotification(`${name} foi adicionado ao carrinho!`);
}

function checkout() {
    const totalPrice = document.getElementById('cartTotal').innerText.replace('Total: R$ ', '');
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5573981135119&text=Olá! Gostaria de finalizar a compra. Total: R$ ${totalPrice}`;
    window.open(whatsappLink, '_blank');
    localStorage.removeItem('cart'); // Limpar o carrinho após a finalização
    loadCartItems(); // Atualizar a visualização do carrinho
    calculateTotal(); // Atualizar o total após a limpeza
}

