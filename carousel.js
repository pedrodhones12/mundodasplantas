const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('#prevBtn');
const nextButton = document.querySelector('#nextBtn');

let index = 0;

nextButton.addEventListener('click', () => {
    index = (index + 1) % track.children.length;
    track.style.transform = `translateX(-${index * 100}%)`;
});

prevButton.addEventListener('click', () => {
    index = (index - 1 + track.children.length) % track.children.length;
    track.style.transform = `translateX(-${index * 100}%)`;
});



