const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('#prevBtn');
const nextButton = document.querySelector('#nextBtn');
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextButton.addEventListener('click', () => {
    if (currentIndex < track.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);
