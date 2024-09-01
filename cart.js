// Função para adicionar produtos ao carrinho
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.id === productId);
    
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    document.getElementById('cartCount').innerText = cartCount;
}

// Função para buscar produtos (exemplo simples)
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h1').innerText.toLowerCase();
        if (productName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});


