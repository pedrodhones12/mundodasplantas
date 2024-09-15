function addToCart(productId, productName, productPrice, productImage) {
    // Lógica para adicionar o produto ao carrinho
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    } else {
        // Adiciona o campo 'image' ao objeto do produto
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
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

// Função para renderizar os itens do carrinho
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const carrinhoDiv = document.getElementById('carrinho');

    function renderCart() {
        carrinhoDiv.innerHTML = ''; // Limpa o carrinho antes de renderizar
        cart.forEach((item, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-carrinho');
            
            produtoDiv.innerHTML = `
                <img src="img/${item.image}" alt="${item.name}" width="100">
                <p><strong>Produto:</strong> ${item.name}</p>
                <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
                <p><strong>Quantidade:</strong> 
                    <button class="diminuir" data-index="${index}">-</button> 
                    ${item.quantity} 
                    <button class="aumentar" data-index="${index}">+</button>
                </p>
            `;
            
            carrinhoDiv.appendChild(produtoDiv);
        });
    }

    // Renderiza o carrinho ao carregar a página
    renderCart();
});

