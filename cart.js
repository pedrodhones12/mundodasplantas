document.addEventListener('DOMContentLoaded', function() {
    // Lista de produtos
    const exampleItems = [
        { id: '1', name: 'Bata Bauregard', price: 29.90, quantity: 1, image: 'bata bauregard.webp' },
        { id: '2', name: 'Muda de Cacau', price: 26.00, quantity: 1, image: 'img/D_NQ_NP_701042-MLB49731972417_042022-O.webp' }, 
        { id: '3', name: 'Uma Muda de Mamão', price: 28.00, quantity: 1, image: 'img/muda de mamaõ.webp' },
        { id: '4', name: 'Produto 4', price: 25.00, quantity: 1, image: 'img/produto4.webp' },
        { id: '5', name: 'Produto 5', price: 45.00, quantity: 1, image: 'img/produto5.webp' },
        { id: '6', name: 'Produto 6', price: 55.00, quantity: 1, image: 'img/produto6.webp' },
        { id: '7', name: 'Produto 7', price: 65.00, quantity: 1, image: 'img/produto7.webp' },
        { id: '8', name: 'Produto 8', price: 75.00, quantity: 1, image: 'img/produto8.webp' },
        { id: '9', name: 'Produto 9', price: 85.00, quantity: 1, image: 'img/produto9.webp' },
        { id: '10', name: 'Produto 10', price: 95.00, quantity: 1, image: 'img/produto10.webp' },
        { id: '11', name: 'Produto 11', price: 105.00, quantity: 1, image: 'img/produto11.webp' },
        { id: '12', name: 'Produto 12', price: 115.00, quantity: 1, image: 'img/produto12.webp' },
        { id: '13', name: 'Produto 13', price: 125.00, quantity: 1, image: 'img/produto13.webp' },
        { id: '14', name: 'Produto 14', price: 135.00, quantity: 1, image: 'img/produto14.webp' },
        { id: '15', name: 'Produto 15', price: 145.00, quantity: 1, image: 'img/produto15.webp' },
        { id: '16', name: 'Produto 16', price: 155.00, quantity: 1, image: 'img/produto16.webp' },
        { id: '17', name: 'Produto 17', price: 165.00, quantity: 1, image: 'img/produto17.webp' },
        { id: '18', name: 'Produto 18', price: 175.00, quantity: 1, image: 'img/produto18.webp' },
        { id: '19', name: 'Produto 19', price: 185.00, quantity: 1, image: 'img/produto19.webp' },
        { id: '20', name: 'Produto 20', price: 195.00, quantity: 1, image: 'img/produto20.webp' },
        { id: '21', name: 'Produto 21', price: 205.00, quantity: 1, image: 'img/produto21.webp' },
        { id: '22', name: 'Produto 22', price: 215.00, quantity: 1, image: 'img/produto22.webp' },
        { id: '23', name: 'Produto 23', price: 225.00, quantity: 1, image: 'img/produto23.webp' },
        { id: '24', name: 'Produto 24', price: 235.00, quantity: 1, image: 'img/produto24.webp' },
        { id: '25', name: 'Produto 25', price: 245.00, quantity: 1, image: 'img/produto25.webp' },
        { id: '26', name: 'Produto 26', price: 255.00, quantity: 1, image: 'img/produto26.webp' },
        { id: '27', name: 'Produto 27', price: 265.00, quantity: 1, image: 'img/produto27.webp' },
        { id: '28', name: 'Produto 28', price: 275.00, quantity: 1, image: 'img/produto28.webp' },
        { id: '29', name: 'Produto 29', price: 285.00, quantity: 1, image: 'img/produto29.webp' },
        { id: '30', name: 'Produto 30', price: 295.00, quantity: 1, image: 'img/produto30.webp' }
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

            const imagePath = item.image.startsWith('img/') ? item.image : 'img/' + item.image;
            
            produtoDiv.innerHTML = `
                <img src="${imagePath}" alt="${item.name}" width="100">
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
                cart.push(item);
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
        // Por exemplo, você pode usar:
        // window.location.href = 'https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Finalize sua compra';
        alert('Compra finalizada!');
    }

    // Inicializa o carrinho e renderiza
    initializeCart();
    renderCart();

    // Adiciona eventos aos botões
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('finalize-purchase').addEventListener('click', finalizePurchase);

    // Adiciona eventos aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            addItemToCart(itemId);
        });
    });
});

