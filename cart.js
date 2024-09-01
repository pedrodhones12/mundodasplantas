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
    showNotification(${name} foi adicionado ao carrinho!);
}

function checkout() {
    const totalPrice = document.getElementById('cartTotal').innerText.replace('Total: R$ ', '');
    const whatsappLink = https://api.whatsapp.com/send?phone=+5573981135119&text=Olá! Gostaria de finalizar a compra. Total: R$ ${totalPrice};
    window.open(whatsappLink, '_blank');
    localStorage.removeItem('cart'); // Limpar o carrinho após a finalização
    loadCartItems(); // Atualizar a visualização do carrinho
    calculateTotal(); // Atualizar o total após a limpeza
}
