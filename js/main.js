// Импортируем другие js-файлы
document.addEventListener('DOMContentLoaded', () => {

    const sliderWork = document.querySelector('.slider-work'),
        navMobile = document.querySelector('.main-nav_mobile'),
        navShow = document.querySelector('.main-nav__burger'),
        navHide = document.querySelector('.nav-close'),
        body = document.querySelector('body');


    navShow.addEventListener('click', (e) => {
        e.preventDefault();
        navMobile.classList.add('active');
        body.classList.add('overflow');
    });

    navHide.addEventListener('click', (e) => {
        e.preventDefault();
        navMobile.classList.remove('active');
        body.classList.remove('overflow');
    });

    slideInit(sliderWork);

    const controlArray = sliderWork.querySelectorAll('.slider__button'),
        slidesArr = Array.prototype.slice.call(sliderWork.querySelectorAll('.slider__item')),
        isActive = item => item.classList.contains('slider__item-active');

    controlArray.forEach(elem => {
        elem.addEventListener('click', () => {
            let currentArray = elem.parentNode.parentNode,
                activeIndex = slidesArr.findIndex(isActive);
            elem.classList.contains('next') ? slideShow(currentArray.querySelectorAll('.slider__item'), activeIndex + 1) : slideShow(currentArray.querySelectorAll('.slider__item'), activeIndex - 1);
        });
    });
});

window.addEventListener('scroll', () => {
    const body = document.body,
        html = document.documentElement,
        mainNav = document.querySelector('.main-nav');
    body.scrollTop > mainNav.clientHeight || html.scrollTop > mainNav.clientHeight ? mainNav.classList.add('active') : mainNav.classList.remove('active');
});

const slideInit = (slider) => {

    const slidesArr = slider.querySelectorAll(`.slider__item`);

    slideShow(slidesArr, 0);
}


const slideShow = (slidesArr, n) => {

    slideHide(slidesArr);

    const className = 'slider__item';

    slidesArr.forEach((element, index) => {
        n < 0 ? n = slidesArr.length - 1 : false;
        n > slidesArr.length - 1 ? n = 0 : false;
        index == n ? element.classList.add(`${className}-active`) : false;
        index == (n + 1) ? element.classList.add(`${className}-next`) : false;
        if (n == slidesArr.length - 1) {
            console.log('123');
            if (index == 0) {
                element.classList.add(`${className}-next`);
            }
        }
        if (n == 0) {
            if (index == (slidesArr.length - 1)) {
                element.classList.add(`${className}-prev`)
            }
        } else {
            if (index == (n - 1)) {
                element.classList.add(`${className}-prev`)
            }
        }
    });
}


const slideHide = (slidesArr) => {
    const className = 'slider__item';
    slidesArr.forEach((element) => {
        element.classList.remove(`${className}-active`, `${className}-prev`, `${className}-next`);
    });
};