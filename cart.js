function addToCart(productId, productName, productPrice) {
    // Lógica para adicionar o produto ao carrinho
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualizar contagem de itens no carrinho
    updateCartCount();

    // Mostrar notificação
    showCartNotification();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalCount;
}

function showCartNotification() {
    const notification = document.getElementById('cartNotification');
    notification.classList.add('show');

    // Ocultar a notificação após 2 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Inicializar contagem de itens no carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartCount);
