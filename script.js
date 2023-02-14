const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another

const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
}

const buttonChanges = (slideToGo) => {

    if (slideToGo === slides[slides.length - 1]) {
        nextButton.style.display = "none";
    }

    if (slideToGo !== slides[0]) {
        prevButton.style.display = "initial";
    }

    if (slideToGo === slides[0]) {
        prevButton.style.display = "none";
    }

    if (slideToGo !== slides[slides.length - 1]) {
        nextButton.style.display = "initial";
    }
    
}

slides.forEach(setSlidePosition);
prevButton.style.display = "none";

nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = dotsNav.querySelector(".current-slide");
    const nextIndicator = currentIndicator.nextElementSibling;

    if (!nextSlide) return;

    const amountToMove = nextSlide.style.left;

    track.style.transform = `translateX(-${amountToMove})`;
    currentSlide.classList.remove("current-slide");
    nextSlide.classList.add("current-slide");
    currentIndicator.classList.remove("current-slide");
    nextIndicator.classList.add("current-slide");

    buttonChanges(nextSlide);

});

prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndicator = dotsNav.querySelector(".current-slide");
    const prevIndicator = currentIndicator.previousElementSibling;

    if (!prevSlide) return;

    const amountToMove = prevSlide.style.left;

    track.style.transform = `translateX(-${amountToMove})`;
    currentSlide.classList.remove("current-slide");
    prevSlide.classList.add("current-slide");
    currentIndicator.classList.remove("current-slide");
    prevIndicator.classList.add("current-slide");

    buttonChanges(prevSlide);

});

dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
        const currentIndicator = dotsNav.querySelector(".current-slide");
        const selectedIndicator = e.target; 
        const slideToGo = slides[index];
        const currentSlide = track.querySelector(".current-slide");
        const amountToMove = slideToGo.style.left;

        if (currentIndicator === selectedIndicator) return;

        track.style.transform = `translateX(-${amountToMove})`;
        currentIndicator.classList.remove("current-slide");
        selectedIndicator.classList.add("current-slide");
        slideToGo.classList.add("current-slide");
        currentSlide.classList.remove("current-slide");

        buttonChanges(slideToGo);
    });
})
