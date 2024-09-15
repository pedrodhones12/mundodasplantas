document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de item para fins de teste
    const exampleItem = {
        id: '1',
        name: 'Bata Bauregard',
        price: 185,00,
        quantity: 1,
        image: 'bata bauregard.webp' // Certifique-se de que a imagem está na pasta 'img/'
    };
const item={
id: '1',
    name: '5 Mudas de hortelã Pimenta;
    price 30,00,
    quantiy: 1,
    image: img/5 MudasDeHortelã.webp 
    };

  
        
    
    // Adiciona o item de exemplo ao carrinho se ainda não estiver presente
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === exampleItem.id)) {
        cart.push(exampleItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

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

        // Adiciona eventos para aumentar e diminuir a quantidade
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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }

    // Renderiza o carrinho ao carregar a página
    renderCart();
});


