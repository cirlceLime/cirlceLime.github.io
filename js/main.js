// Импортируем другие js-файлы
document.addEventListener('DOMContentLoaded', () => {

    const sliderWork = document.querySelector('.slider-work'),
        navMobile = document.querySelector('.main-nav_mobile'),
        navShow = document.querySelector('.main-nav__burger'),
        navHide = document.querySelector('.nav-close'),
        body = document.querySelector('body'),
        tabsControl = document.querySelectorAll('.tabs>.tabs-control'),
        tabsContent = document.querySelector('.tabs-content'),
        tabsContentItem = tabsContent.querySelectorAll('.tabs-content__item');



    slideInit(sliderWork);

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

    tabsControl.forEach((element) => {
        element.addEventListener('click', (e) => {
            let currentContol = Array.prototype.slice.call(element.querySelectorAll('.tabs-control__item'));

            if (e.target.classList.contains('tabs-control__item')) {
                currentContol.forEach((item, index) => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');

            }

            let currentIndex = currentContol.indexOf(e.target),
                contentCurrent = Array.prototype.slice.call(e.target.parentNode.parentNode.querySelector('.tabs-content').children);
            contentCurrent.forEach((item, index) => {
                item.classList.remove('active');
                index == currentIndex ? item.classList.add('active') : false;
            });
        });
    });

    let calcInput = document.querySelectorAll('.calc-input');

    calcInput.forEach(element => {
        element.addEventListener('input', calcSum);
        element.addEventListener('focus', (item) => { item.target.value == 0 || item.target.value == '' ? item.target.value = '' : false; });
        element.addEventListener('blur', (item) => { item.target.value == 0 || item.target.value == '' ? item.target.value = 0 : false; });
    });

});

const createItemContent = function(tag, content, className, parent) {
    let newDiv = document.createElement(`${tag}`),
        newContent = document.createElement(`${tag}`),
        table = document.querySelector(`.${parent}`);
    newDiv.className = `${className}`;
    newDiv.appendChild(newContent);
    document.querySelector(`.${parent}`).appendChild(newDiv);
}

const createItem = function(tag, content, className, parent) {
    let newDiv = document.createElement(`${tag}`),
        newContent = document.createTextNode(`${content}`),
        table = document.querySelector(`.${parent}`);
    newDiv.className = `${className}`;
    newDiv.appendChild(newContent);
    document.querySelector(`.${parent}`).appendChild(newDiv);
}

window.addEventListener('scroll', () => {
    const body = document.body,
        html = document.documentElement,
        mainNav = document.querySelector('.main-nav');
    body.scrollTop > mainNav.clientHeight || html.scrollTop > mainNav.clientHeight ? mainNav.classList.add('active') : mainNav.classList.remove('active');
});

$(document).ready(function() {
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);
    $(".main-nav").on("click", "a[href*='#']", function(event) {
        event.preventDefault();
        $('.main-nav').removeClass('active');
        $('body').removeClass('overflow');
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 500);
    });

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 769) {
            $('.slider-services').slick({
                speed: 500,
                prevArrow: "<div class='prev slider__button'></div>",
                nextArrow: "<div class='next slider__button'></div>",
                responsive: [{
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

const calcSum = function() {
    this.value = this.value.replace(/\D/g, '');
    let calcInput = document.querySelectorAll('.calc-input'),
        sum = 0
    calcInput.forEach(element => {
        let a = element.nextElementSibling.value,
            b = element.value,
            c = a * b;
        sum += c;
        sum > 0 ? (document.querySelector('.sum .total-price span').innerHTML = `${sum} &#8381;`) && (document.querySelector('.sum').classList.add('active')) : (document.querySelector('.sum').classList.remove('active')) && (document.querySelector('.sum .total-price span').innerHTML = '');
    });

}

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
}

const data = {
    items: [{
            name: 'Потолки',
            demontag: [{
                    "demontagName": "Демонтаж клеевой плитки",
                    "demontagPrice": "м2",
                    "demontagMeasure": 65
                },
                {
                    "demontagName": "Демонтаж плинтуса потолочного",
                    "demontagPrice": "п.м.",
                    "demontagMeasure": 45
                },
                {
                    "demontagName": "Демонтаж потолков подвесных",
                    "demontagPrice": "м2",
                    "demontagMeasure": 150
                },
                {
                    "demontagName": "Демонтаж реечного потолка",
                    "demontagPrice": "м2",
                    "demontagMeasure": 150
                },
                {
                    "demontagName": "Демонтаж шпаклевки с потолка",
                    "demontagPrice": "м2",
                    "demontagMeasure": 125
                },
                {
                    "demontagName": "Демонтаж штукатурки с потолка",
                    "demontagPrice": "м2",
                    "demontagMeasure": 150
                },
                {
                    "demontagName": "Очистка потолка от клеевой мастики",
                    "demontagPrice": "м2",
                    "demontagMeasure": 85
                },
                {
                    "demontagName": "Очистка потолка от масляной краски",
                    "demontagPrice": "м2",
                    "demontagMeasure": 250
                },
                {
                    "demontagName": "Очистка потолка от обоев",
                    "demontagPrice": "м2",
                    "demontagMeasure": 75
                },
                {
                    "demontagName": "Очистка потолка от побелки, краски,водоэмульсионки",
                    "demontagPrice": "м2",
                    "demontagMeasure": 210
                },
                {
                    "demontagName": "Разбивка потолочного руста",
                    "demontagPrice": "п.м.",
                    "demontagMeasure": 210
                },
                {
                    "demontagName": "Разборка ПВХ ,МДФ панелей с потолка",
                    "demontagPrice": "м2",
                    "demontagMeasure": 150
                },
                {
                    "demontagName": "Разборка потолка \"Armstrong\"",
                    "demontagPrice": "м2",
                    "demontagMeasure": 150
                },
                {
                    "demontagName": "Разборка потолка \"Armstrong\" зеркальный",
                    "demontagPrice": "м2",
                    "demontagMeasure": 200
                },
                {
                    "demontagName": "Разборка потолка из ГКЛ 1 уровневый",
                    "demontagPrice": "м2",
                    "demontagMeasure": 250
                },
                {
                    "demontagName": "Разборка потолка из ГКЛ 2 уровневый",
                    "demontagPrice": "м2",
                    "demontagMeasure": 290
                },
                {
                    "demontagName": "Разборка потолка из ГКЛ 3 уровневый",
                    "demontagPrice": "м2",
                    "demontagMeasure": 330
                },
                {
                    "demontagName": "Размывка мела",
                    "demontagPrice": "м2",
                    "demontagMeasure": 175
                }
            ],
            montag: [{
                    "montagName": "Выравнивание потолка до 3х см. (штукатурка)",
                    "montagPrice": "м2",
                    "montagMeasure": 450
                },
                {
                    "montagName": "Грунтовка багета из полиуретана под светильники",
                    "montagPrice": "шт.",
                    "montagMeasure": 80
                },
                {
                    "montagName": "Грунтовка багета из полиуретана шириной до 150мм.",
                    "montagPrice": "п.м.",
                    "montagMeasure": 80
                },
                {
                    "montagName": "Грунтовка криволинейных боковин на 1 раз",
                    "montagPrice": "м2",
                    "montagMeasure": 60
                },
                {
                    "montagName": "Грунтовка потолка на 1 раз",
                    "montagPrice": "м2",
                    "montagMeasure": 60
                },
                {
                    "montagName": "Лакировка потолка из вагонки на 2 раза с шлифовкой",
                    "montagPrice": "м2",
                    "montagMeasure": 410
                },
                {
                    "montagName": "Монтаж багета из полиурет. под светильники (+ шпатл. и шлифовка)",
                    "montagPrice": "шт.",
                    "montagMeasure": 680
                },
                {
                    "montagName": "Монтаж багета из полиуретана шир. до 150мм.",
                    "montagPrice": "п.м.",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Монтаж клеевой плитки на потолок",
                    "montagPrice": "м2",
                    "montagMeasure": 210
                },
                {
                    "montagName": "Монтаж перфорированного уголка по криволинейным поверхностям",
                    "montagPrice": "п.м.",
                    "montagMeasure": 190
                },
                {
                    "montagName": "Монтаж перфорированного уголка по прямолинейным поверхностям",
                    "montagPrice": "п.м.",
                    "montagMeasure": 120
                },
                {
                    "montagName": "Монтаж пластиковых панелей с изготовлением каркаса",
                    "montagPrice": "м2",
                    "montagMeasure": 490
                },
                {
                    "montagName": "Монтаж плинтуса потолочного",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Монтаж потолка (ГКЛ) 1 уровень",
                    "montagPrice": "м2",
                    "montagMeasure": 700
                },
                {
                    "montagName": "Монтаж потолка (ГКЛ) 2 уровень",
                    "montagPrice": "м2",
                    "montagMeasure": 850
                },
                {
                    "montagName": "Монтаж потолка (ГКЛ) 3 уровень и более",
                    "montagPrice": "м2",
                    "montagMeasure": 1100
                },
                {
                    "montagName": "Монтаж потолка из алюм.реек по металлокаркасу",
                    "montagPrice": "м2",
                    "montagMeasure": 500
                },
                {
                    "montagName": "Монтаж потолка из ПВХ, МДФ панелей по металлокаркасу",
                    "montagPrice": "м2",
                    "montagMeasure": 490
                },
                {
                    "montagName": "Монтаж потолка\"Armstrong\"",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Монтаж потолка\"Armstrong\"зеркальный",
                    "montagPrice": "м2",
                    "montagMeasure": 700
                },
                {
                    "montagName": "Монтаж Реечных потолков",
                    "montagPrice": "м2",
                    "montagMeasure": 500
                },
                {
                    "montagName": "Монтаж тепло-шумоизоляции на потолок",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Монтаж уголка деревянного по потолку",
                    "montagPrice": "п.м.",
                    "montagMeasure": 210
                },
                {
                    "montagName": "Нанесение декоративной штукатурки на потолок",
                    "montagPrice": "м2",
                    "montagMeasure": 1000
                },
                {
                    "montagName": "Обшивка потолка вагонкой",
                    "montagPrice": "м2",
                    "montagMeasure": 570
                },
                {
                    "montagName": "Оклейка криволинейных боковин обоями",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Оклейка потолка обоями (бумажные обои)",
                    "montagPrice": "м2",
                    "montagMeasure": 230
                },
                {
                    "montagName": "Оклейка потолка обоями (флизилин, винил)",
                    "montagPrice": "м2",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Оклейка потолка пенопластовыми панелями",
                    "montagPrice": "м2",
                    "montagMeasure": 200
                },
                {
                    "montagName": "Оклейка потолка пробковыми панелями",
                    "montagPrice": "м2",
                    "montagMeasure": 210
                },
                {
                    "montagName": "Оклейка потолка сеткой малярной",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Оклейка потолка стеклообоями",
                    "montagPrice": "м2",
                    "montagMeasure": 210
                },
                {
                    "montagName": "Оклейка потолка текстильными обоями",
                    "montagPrice": "м2",
                    "montagMeasure": 230
                },
                {
                    "montagName": "Окраска багета из полиуретана под светильники",
                    "montagPrice": "шт.",
                    "montagMeasure": 200
                },
                {
                    "montagName": "Окраска багета из полиуретана шириной до 150мм.",
                    "montagPrice": "п.м.",
                    "montagMeasure": 200
                },
                {
                    "montagName": "Окраска криволинейных боковин на 2 раза",
                    "montagPrice": "м2",
                    "montagMeasure": 270
                },
                {
                    "montagName": "Окраска плинтуса потолочного на 2 раза",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Окраска потолка на 2 раза",
                    "montagPrice": "м2",
                    "montagMeasure": 270
                },
                {
                    "montagName": "Перетирка ж/б плит перекрытия",
                    "montagPrice": "п.м.",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Проклейка и замазка потолочного руста (без гарантии)",
                    "montagPrice": "п.м.",
                    "montagMeasure": 210
                },
                {
                    "montagName": "Проклейка потолка армировочной сеткой",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Установка лепнины под люстру",
                    "montagPrice": "шт.",
                    "montagMeasure": 500
                },
                {
                    "montagName": "Установка натяжных потолков Германия, Бельгия, Франция",
                    "montagPrice": "м2",
                    "montagMeasure": "от 500"
                },
                {
                    "montagName": "Установка подвесных потолков 1 уровень",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Установка подвесных потолков более 1 уровня",
                    "montagPrice": "м2",
                    "montagMeasure": 600
                },
                {
                    "montagName": "Устройство короба из ГКЛ по мет.каркасу потолочный",
                    "montagPrice": "п.м.",
                    "montagMeasure": 950
                },
                {
                    "montagName": "Устройство криволинейных боковин из ГКЛ",
                    "montagPrice": "п.м.",
                    "montagMeasure": 850
                },
                {
                    "montagName": "Шпатлевка и шлифовка криволинейных боковин",
                    "montagPrice": "м2",
                    "montagMeasure": 370
                },
                {
                    "montagName": "Шпатлевка и шлифовка потолка",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Шпатлевка и шлифовка потолка под покраску",
                    "montagPrice": "м2",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Шпатлевка потолочного багета",
                    "montagPrice": "п.м.",
                    "montagMeasure": 320
                }
            ]
        },
        {
            name: 'Стены',
            demontag: [{
                    "demontagName": "Демонтаж бетонных перегородок толщиной до 12см",
                    "demontagMeasure": "м2",
                    "demontagPrice": 1700
                },
                {
                    "demontagName": "Демонтаж бетонной стены до 20 см",
                    "demontagMeasure": "м2",
                    "demontagPrice": 1200
                },
                {
                    "demontagName": "Демонтаж вклееного зеркала",
                    "demontagMeasure": "м2",
                    "demontagPrice": 500
                },
                {
                    "demontagName": "Демонтаж короба из ГКЛ,ПВХ,ДСП.",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж листов ГКЛ",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж металлических конструкций",
                    "demontagMeasure": "м2",
                    "demontagPrice": 320
                },
                {
                    "demontagName": "Демонтаж откосов из ГКЛ,ПВХ",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж ПВХ ,МДФ панелей со стен",
                    "demontagMeasure": "м2",
                    "demontagPrice": 110
                },
                {
                    "demontagName": "Демонтаж перегородки (гипс, гипсолит)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 250
                },
                {
                    "demontagName": "Демонтаж перегородки в сан. узле (железобетон до 5см.)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 1000
                },
                {
                    "demontagName": "Демонтаж плитки со стен",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж потолка в сан.узле (железобетон до 5см.)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 1100
                },
                {
                    "demontagName": "Демонтаж стен ( 1/2 кирпича)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 300
                },
                {
                    "demontagName": "Демонтаж стен (в кирпич)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 420
                },
                {
                    "demontagName": "Демонтаж фальшстены из ГКЛ,ПВХ по металлокаркасу",
                    "demontagMeasure": "м2",
                    "demontagPrice": 140
                },
                {
                    "demontagName": "Демонтаж штукатурки с откосов",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж штукатурки со стен",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Очистка стен от водоэмульсионки",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Очистка стен от краски, шпатлевки или побелки",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Очистка стен от обоев",
                    "demontagMeasure": "м2",
                    "demontagPrice": 75
                },
                {
                    "demontagName": "Пробивка проема в стене (1/2 кирпича)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 2400
                },
                {
                    "demontagName": "Пробивка проема в стене (бетон) толщиной до 12см",
                    "demontagMeasure": "м2",
                    "demontagPrice": 3500
                },
                {
                    "demontagName": "Пробивка проема в стене (кирпич)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 3000
                },
                {
                    "demontagName": "Разборка кирпичных стен",
                    "demontagMeasure": "м2",
                    "demontagPrice": 2700
                },
                {
                    "demontagName": "Разборка монолитных бетонных конструкций",
                    "demontagMeasure": "м3",
                    "demontagPrice": 8000
                },
                {
                    "demontagName": "Разборка перегородки (ГКЛ)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 250
                },
                {
                    "demontagName": "Разборка перегородки (ДВП)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 300
                },
                {
                    "demontagName": "Разборка перегородки (дерево)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 300
                },
                {
                    "demontagName": "Размывка мела со стен",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Расчистка швов плитки",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Резка проемов",
                    "demontagMeasure": "м2",
                    "demontagPrice": 3500
                },
                {
                    "demontagName": "Устройства проема в стене (гипсе,гипсолите)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 430
                }
            ],
            montag: [{
                    "montagName": "Антисептирование вагонки",
                    "montagPrice": "м2",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Выравнивание углов",
                    "montagPrice": "п.м.",
                    "montagMeasure": 320
                },
                {
                    "montagName": "Выравнивание, примыкание (стена-пол, потолок)",
                    "montagPrice": "п.м.",
                    "montagMeasure": 240
                },
                {
                    "montagName": "Герметизация (монтаж. пеной) межпанельных швов",
                    "montagPrice": "п.м.",
                    "montagMeasure": 1250
                },
                {
                    "montagName": "Гидроизоляция стен смесями",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Грунтовка короба на 1 раз",
                    "montagPrice": "п.м.",
                    "montagMeasure": 50
                },
                {
                    "montagName": "Грунтовка металлоконструкций",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Грунтовка откосов на 1 раз",
                    "montagPrice": "п.м.",
                    "montagMeasure": 50
                },
                {
                    "montagName": "Грунтовка стен на 1 раз",
                    "montagPrice": "м2",
                    "montagMeasure": 50
                },
                {
                    "montagName": "Заделка швов серпянкой и унифлотом",
                    "montagPrice": "п.м.",
                    "montagMeasure": 190
                },
                {
                    "montagName": "Затирка швов плитки",
                    "montagPrice": "м2",
                    "montagMeasure": 125
                },
                {
                    "montagName": "Кладка криволинейных перегородок из гипсоблоков, пеноблоков",
                    "montagPrice": "м2",
                    "montagMeasure": 890
                },
                {
                    "montagName": "Кладка перегородки в 1/2 кирпича",
                    "montagPrice": "м2",
                    "montagMeasure": 660
                },
                {
                    "montagName": "Кладка перегородки в кирпич",
                    "montagPrice": "м2",
                    "montagMeasure": 1020
                },
                {
                    "montagName": "Кладка перегородок из гипсоблоков, пеноблоков",
                    "montagPrice": "м2",
                    "montagMeasure": 680
                },
                {
                    "montagName": "Кладка перегородок из стеклоблоков",
                    "montagPrice": "м2",
                    "montagMeasure": 1550
                },
                {
                    "montagName": "Лакировка уголков деревянных",
                    "montagPrice": "п.м.",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Монтаж зеркала на стену (на клей)",
                    "montagPrice": "м2",
                    "montagMeasure": 930
                },
                {
                    "montagName": "Монтаж керамического бордюра",
                    "montagPrice": "п.м.",
                    "montagMeasure": 450
                },
                {
                    "montagName": "Монтаж откосов из ГКЛ",
                    "montagPrice": "п.м.",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Монтаж откосов из ПВХ,МДФ",
                    "montagPrice": "п.м.",
                    "montagMeasure": 500
                },
                {
                    "montagName": "Монтаж пластикого уголка",
                    "montagPrice": "п.м.",
                    "montagMeasure": 110
                },
                {
                    "montagName": "Монтаж стен из ГКЛ (ГВЛ) на клей",
                    "montagPrice": "м2",
                    "montagMeasure": 510
                },
                {
                    "montagName": "Монтаж уголка перфорированного",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Монтаж уголка пластикового по плитке",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Монтаж уголков деревянных",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Монтаж фальшстены из ГКЛ по металлокаркасу",
                    "montagPrice": "м2",
                    "montagMeasure": 580
                },
                {
                    "montagName": "Монтаж фальшстены из ПВХ по металлокаркасу",
                    "montagPrice": "м2",
                    "montagMeasure": 560
                },
                {
                    "montagName": "Монтаж шумо-теплоизоляции",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Наклейка малярной сетки",
                    "montagPrice": "м2",
                    "montagMeasure": 200
                },
                {
                    "montagName": "Нанесение \"венецианской\" штукатурки",
                    "montagPrice": "м2",
                    "montagMeasure": 1100
                },
                {
                    "montagName": "Нанесение бетоноконтакта, антиплесень",
                    "montagPrice": "м2",
                    "montagMeasure": 75
                },
                {
                    "montagName": "Нанесение декор.штукатурки от",
                    "montagPrice": "м2",
                    "montagMeasure": 600
                },
                {
                    "montagName": "Нанесение фактурной штукатурки",
                    "montagPrice": "м2",
                    "montagMeasure": 490
                },
                {
                    "montagName": "Насечка стен",
                    "montagPrice": "м2",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Облицовка короба плиткой",
                    "montagPrice": "м2",
                    "montagMeasure": 1200
                },
                {
                    "montagName": "Облицовка короба плиткой",
                    "montagPrice": "п.м.",
                    "montagMeasure": 1100
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой",
                    "montagPrice": "м2",
                    "montagMeasure": 1200
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой (10х10)",
                    "montagPrice": "м2",
                    "montagMeasure": 1250
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой по диагонали",
                    "montagPrice": "м2",
                    "montagMeasure": 1300
                },
                {
                    "montagName": "Облицовка откосов плиткой",
                    "montagPrice": "п.м.",
                    "montagMeasure": 950
                },
                {
                    "montagName": "Облицовка стен в ½ кирпича толщиной",
                    "montagPrice": "м2",
                    "montagMeasure": 1100
                },
                {
                    "montagName": "Облицовка стен декоративным камнем",
                    "montagPrice": "м2",
                    "montagMeasure": 1200
                },
                {
                    "montagName": "Облицовка стен каф.плиткой",
                    "montagPrice": "м2",
                    "montagMeasure": 1150
                },
                {
                    "montagName": "Облицовка стен каф.плиткой по диагонали",
                    "montagPrice": "м2",
                    "montagMeasure": 1250
                },
                {
                    "montagName": "Облицовка стен мозайкой",
                    "montagPrice": "м2",
                    "montagMeasure": 1900
                },
                {
                    "montagName": "Облицовка стен натуральным камнем",
                    "montagPrice": "м2",
                    "montagMeasure": 1750
                },
                {
                    "montagName": "Облицовка стен плиткой размером 10*10",
                    "montagPrice": "м2",
                    "montagMeasure": 1200
                },
                {
                    "montagName": "Обработка лаком на 2 раза с шлифовкой",
                    "montagPrice": "м2",
                    "montagMeasure": 390
                },
                {
                    "montagName": "Обработка стен бетоноконтактом",
                    "montagPrice": "м2",
                    "montagMeasure": 75
                },
                {
                    "montagName": "Обшивка откосов вагонкой",
                    "montagPrice": "п.м.",
                    "montagMeasure": 550
                },
                {
                    "montagName": "Обшивка стен вагонкой",
                    "montagPrice": "м2",
                    "montagMeasure": 590
                },
                {
                    "montagName": "Обшивка стен ПВХ,МДФ по обрешетке",
                    "montagPrice": "м2",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Обшивка стен сайдингом",
                    "montagPrice": "м2",
                    "montagMeasure": 620
                },
                {
                    "montagName": "Обшивка стен фигурная, сложной конфигурации из ГКЛ с устройством каркаса (S принимать в осях)",
                    "montagPrice": "м2",
                    "montagMeasure": 1100
                },
                {
                    "montagName": "Оклейка короба обоями",
                    "montagPrice": "п.м.",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Оклейка откосов обоями",
                    "montagPrice": "п.м.",
                    "montagMeasure": 270
                },
                {
                    "montagName": "Оклейка стен ГКЛ",
                    "montagPrice": "м2",
                    "montagMeasure": 510
                },
                {
                    "montagName": "Оклейка стен натуральными обоями",
                    "montagPrice": "м2",
                    "montagMeasure": 620
                },
                {
                    "montagName": "Оклейка стен обойным бардюром",
                    "montagPrice": "п.м.",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Оклейка стен обоями ( флизилин)",
                    "montagPrice": "м2",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Оклейка стен обоями (бумажные ,виниловые )",
                    "montagPrice": "м2",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Оклейка стен обоями в два уровня",
                    "montagPrice": "м2",
                    "montagMeasure": 330
                },
                {
                    "montagName": "Оклейка стен обоями под покраску",
                    "montagPrice": "м2",
                    "montagMeasure": 180
                },
                {
                    "montagName": "Оклейка стен пробковыми панелями",
                    "montagPrice": "м2",
                    "montagMeasure": 630
                },
                {
                    "montagName": "Оклейка стен стеклообоями",
                    "montagPrice": "м2",
                    "montagMeasure": 180
                },
                {
                    "montagName": "Оклейка стен текстильными обоями",
                    "montagPrice": "м2",
                    "montagMeasure": 470
                },
                {
                    "montagName": "Окраска короба на 2 раза",
                    "montagPrice": "п.м.",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Окраска металлоконструкций",
                    "montagPrice": "м2",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Окраска откосов на 2раза",
                    "montagPrice": "п.м.",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Окраска откосов с помощью распылителя",
                    "montagPrice": "м2",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Окраска стен на 2 раза",
                    "montagPrice": "м2",
                    "montagMeasure": 220
                },
                {
                    "montagName": "Покраска стен с помощью распылителя",
                    "montagPrice": "м2",
                    "montagMeasure": 150
                },
                {
                    "montagName": "Проклейка стен армировочной сеткой",
                    "montagPrice": "м2",
                    "montagMeasure": 200
                },
                {
                    "montagName": "Рез плитки под 45 градусов",
                    "montagPrice": "п.м.",
                    "montagMeasure": 450
                },
                {
                    "montagName": "Установка колонны (п/у)",
                    "montagPrice": "шт.",
                    "montagMeasure": "от 2000"
                },
                {
                    "montagName": "Устройство короба из ГКЛ по мет.каркасу",
                    "montagPrice": "п.м.",
                    "montagMeasure": 720
                },
                {
                    "montagName": "Устройство короба из ПВХ ,ГВЛ по мет.каркасу",
                    "montagPrice": "п.м.",
                    "montagMeasure": 720
                },
                {
                    "montagName": "Устройство ниш в бетоне",
                    "montagPrice": "шт.",
                    "montagMeasure": "от 3000"
                },
                {
                    "montagName": "Устройство ниш в кирпичной кладке",
                    "montagPrice": "шт.",
                    "montagMeasure": "от 3000"
                },
                {
                    "montagName": "Устройство перегородки из ГКЛ",
                    "montagPrice": "м2",
                    "montagMeasure": 680
                },
                {
                    "montagName": "Устройство перегородки из ГКЛ в 2 слоя",
                    "montagPrice": "м2",
                    "montagMeasure": 800
                },
                {
                    "montagName": "Устройство стен из панелей МДФ",
                    "montagPrice": "м2",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Устройство стен из пластиковых панелей",
                    "montagPrice": "м2",
                    "montagMeasure": 400
                },
                {
                    "montagName": "Шлифовка стен под обои",
                    "montagPrice": "м2",
                    "montagMeasure": 75
                },
                {
                    "montagName": "Шлифовка стен под обои",
                    "montagPrice": "м2",
                    "montagMeasure": 75
                },
                {
                    "montagName": "Шлифовка стен под покраску",
                    "montagPrice": "м2",
                    "montagMeasure": 100
                },
                {
                    "montagName": "Шпатлевка и шлифовка короба",
                    "montagPrice": "п.м.",
                    "montagMeasure": 360
                },
                {
                    "montagName": "Шпатлевка и шлифовка короба под покраску",
                    "montagPrice": "п.м.",
                    "montagMeasure": 410
                },
                {
                    "montagName": "Шпатлевка и шлифовка откосов",
                    "montagPrice": "п.м.",
                    "montagMeasure": 270
                },
                {
                    "montagName": "Шпатлевка и шлифовка откосов под покраску",
                    "montagPrice": "п.м.",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Шпатлевка стен под обои",
                    "montagPrice": "м2",
                    "montagMeasure": 225
                },
                {
                    "montagName": "Шпатлевка стен под покраску",
                    "montagPrice": "м2",
                    "montagMeasure": 250
                },
                {
                    "montagName": "Шпатлевка, окраска колонны (п/у)",
                    "montagPrice": "шт.",
                    "montagMeasure": "от 2000"
                },
                {
                    "montagName": "Штукатурка (выравнивание стен)",
                    "montagPrice": "м2",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Штукатурка откосов",
                    "montagPrice": "п.м.",
                    "montagMeasure": 350
                },
                {
                    "montagName": "Штукатурка откосов арочных",
                    "montagPrice": "п.м.",
                    "montagMeasure": 1000
                },
                {
                    "montagName": "Штукатурка стен криволинейной плоскости",
                    "montagPrice": "м2",
                    "montagMeasure": 520
                }
            ]
        },
        {
            name: 'Пол',
            demontag: [{
                    "demontagName": "Разборка деревянного пола",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Разборка полов из ДСП",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Разборка ламината",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Снятие паркета",
                    "demontagMeasure": "м2",
                    "demontagPrice": 200
                },
                {
                    "demontagName": "Снятие паркетной доски",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж ДВП с пола",
                    "demontagMeasure": "м2",
                    "demontagPrice": 110
                },
                {
                    "demontagName": "Демонтаж линолеума",
                    "demontagMeasure": "м2",
                    "demontagPrice": 75
                },
                {
                    "demontagName": "Демонтаж ковролина",
                    "demontagMeasure": "м2",
                    "demontagPrice": 80
                },
                {
                    "demontagName": "Демонта�� линолеума,ковролина на клею",
                    "demontagMeasure": "м2",
                    "demontagPrice": 125
                },
                {
                    "demontagName": "Демонтаж напольных гранитных плит",
                    "demontagMeasure": "м2",
                    "demontagPrice": 300
                },
                {
                    "demontagName": "Демонтаж кварцвиниловой,ПВХ плитки",
                    "demontagMeasure": "м2",
                    "demontagPrice": 125
                },
                {
                    "demontagName": "Демонтаж плитки с пола (керамической)",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж цементной стяжки до 5см.",
                    "demontagMeasure": "м2",
                    "demontagPrice": 350
                },
                {
                    "demontagName": "Демонтаж цементной стяжки до 8см.",
                    "demontagMeasure": "м2",
                    "demontagPrice": 470
                },
                {
                    "demontagName": "Демонтаж бетонной стяжки",
                    "demontagMeasure": "м2",
                    "demontagPrice": "от 450"
                },
                {
                    "demontagName": "Демонтаж цементного плинтуса",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 470
                },
                {
                    "demontagName": "Демонтаж бетонного плинтуса",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 650
                },
                {
                    "demontagName": "Демонтаж плинтуса керамического",
                    "demontagMeasure": "м.п.",
                    "demontagPrice": 250
                },
                {
                    "demontagName": "Демонтаж плинтуса напольного",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 90
                },
                {
                    "demontagName": "Демонтаж плинтуса напольного с сохранением",
                    "demontagMeasure": "п.м.",
                    "demontagPrice": 125
                },
                {
                    "demontagName": "Демонтаж порожка",
                    "demontagMeasure": "шт.",
                    "demontagPrice": 75
                },
                {
                    "demontagName": "Снятие фанеры, оргалита",
                    "demontagMeasure": "м.п.",
                    "demontagPrice": 110
                },
                {
                    "demontagName": "Удаление плитки с пола",
                    "demontagMeasure": "м2",
                    "demontagPrice": 150
                },
                {
                    "demontagName": "Демонтаж тепло-шумоизоляции",
                    "demontagMeasure": "м2",
                    "demontagPrice": 70
                }
            ],
            montag: [{
                    "montagName": "Антисептирование вагонки",
                    "montagMeasure": "м2",
                    "montagPrice": 150
                },
                {
                    "montagName": "Выравнивание углов",
                    "montagMeasure": "п.м.",
                    "montagPrice": 320
                },
                {
                    "montagName": "Выравнивание, примыкание (стена-пол, потолок)",
                    "montagMeasure": "п.м.",
                    "montagPrice": 240
                },
                {
                    "montagName": "Герметизация (монтаж. пеной) межпанельных швов",
                    "montagMeasure": "п.м.",
                    "montagPrice": 1250
                },
                {
                    "montagName": "Гидроизоляция стен смесями",
                    "montagMeasure": "м2",
                    "montagPrice": 350
                },
                {
                    "montagName": "Грунтовка короба на 1 раз",
                    "montagMeasure": "п.м.",
                    "montagPrice": 50
                },
                {
                    "montagName": "Грунтовка металлоконструкций",
                    "montagMeasure": "м2",
                    "montagPrice": 350
                },
                {
                    "montagName": "Грунтовка откосов на 1 раз",
                    "montagMeasure": "п.м.",
                    "montagPrice": 50
                },
                {
                    "montagName": "Грунтовка стен на 1 раз",
                    "montagMeasure": "м2",
                    "montagPrice": 50
                },
                {
                    "montagName": "Заделка швов серпянкой и унифлотом",
                    "montagMeasure": "п.м.",
                    "montagPrice": 190
                },
                {
                    "montagName": "Затирка швов плитки",
                    "montagMeasure": "м2",
                    "montagPrice": 125
                },
                {
                    "montagName": "Кладка криволинейных перегородок из гипсоблоков, пеноблоков",
                    "montagMeasure": "м2",
                    "montagPrice": 890
                },
                {
                    "montagName": "Кладка перегородки в 1/2 кирпича",
                    "montagMeasure": "м2",
                    "montagPrice": 660
                },
                {
                    "montagName": "Кладка перегородки в кирпич",
                    "montagMeasure": "м2",
                    "montagPrice": 1020
                },
                {
                    "montagName": "Кладка перегородок из гипсоблоков, пеноблоков",
                    "montagMeasure": "м2",
                    "montagPrice": 680
                },
                {
                    "montagName": "Кладка перегородок из стеклоблоков",
                    "montagMeasure": "м2",
                    "montagPrice": 1550
                },
                {
                    "montagName": "Лакировка уголков деревянных",
                    "montagMeasure": "п.м.",
                    "montagPrice": 220
                },
                {
                    "montagName": "Монтаж зеркала на стену (на клей)",
                    "montagMeasure": "м2",
                    "montagPrice": 930
                },
                {
                    "montagName": "Монтаж керамического бордюра",
                    "montagMeasure": "п.м.",
                    "montagPrice": 450
                },
                {
                    "montagName": "Монтаж откосов из ГКЛ",
                    "montagMeasure": "п.м.",
                    "montagPrice": 400
                },
                {
                    "montagName": "Монтаж откосов из ПВХ,МДФ",
                    "montagMeasure": "п.м.",
                    "montagPrice": 500
                },
                {
                    "montagName": "Монтаж пластикого уголка",
                    "montagMeasure": "п.м.",
                    "montagPrice": 110
                },
                {
                    "montagName": "Монтаж стен из ГКЛ (ГВЛ) на клей",
                    "montagMeasure": "м2",
                    "montagPrice": 510
                },
                {
                    "montagName": "Монтаж уголка перфорированного",
                    "montagMeasure": "п.м.",
                    "montagPrice": 150
                },
                {
                    "montagName": "Монтаж уголка пластикового по плитке",
                    "montagMeasure": "п.м.",
                    "montagPrice": 150
                },
                {
                    "montagName": "Монтаж уголков деревянных",
                    "montagMeasure": "п.м.",
                    "montagPrice": 150
                },
                {
                    "montagName": "Монтаж фальшстены из ГКЛ по металлокаркасу",
                    "montagMeasure": "м2",
                    "montagPrice": 580
                },
                {
                    "montagName": "Монтаж фальшстены из ПВХ по металлокаркасу",
                    "montagMeasure": "м2",
                    "montagPrice": 560
                },
                {
                    "montagName": "Монтаж шумо-теплоизоляции",
                    "montagMeasure": "м2",
                    "montagPrice": 250
                },
                {
                    "montagName": "Наклейка малярной сетки",
                    "montagMeasure": "м2",
                    "montagPrice": 200
                },
                {
                    "montagName": "Нанесение \"венецианской\" штукатурки",
                    "montagMeasure": "м2",
                    "montagPrice": 1100
                },
                {
                    "montagName": "Нанесение бетоноконтакта, антиплесень",
                    "montagMeasure": "м2",
                    "montagPrice": 75
                },
                {
                    "montagName": "Нанесение декор.штукатурки от",
                    "montagMeasure": "м2",
                    "montagPrice": 600
                },
                {
                    "montagName": "Нанесение фактурной штукатурки",
                    "montagMeasure": "м2",
                    "montagPrice": 490
                },
                {
                    "montagName": "Насечка стен",
                    "montagMeasure": "м2",
                    "montagPrice": 150
                },
                {
                    "montagName": "Облицовка короба плиткой",
                    "montagMeasure": "м2",
                    "montagPrice": 1200
                },
                {
                    "montagName": "Облицовка короба плиткой",
                    "montagMeasure": "п.м.",
                    "montagPrice": 1100
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой",
                    "montagMeasure": "м2",
                    "montagPrice": 1200
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой (10х10)",
                    "montagMeasure": "м2",
                    "montagPrice": 1250
                },
                {
                    "montagName": "Облицовка кухонного фартука каф.плиткой по диагонали",
                    "montagMeasure": "м2",
                    "montagPrice": 1300
                },
                {
                    "montagName": "Облицовка откосов плиткой",
                    "montagMeasure": "п.м.",
                    "montagPrice": 950
                },
                {
                    "montagName": "Облицовка стен в ½ кирпича толщиной",
                    "montagMeasure": "м2",
                    "montagPrice": 1100
                },
                {
                    "montagName": "Облицовка стен декоративным камнем",
                    "montagMeasure": "м2",
                    "montagPrice": 1200
                },
                {
                    "montagName": "Облицовка стен каф.плиткой",
                    "montagMeasure": "м2",
                    "montagPrice": 1150
                },
                {
                    "montagName": "Облицовка стен каф.плиткой по диагонали",
                    "montagMeasure": "м2",
                    "montagPrice": 1250
                },
                {
                    "montagName": "Облицовка стен мозайкой",
                    "montagMeasure": "м2",
                    "montagPrice": 1900
                },
                {
                    "montagName": "Облицовка стен натуральным камнем",
                    "montagMeasure": "м2",
                    "montagPrice": 1750
                },
                {
                    "montagName": "Облицовка стен плиткой размером 10*10",
                    "montagMeasure": "м2",
                    "montagPrice": 1200
                },
                {
                    "montagName": "Обработка лаком на 2 раза с шлифовкой",
                    "montagMeasure": "м2",
                    "montagPrice": 390
                },
                {
                    "montagName": "Обработка стен бетоноконтактом",
                    "montagMeasure": "м2",
                    "montagPrice": 75
                },
                {
                    "montagName": "Обшивка откосов вагонкой",
                    "montagMeasure": "п.м.",
                    "montagPrice": 550
                },
                {
                    "montagName": "Обшивка стен вагонкой",
                    "montagMeasure": "м2",
                    "montagPrice": 590
                },
                {
                    "montagName": "Обшивка стен ПВХ,МДФ по обрешетке",
                    "montagMeasure": "м2",
                    "montagPrice": 400
                },
                {
                    "montagName": "Обшивка стен сайдингом",
                    "montagMeasure": "м2",
                    "montagPrice": 620
                },
                {
                    "montagName": "Обшивка стен фигурная, сложной конфигурации из ГКЛ с устройством каркаса (S принимать в осях)",
                    "montagMeasure": "м2",
                    "montagPrice": 1100
                },
                {
                    "montagName": "Оклейка короба обоями",
                    "montagMeasure": "п.м.",
                    "montagPrice": 220
                },
                {
                    "montagName": "Оклейка откосов обоями",
                    "montagMeasure": "п.м.",
                    "montagPrice": 270
                },
                {
                    "montagName": "Оклейка стен ГКЛ",
                    "montagMeasure": "м2",
                    "montagPrice": 510
                },
                {
                    "montagName": "Оклейка стен натуральными обоями",
                    "montagMeasure": "м2",
                    "montagPrice": 620
                },
                {
                    "montagName": "Оклейка стен обойным бардюром",
                    "montagMeasure": "п.м.",
                    "montagPrice": 150
                },
                {
                    "montagName": "Оклейка стен обоями ( флизилин)",
                    "montagMeasure": "м2",
                    "montagPrice": 220
                },
                {
                    "montagName": "Оклейка стен обоями (бумажные ,виниловые )",
                    "montagMeasure": "м2",
                    "montagPrice": 220
                },
                {
                    "montagName": "Оклейка стен обоями в два уровня",
                    "montagMeasure": "м2",
                    "montagPrice": 330
                },
                {
                    "montagName": "Оклейка стен обоями под покраску",
                    "montagMeasure": "м2",
                    "montagPrice": 180
                },
                {
                    "montagName": "Оклейка стен пробковыми панелями",
                    "montagMeasure": "м2",
                    "montagPrice": 630
                },
                {
                    "montagName": "Оклейка стен стеклообоями",
                    "montagMeasure": "м2",
                    "montagPrice": 180
                },
                {
                    "montagName": "Оклейка стен текстильными обоями",
                    "montagMeasure": "м2",
                    "montagPrice": 470
                },
                {
                    "montagName": "Окраска короба на 2 раза",
                    "montagMeasure": "п.м.",
                    "montagPrice": 220
                },
                {
                    "montagName": "Окраска металлоконструкций",
                    "montagMeasure": "м2",
                    "montagPrice": 400
                },
                {
                    "montagName": "Окраска откосов на 2раза",
                    "montagMeasure": "п.м.",
                    "montagPrice": 220
                },
                {
                    "montagName": "Окраска откосов с помощью распылителя",
                    "montagMeasure": "м2",
                    "montagPrice": 150
                },
                {
                    "montagName": "Окраска стен на 2 раза",
                    "montagMeasure": "м2",
                    "montagPrice": 220
                },
                {
                    "montagName": "Покраска стен с помощью распылителя",
                    "montagMeasure": "м2",
                    "montagPrice": 150
                },
                {
                    "montagName": "Проклейка стен армировочной сеткой",
                    "montagMeasure": "м2",
                    "montagPrice": 200
                },
                {
                    "montagName": "Рез плитки под 45 градусов",
                    "montagMeasure": "п.м.",
                    "montagPrice": 450
                },
                {
                    "montagName": "Установка колонны (п/у)",
                    "montagMeasure": "шт.",
                    "montagPrice": "от 2000"
                },
                {
                    "montagName": "Устройство короба из ГКЛ по мет.каркасу",
                    "montagMeasure": "п.м.",
                    "montagPrice": 720
                },
                {
                    "montagName": "Устройство короба из ПВХ ,ГВЛ по мет.каркасу",
                    "montagMeasure": "п.м.",
                    "montagPrice": 720
                },
                {
                    "montagName": "Устройство ниш в бетоне",
                    "montagMeasure": "шт.",
                    "montagPrice": "от 3000"
                },
                {
                    "montagName": "Устройство ниш в кирпичной кладке",
                    "montagMeasure": "шт.",
                    "montagPrice": "от 3000"
                },
                {
                    "montagName": "Устройство перегородки из ГКЛ",
                    "montagMeasure": "м2",
                    "montagPrice": 680
                },
                {
                    "montagName": "Устройство перегородки из ГКЛ в 2 слоя",
                    "montagMeasure": "м2",
                    "montagPrice": 800
                },
                {
                    "montagName": "Устройство стен из панелей МДФ",
                    "montagMeasure": "м2",
                    "montagPrice": 400
                },
                {
                    "montagName": "Устройство стен из пластиковых панелей",
                    "montagMeasure": "м2",
                    "montagPrice": 400
                },
                {
                    "montagName": "Шлифовка стен под обои",
                    "montagMeasure": "м2",
                    "montagPrice": 75
                },
                {
                    "montagName": "Шлифовка стен под обои",
                    "montagMeasure": "м2",
                    "montagPrice": 75
                },
                {
                    "montagName": "Шлифовка стен под покраску",
                    "montagMeasure": "м2",
                    "montagPrice": 100
                },
                {
                    "montagName": "Шпатлевка и шлифовка короба",
                    "montagMeasure": "п.м.",
                    "montagPrice": 360
                },
                {
                    "montagName": "Шпатлевка и шлифовка короба под покраску",
                    "montagMeasure": "п.м.",
                    "montagPrice": 410
                },
                {
                    "montagName": "Шпатлевка и шлифовка откосов",
                    "montagMeasure": "п.м.",
                    "montagPrice": 270
                },
                {
                    "montagName": "Шпатлевка и шлифовка откосов под покраску",
                    "montagMeasure": "п.м.",
                    "montagPrice": 350
                },
                {
                    "montagName": "Шпатлевка стен под обои",
                    "montagMeasure": "м2",
                    "montagPrice": 225
                },
                {
                    "montagName": "Шпатлевка стен под покраску",
                    "montagMeasure": "м2",
                    "montagPrice": 250
                },
                {
                    "montagName": "Шпатлевка, окраска колонны (п/у)",
                    "montagMeasure": "шт.",
                    "montagPrice": "от 2000"
                },
                {
                    "montagName": "Штукатурка (выравнивание стен)",
                    "montagMeasure": "м2",
                    "montagPrice": 350
                },
                {
                    "montagName": "Штукатурка откосов",
                    "montagMeasure": "п.м.",
                    "montagPrice": 350
                },
                {
                    "montagName": "Штукатурка откосов арочных",
                    "montagMeasure": "п.м.",
                    "montagPrice": 1000
                },
                {
                    "montagName": "Штукатурка стен криволинейной плоскости",
                    "montagMeasure": "м2",
                    "montagPrice": 520
                }
            ]
        }
    ]
}