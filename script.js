// cart.js
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.adicionar-carrinho');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productImage = this.getAttribute('data-imagem');
            
            // Adiciona o produto ao carrinho
            addToCart(productId, productImage);
            
            // Redireciona para a página do carrinho
            window.location.href = 'carrinho.html';
        });
    });
});

function addToCart(id, image) {
    // Função para adicionar o produto ao carrinho
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, image });
    localStorage.setItem('cart', JSON.stringify(cart));
}
