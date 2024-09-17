document.addEventListener('DOMContentLoaded', function () {
    // Lista de produtos com IDs, nomes e preços
    const exampleItems = [
        { id: 'img/bata bauregard.webp', name: 'Bata Bauregard', price: 185.00, quantity: 0 },
        { id: 'img/D_NQ_NP_701042-MLB49731972417_042022-O.webp', name: 'Muda de Cacau', price: 26.00, quantity: 0 },
        { id: 'img/muda de mamaõ.webp', name: 'Muda de Mamão', price: 28.00, quantity: 0 },
        { id: 'img/mudadejaca.webp', name: 'Muda De Jaca', price: 27.00, quantity: 0 },
        { id: 'img/viveiromuda3rubissol.jpg', name: '30 Mudas Batata Doce BRS Rubissol', price: 185.00, quantity: 0 },
        { id: 'img/mudadeaipim.jpg', name: 'Muda de Aipim', price: 160.00, quantity: 0 },
        { id: 'img/200folhasmédias.webp', name: '200 Folhas Médias De Graviola', price: 35.00, quantity: 0 },
        { id: 'img/muda de capim santo.webp', name: 'Muda de Capim Santo', price: 28.00, quantity: 0 },
        { id: 'img/129284280c751b54422.webp', name: 'Muda de Comigo Ninguém Pode 40cm', price: 25.00, quantity: 0 },
        { id: 'img/GENIPAPO.jpg', name: 'Genipapo', price: 30.00, quantity: 0 },
        { id: 'img/ora pro´nobis.webp', name: 'Ora Pro Nobis', price: 30.00, quantity: 0 },
        { id: 'img/17443497404eac84d7f_resized_resized.webp', name: 'três mudas de acerola', price: 60.00, quantity: 0 }
    ];

    // Inicializa o carrinho
    function initializeCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        exampleItems.forEach(item => {
            if (!cart.some(cartItem => cartItem.id === item.id)) {
                cart.push(item);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Renderiza o carrinho
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const carrinhoDiv = document.getElementById('carrinho');
        const totalDiv = document.getElementById('total');
        
        if (!carrinhoDiv) return; // Garante que o elemento exista

        carrinhoDiv.innerHTML = ''; // Limpa o carrinho antes de renderizar
        let total = 0;

        cart.forEach((item, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-carrinho');

            produtoDiv.innerHTML = `
                <img src="${item.id}" alt="${item.name}" width="100">
                <p><strong>Nome:</strong> ${item.name}</p>
                <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
                <p><strong>Quantidade:</strong> 
                    <button class="diminuir" data-index="${index}">-</button> 
                    ${item.quantity} 
                    <button class="aumentar" data-index="${index}">+</button>
                </p>
                <p><strong>Subtotal:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
            `;

            carrinhoDiv.appendChild(produtoDiv);
            total += item.price * item.quantity;
        });

        totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Adiciona eventos aos botões de quantidade
        document.querySelectorAll('.diminuir').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll('.aumentar').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                updateQuantity(index, 1);
            });
        });
    }

    // Atualiza a quantidade de itens no carrinho
    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1); // Remove o item se a quantidade for 0
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Atualiza a interface do carrinho
        }
    }

    // Inicializa o carrinho e renderiza
    initializeCart();
    renderCart();
});



