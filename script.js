function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h1, h3, p').textContent.toLowerCase();
        if (productName.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
  
