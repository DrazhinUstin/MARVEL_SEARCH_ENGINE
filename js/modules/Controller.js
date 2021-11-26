import {paginateData} from "./dataUtils.js";
import {displayPagination, displayItemsCount} from "./displayUtils.js";

class Controller {

    constructor (func, amountPerPage) {
        this.data = [];
        this.step = 0;
        this.amountPerPage = amountPerPage;
        this.func = func;
    }

    setupPagination () {
        const paginationDOM = document.querySelector('.pagination');

        const turnThePage = () => {
            const pages = [...paginationDOM.querySelectorAll('span')];
            if (this.step > pages.length - 1) this.step = 0;
            if (this.step < 0) this.step = pages.length - 1;
            pages.forEach((page, index) => index === this.step ? page.classList.add('active') : page.classList.remove('active'));
            this.func(this.data[this.step]);
        };

        paginationDOM.addEventListener('click', event => {
            if (event.target.tagName === 'SPAN') {
                this.step = event.target.textContent - 1;
                turnThePage();
            }
            if (event.target.closest('.next-btn')) {
                this.step++;
                turnThePage();
            }
            if (event.target.closest('.prev-btn')) {
                this.step--;
                turnThePage();
            }
        });    
    }

    displayData (data) {
        const paginationDOM = document.querySelector('.pagination');
        this.data = data;
        this.step = 0;
        displayItemsCount(this.data);
        if (this.data.length > this.amountPerPage) {
            this.data = paginateData(this.data, this.amountPerPage);
            this.func(this.data[0]);
            displayPagination(this.data);
            paginationDOM.classList.add('active');
        } else {
            paginationDOM.innerHTML = '';
            paginationDOM.classList.remove('active');
            this.func(this.data);
        }
    }

}

export default Controller;