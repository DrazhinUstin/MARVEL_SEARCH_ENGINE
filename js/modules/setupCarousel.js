const setupCarousel = (carouselWrapper) => {
    const carousel = carouselWrapper.querySelector('.carousel');
    const slides = [...carousel.querySelectorAll('.slide')];
    const stagesDOM = carouselWrapper.querySelector('.carousel-stages');
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

    const getClientX = (event) => event.touches ? event.touches[0].clientX : event.clientX; 

    const startSwipe = (event) => {
        isDragging = true;
        initX = getClientX(event);
    };

    const moveSwipe = (event) => {
        if (!isDragging) return;
        currentX = getClientX(event);
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

    const displayStages = () => {
        stagesDOM.innerHTML = slides.map(((_, index) => {
            if (index < slidesPerStep - 1) return;
            return '<span></span>';
        })).join('');
        [...stagesDOM.children].forEach((stage, index) => {
            stage.addEventListener('click', () => {
                step = index;
                switchSlide();
            });
        });
        setActiveStage();
    };

    const setActiveStage = () => {
        [...stagesDOM.children].forEach((stage, index) => {
            index === step ? stage.classList.add('active') : stage.classList.remove('active');
        })
    };

    const switchSlide = () => {
        const slideWidth = slides[0].offsetWidth;
        if (step < 0) step = slides.length - slidesPerStep;
        if (step > slides.length - slidesPerStep) step = 0;
        currentTranslate = -slideWidth * step;
        displayTranslate();
        setActiveStage();
        initTranslate = currentTranslate;
    };

    carousel.addEventListener('mousedown', startSwipe);
    carousel.addEventListener('mousemove', moveSwipe);
    carousel.addEventListener('mouseup', endSwipe);
    carousel.addEventListener('mouseleave', endSwipe);
    carousel.addEventListener('touchstart', startSwipe);
    carousel.addEventListener('touchmove', moveSwipe);
    carousel.addEventListener('touchend', endSwipe);

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
        displayStages();
    });

    slides.forEach(slide => slide.addEventListener('dragstart', event => event.preventDefault()));

    defineSlidesPerStep();
    displayStages();
};

const populateCarousel = (carouselWrapper, data) => {
    const carousel = carouselWrapper.querySelector('.carousel');
    carousel.innerHTML = data.map(item => {
        return `<div class="slide">
                    <img src="${item.image}" alt="${item.name || item.title}">
                    <footer>
                        ${item.name ? '<h4>' + item.name + '</h4>' : ''}
                        <a href="${item.name ? 'character.html' : 'comic.html'}?id=${item.id}">Watch</a>
                    </footer>
                </div>`;
    }).join('');
};

export {setupCarousel, populateCarousel};