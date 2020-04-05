// Импортируем другие js-файлы
$(document).ready(function() {
    const navToggle = $('.nav-toggle'),
        navList = $('.nav-list'),
        nav = $('.main-nav');

    $(navToggle).click(function(e) {
        e.preventDefault()
        $(this).toggleClass('active');
        $(navList).toggleClass('active');
    });

    const $page = $('html, body');
    $('.main-nav a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60
        }, 500);
        return false;
    });
    $(document).scroll(function() {
        if ($(window).scrollTop() > 70) {
            $(nav).addClass('active');
        } else {
            $(nav).removeClass('active');
        }
    });
});