let currentSlide = 0;
let autoPlayInterval;

function getSlidesPerView() {
    return window.innerWidth <= 768 ? 1 : 4; // 1 slide on mobile, 4 slides on larger screens
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesPerView = getSlidesPerView();

    if (index >= totalSlides / slidesPerView) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * (100 / slidesPerView);
    document.querySelector('.slide-track').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function handleMouseWheel(event) {
    stopAutoPlay();
    if (event.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startAutoPlay();

    const slideTrack = document.getElementById('slideTrack');
    slideTrack.addEventListener('wheel', handleMouseWheel);

    window.addEventListener('resize', () => {
        showSlide(currentSlide); // Recalculate slidesPerView on window resize
    });
});

// our client


document.addEventListener('DOMContentLoaded', () => {
    const customSlider = document.querySelector('.custom-slider');
    const customSlides = document.querySelectorAll('.custom-slide');
    const customPrevButton = document.querySelector('.custom-prev-slide');
    const customNextButton = document.querySelector('.custom-next-slide');

    let customCurrentIndex = 0;
    const customSlidesPerView = 3;
    const customAutoPlayInterval = 3000; // 3 seconds

    function customShowSlide(index) {
        const totalSlides = customSlides.length;
        if (index >= totalSlides) {
            customCurrentIndex = 0;
        } else if (index < 0) {
            customCurrentIndex = totalSlides - customSlidesPerView;
        } else {
            customCurrentIndex = index;
        }

        customSlider.style.transform = `translateX(-${customCurrentIndex * (100 / customSlidesPerView)}%)`;
    }

    function customNextSlide() {
        customShowSlide(customCurrentIndex + 1);
    }

    customPrevButton.addEventListener('click', () => {
        customShowSlide(customCurrentIndex - 1);
    });

    customNextButton.addEventListener('click', () => {
        customNextSlide();
    });

    let customAutoPlay = setInterval(customNextSlide, customAutoPlayInterval);

    customSlider.addEventListener('mouseover', () => {
        clearInterval(customAutoPlay);
    });

    customSlider.addEventListener('mouseout', () => {
        customAutoPlay = setInterval(customNextSlide, customAutoPlayInterval);
    });

    customShowSlide(customCurrentIndex);
});
