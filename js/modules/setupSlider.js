const setupSlider = () => {
    const slides = [...document.querySelectorAll('.hero-slider .slide')];
    let step = 0;

    const changeSlide = () => {
        const currentSlide = slides[step];
        step++;
        if (step > slides.length - 1) step = 0;
        const newSlide = slides[step];
        currentSlide.classList.remove('active');
        currentSlide.addEventListener('transitionend', stopAnimation);
        newSlide.classList.add('active', 'animation');
        timerID = setTimeout(changeSlide, 10000);
    };

    const stopAnimation = (event) => {
        event.currentTarget.classList.remove('animation');
        event.currentTarget.removeEventListener('transitionend', stopAnimation);
    };

    document.addEventListener('visibilitychange', () => {
        if (document.hidden){
            clearTimeout(timerID);
        } else {
            clearTimeout(timerID);
            timerID = setTimeout(changeSlide, 10000);    
        }
    });

    slides[step].classList.add('active', 'animation');
    let timerID = setTimeout(changeSlide, 10000);
};

export default setupSlider;