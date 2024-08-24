// Inicializa o carrinho a partir do localStorage ou um array vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para adicionar itens ao carrinho
function addToCart(id, name, price) {
    // Verifica se o item já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Se o item já existe, aumenta a quantidade
        cart[existingItemIndex].quantity += 1;
    } else {
        // Se o item não existe, adiciona ao carrinho
        cart.push({ id, name, price, quantity: 1 });
    }

    // Atualiza o localStorage com o novo carrinho
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o número de itens no carrinho
    updateCartCount();

    // Exibe uma mensagem de confirmação
    alert(`${name} foi adicionado ao carrinho!`);

    // Redireciona o usuário para a página do carrinho
    window.location.href = 'carrinho.html';
}

// Função para atualizar o contador de itens no carrinho
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Chama a função ao carregar a página
window.onload = function() {
    updateCartCount();
};



