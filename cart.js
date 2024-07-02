// cart.js

// Simulação de produtos no carrinho (normalmente você obteria isso de um servidor ou armazenamento local)
let cart = [
    { id: 1, name: '5 Mudas de Hortelã Pimenta', price: 30.00, quantity: 2 },
    { id: 2, name: 'Muda de Cacau', price: 26.00, quantity: 1 },
    // Adicione mais produtos conforme necessário
];

// Carregar itens do carrinho ao carregar a página
window.onload = function() {
    loadCartItems();
    calculateTotal();
};

// Função para carregar itens do carrinho
function loadCartItems() {
    let cartItemsContainer = document.getElementById('cartItems');
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
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('totalPrice').innerText = total.toFixed(2);
}

// Função para remover um item do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    loadCartItems();
    calculateTotal();
}

// Função para finalizar a compra
function checkout() {
    alert('Compra finalizada! Total: R$ ' + document.getElementById('totalPrice').innerText);
    // Aqui você pode adicionar lógica para processar o pagamento e limpar o carrinho
    cart = [];
    loadCartItems();
    calculateTotal();
}
