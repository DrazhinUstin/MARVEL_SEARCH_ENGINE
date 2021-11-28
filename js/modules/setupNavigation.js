import {getFromLocalStorage} from './dataUtils.js';

const setupNavigation = () => {
    const navbar = document.querySelector('.navbar');
    const menuToggleBtn = navbar.querySelector('.nav-menu-toggle-btn');
    const favoritesCountDOM = [...document.querySelectorAll('.favorites-count')];
    const favoritesData = getFromLocalStorage('favorites');
    const currentYearDOM = [...document.querySelectorAll('.current-year')];

    favoritesCountDOM.forEach(elem => elem.textContent = favoritesData.length);
    currentYearDOM.forEach(elem => elem.textContent = new Date().getFullYear());
    const scrollTopBtn = createScrollTopBtn();

    menuToggleBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.clientHeight;
        if (window.pageYOffset > windowHeight) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    function createScrollTopBtn () {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-angle-double-up"></i>';
        button.id = 'scroll-top-btn';
        document.body.append(button);
        button.addEventListener('click', () => window.scrollTo(0, 0));
        return button;
    }
};

export default setupNavigation;