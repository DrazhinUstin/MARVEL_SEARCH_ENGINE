const setupCarousel = () => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carousel = carouselWrapper.querySelector('.carousel');
    const slides = [...carousel.querySelectorAll('.slide')];
    const squaresDOM = carouselWrapper.querySelector('.carousel-circles');
    const leftSwitchBtn = carouselWrapper.querySelector('.left-switch-btn');
    const rightSwitchBtn = carouselWrapper.querySelector('.right-switch-btn');
    let initX = 0;
    let currentX = 0;
    let xDiff = 0;
    let initTranslate = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let step = 0;
    let slidesPerStep;

    const defineSlidesPerStep = () => {
        slidesPerStep = Math.round(carousel.offsetWidth/slides[0].offsetWidth);
    };

    const startSwipe = (event) => {
        event.preventDefault();
        isDragging = true;
        initX = event.clientX;
    };

    const moveSwipe = (event) => {
        if (!isDragging) return;
        currentX = event.clientX;
        xDiff = currentX - initX;
        currentTranslate = initTranslate + xDiff;
        displayTranslate();
    };

    const endSwipe = () => {
        if (!isDragging) return;
        isDragging = false;
        if (xDiff < -100) step++;
        if (xDiff > 100) step--;
        xDiff = 0;
        switchSlide();
    };

    const displayTranslate = () => carousel.style.transform = `translateX(${currentTranslate}px)`;

    const displaySquares = () => {
        squaresDOM.innerHTML = slides.map(((_, index) => {
            if (index < slidesPerStep - 1) return;
            return '<span></span>';
        })).join('');
        [...squaresDOM.children].forEach((square, index) => {
            square.addEventListener('click', () => {
                step = index;
                switchSlide();
            });
        });
        setActiveSquare();
    };

    const setActiveSquare = () => {
        [...squaresDOM.children].forEach((circle, index) => {
            index === step ? circle.classList.add('active') : circle.classList.remove('active');
        })
    };

    const switchSlide = () => {
        const slideWidth = slides[0].offsetWidth;
        if (step < 0) step = slides.length - slidesPerStep;
        if (step > slides.length - slidesPerStep) step = 0;
        currentTranslate = -slideWidth * step;
        displayTranslate();
        setActiveSquare();
        initTranslate = currentTranslate;
    };

    carouselWrapper.addEventListener('pointerdown', startSwipe);
    carouselWrapper.addEventListener('pointermove', moveSwipe);
    carouselWrapper.addEventListener('pointerup', endSwipe);
    carouselWrapper.addEventListener('pointerleave', endSwipe);

    rightSwitchBtn.addEventListener('click', () => {
        step++;
        switchSlide();
    });

    leftSwitchBtn.addEventListener('click', () => {
        step--;
        switchSlide();
    });

    window.addEventListener('resize', () => {
        defineSlidesPerStep();
        switchSlide();
        displaySquares();
    });

    slides.forEach(slide => {
        const slideImage = slide.querySelector('img');
        slideImage.addEventListener('dragstart', event => event.preventDefault());
    });

    defineSlidesPerStep();
    displaySquares();
};

export default setupCarousel;