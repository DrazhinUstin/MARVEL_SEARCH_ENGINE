import {paginateData, saveToSessionStorage} from "./dataUtils.js";
import {displayPagination, displayItemsCount} from "./displayUtils.js";

class Controller {

    constructor (func, amountPerPage, key) {
        this.data = [];
        this.paginatedData = [];
        this.step = 0;
        this.amountPerPage = amountPerPage;
        this.func = func;
        this.key = key;
    }

    saveSession () {
        if (!this.key) return;
        else if (this.key === 'favorites') saveToSessionStorage(this.key, {step: this.step});
        else saveToSessionStorage(this.key, {data: this.data, step: this.step});
    }

    setupPagination () {
        const paginationDOM = document.querySelector('.pagination');

        const turnThePage = () => {
            const pages = [...paginationDOM.querySelectorAll('span')];
            if (this.step > pages.length - 1) this.step = 0;
            if (this.step < 0) this.step = pages.length - 1;
            this.saveSession();
            pages.forEach((page, index) => index === this.step ? page.classList.add('active') : page.classList.remove('active'));
            this.func(this.paginatedData[this.step]);
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

    displayData (data, step) {
        this.data = data;
        this.step = step;
        displayItemsCount(this.data);
        if (this.data.length > this.amountPerPage) {
            this.paginatedData = paginateData(this.data, this.amountPerPage);
            if (this.step > this.paginatedData.length - 1) this.step = this.paginatedData.length - 1;
            this.func(this.paginatedData[this.step]);
            displayPagination(this.paginatedData, this.step);
        } else {
            this.step = 0;
            this.func(this.data);
            displayPagination(null);
        }
        this.saveSession();
    }

}

export default Controller;