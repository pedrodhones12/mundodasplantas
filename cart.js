document.addEventListener('DOMContentLoaded', function() {
    // Lista de produtos com IDs corrigidos e novas imagens adicionadas
    const exampleItems = [
        { id: 'bata bauregard.webp', quantity: 0 },
        { id: 'img/D_NQ_NP_701042-MLB49731972417_042022-O.webp', quantity: 0 },
        { id: 'img/muda de mamaõ.webp', quantity: 0 },
        { id: 'img/produto4.webp', quantity: 0 },
        { id: 'img/viveiromuda3rubissol.jpg', quantity: 0 },
        { id: 'img/mudadeaipim.jpg', quantity: 0 },
        { id: 'img/mudafolha.webpsanto.webp', quantity: 0 },
        { id: 'img/muda de capim santo.webp', quantity: 0 },
        { id: 'img/129284280c751b54422.webp', quantity: 0 },
        { id: 'img/GENIPAPO.jpg', quantity: 0 }
    ];

    function initializeCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        exampleItems.forEach(item => {
            if (!cart.some(cartItem => cartItem.id === item.id)) {
                cart.push(item);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const carrinhoDiv = document.getElementById('carrinho');
        if (!carrinhoDiv) return; // Garante que o elemento exista

        carrinhoDiv.innerHTML = ''; // Limpa o carrinho antes de renderizar

        cart.forEach((item, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-carrinho');

            const imagePath = item.id.startsWith('img/') ? item.id : 'img/' + item.id;

            produtoDiv.innerHTML = `
                <img src="${imagePath}" alt="Produto" width="100">
                <p><strong>Quantidade:</strong> 
                    <button class="diminuir" data-index="${index}">-</button> 
                    ${item.quantity} 
                    <button class="aumentar" data-index="${index}">+</button>
                </p>
            `;

            carrinhoDiv.appendChild(produtoDiv);
        });

        // Adiciona eventos aos botões de quantidade
        document.querySelectorAll('.diminuir').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll('.aumentar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                updateQuantity(index, 1);
            });
        });
    }

    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function addItemToCart(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = exampleItems.find(i => i.id === itemId);
        if (item) {
            const cartItem = cart.find(i => i.id === item.id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...item, quantity: 1 }); // Adiciona o item com quantidade inicial de 1
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function clearCart() {
        localStorage.removeItem('cart');
        renderCart();
    }

    function finalizePurchase() {
        // Aqui você pode adicionar a lógica para finalizar a compra, como redirecionar para o WhatsApp
        // Exemplo:
        // window.location.href = 'https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Finalize sua compra';
        alert('Compra finalizada!');
    }

    // Inicializa o carrinho e renderiza
    initializeCart();
    renderCart();

    // Adiciona eventos aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            addItemToCart(itemId);
        });
    });

    // Adiciona eventos aos botões de limpar e finalizar compra
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    if (finalizePurchaseButton) {
        finalizePurchaseButton.addEventListener('click', finalizePurchase);
    }
});



