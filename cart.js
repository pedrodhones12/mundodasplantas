// Função para adicionar ao carrinho
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Atualiza o contador do carrinho

    // Mostra a notificação com o nome do produto
    showNotification(`${name} foi adicionado ao carrinho!`);
}

// Função para mostrar a notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.innerText = message;
    notification.style.display = 'block';

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Exibir a notificação por 3 segundos
}

