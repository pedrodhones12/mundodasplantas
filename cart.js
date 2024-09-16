document.addEventListener('DOMContentLoaded', function() {
    // Lista de produtos com IDs, nomes e preços
    const exampleItems = [
        { id: 'img/bata bauregard.webp', name: 'Bata Bauregard', price: 'R$ 185,00', quantity: 0 },
        { id: 'img/D_NQ_NP_701042-MLB49731972417_042022-O.webp', name: 'Muda de Cacau', price: 'R$ 26,00', quantity: 0 },
        { id: 'img/muda de mamaõ.webp', name: 'Muda de Mamão', price: 'R$ 28,00', quantity: 0 },
        { id: 'img/produto4.webp', name: 'Produto 4', price: 'R$ 50,00', quantity: 0 },
        { id: 'img/viveiromuda3rubissol.jpg', name: '30 Mudas Batata Doce BRS Rubissol', price: 'R$ 185,00', quantity: 0 },
        { id: 'img/mudadeaipim.jpg', name: 'Muda de Aipim', price: 'R$ 160,00', quantity: 0 },
        { id: 'img/mudafolhasanto.webp', name: 'Muda Folha Santo', price: 'R$ 8,00', quantity: 0 },
        { id: 'img/muda de capim santo.webp', name: 'Muda de Capim Santo', price: 'R$ 28,00', quantity: 0 },
        { id: 'img/129284280c751b54422.webp', name: 'Muda de Comigo Ninguém Pode 40cm ', price: 'R$ 25,00', quantity: 0 },
        { id: 'img/GENIPAPO.jpg', name: 'Genipapo', price: 'R$ 30,00', quantity: 0 },
        { id: 'img/ora pro´nobis.webp', name: 'Ora Pro Nobis', price: 'R$ 30,00', quantity: 0 },
        { id: 'img/17443497404eac84d7f_resized_resized.webp', name: 'três mudas de acerola', price: 'R$ 60,00', quantity: 0 }
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

            produtoDiv.innerHTML = `
                <img src="${item.id}" alt="${item.name}" width="100">
                <p><strong>Nome:</strong> ${item.name}</p>
                <p><strong>Preço:</strong> ${item.price}</p>
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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        const message = cart.map(item => `${item.name} - Quantidade: ${item.quantity}`).join('\n');
        const whatsappURL = `https://wa.me/SEU_NUMERO_DE_TELEFONE?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappURL;
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



