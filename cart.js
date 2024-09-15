
document.addEventListener('DOMContentLoaded', function() {
    // Lista de produtos
    const exampleItems = [
        { id: '1', name: 'Bata Bauregard', price: 29.90, quantity: 1, image: 'bata bauregard.webp' },
        { id: '2', name: 'Muda de Cacau', price: 26.00, quantity: 1, image: 'img/D_NQ_NP_701042-MLB49731972417_042022-O.webp' },
        { id: '3', name: 'Uma Muda de Mamão', price: 28.00, quantity: 1, image: 'img/muda de mamaõ.webp' },
        { id: '4', name: 'Produto 4', price: 25.00, quantity: 1, image: 'img/produto4.webp' },
        // Adicione os demais produtos conforme necessário
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
