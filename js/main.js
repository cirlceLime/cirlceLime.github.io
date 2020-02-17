// Импортируем другие js-файлы
$(document).ready(function(){
    const subCategoryItem =  $('.main-nav .subCategory-list');
    subCategoryItem.map(function(val,i){
        $(i).css('right', -$(i).innerWidth());
    });
    $('.main-nav .category-list__item').mouseover(function(){
        $('.main-nav').addClass('active');
    });
    $('.main-nav .category-list__item').mouseout(function(){
        $('.main-nav').removeClass('active');
    });
    $('.menu-trigger').click(function(){
        $('.main-nav').addClass('active');
        $('body').addClass('overflow');
    });
    $('.item__select').change(function(){
       let list = document.querySelectorAll('.item__select');
    });
    const tabsLink = $('.tabs__link');
    const tabsContent = $('.tabs__content');
    const tabsItem = $('.tabs__item');
    tabsLink.click(function(){
        let ElementIndex = $(tabsLink).index($(this));
        
        $(tabsLink).removeClass('active');
        $(this).addClass('active');
        
        $(tabsItem).removeClass('active');
        $(tabsItem).eq(ElementIndex).addClass('active');
        
    });
    //Checkout JS
    $('.checkout-finish').click(function(){
        $('.checkout-modal').addClass('active');
        $('body').addClass('overflow');
    });
    $(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".checkout-modal"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.removeClass('active'); // скрываем его
            $('body').removeClass('overflow');
		}
    });
    $('.phone-trigger').click(function(){
        $('.header .phone-list').toggleClass('active');
    });
});

let calculatorItemsList = document.querySelectorAll('.item__select');
let sumWrapper = document.querySelector('.price-summary .price');
calculatorItemsList.forEach(function(element){
    element.addEventListener('change', function(){
        countSum();
    });
});

let countSum = function(){
    let sum = document.querySelector('.price-start').innerHTML;
    calculatorItemsList.forEach(function(element){
         sum = +sum + +element.value;
    });
    sumWrapper.innerHTML = sum;
};