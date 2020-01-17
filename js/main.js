// Импортируем другие js-файлы
$(document).ready(function() {
  $(".level-link").hover(function() {
    $(".level-content").toggleClass("active");
  });
  const toggler = $(".toggle-link");
  const toggleBlock = $(".toggle-block");
  $(toggler).click(function(e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(this)
      .siblings(toggleBlock)
      .toggleClass("active");
    const toggleHeight = $(this)
      .siblings(toggleBlock)
      .height();
    /*
    if ($(this).hasClass("active")) {
      $(this)
        .parent()
        .next()
        .css("margin-top", toggleHeight + 20);
    } else {
      $(this)
        .parent()
        .next()
        .css("margin-top", "10px");
    } */
  });
});
$(document).ready(function() {
  $(".main-nav__link").on("click", function(event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 1500);
  });
});

const burgerButton = document.querySelector(".mobile-menu");
let menuStatus = false;
burgerButton.addEventListener("click", () => {
  if (!menuStatus) {
    burgerButton.classList.add("active");
    menuStatus = true;
  } else {
    burgerButton.classList.remove("active");
    menuStatus = false;
  }
});
const reviewMark = document.querySelectorAll(".reviews__mark .mark");
let sum = 0;
reviewMark.forEach(element => {
  if (element.innerHTML >= 4 && element.innerHTML < 5) {
    element.classList.add("high");
  }
  if (element.innerHTML >= 3 && element.innerHTML < 4) {
    element.classList.add("medium");
  }
  if (element.innerHTML >= 5) {
    element.classList.add("awesome");
  }
  sum += +element.innerHTML / reviewMark.length;
});
document.querySelector(".result-mark").innerHTML = sum.toFixed(2);
/*let reviewList = document.querySelectorAll(".reviews__item");
reviewList.forEach(function(item, i) {
  console.log(i);
  if (i < 3) {
    item.classList.add("active");
    console.log("123");
  }
});

document.querySelector(".more_link a").addEventListener("click", function(e) {
  e.preventDefault();
  let activeReviews = document.querySelectorAll(".reviews__item.active");
  let lastReview = activeReviews[activeReviews.length - 1];
  lastReview.nextElementSibling.classList.add("active");
  let hiddenReview = document
    .querySelector(".reviews__item")
    .classList.contains("active");
  console.log(hiddenReview);
  if (!hiddenReview) {
    console.log("123");
  }
}); */
/*
const reviewDesk = document.querySelectorAll(".reviews__desc p");
const reviewLenght = 150;
reviewDesk.forEach(function(item, i) {
  reviewDeskText = item.innerHTML;
  console.log(reviewDeskText);
  let sliced = reviewDeskText.slice(0, 150);
  if (reviewDeskText.length > reviewLenght) {
    sliced += "...";
    item.innerHTML = sliced;
  }
  item.addEventListener("click", function() {
    this.classList.toggle("active");
    if (item.classList.contains("active")) {
      this.innerHTML = reviewDeskText;
    } else {
      sliced += "...";
      item.innerHTML = sliced;
    }
  });
});
*/

let videoButton = document.querySelector(".video-review__button"),
  reviewList = document.querySelector(".reviews__list"),
  videoWrapper = document.querySelector(".video-review__wrapper");

videoButton.addEventListener("click", function(event) {
  event.preventDefault();
  let targetButton = event.target;
  if (targetButton.classList.contains("active")) {
    targetButton.classList.remove("active");
    reviewList.classList.remove("hide");
    videoWrapper.classList.remove("active");
    videoButton.textContent = '"Живой отзыв"';
    videoButton.classList.add("video");
  } else {
    targetButton.classList.add("active");
    reviewList.classList.add("hide");
    videoWrapper.classList.add("active");
    videoButton.textContent = "Отзывы";
    videoButton.classList.remove("video");
  }
});