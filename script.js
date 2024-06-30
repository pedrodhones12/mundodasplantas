window.onload = function() {
    document.getElementById('notification-bar').style.display = 'block';
};

function closeNotification() {
    document.getElementById('notification-bar').style.display = 'none';
}

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h1, h3, p').textContent.toLowerCase();
       
