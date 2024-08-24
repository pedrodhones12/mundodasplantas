
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

function updateCartCount() {
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}


