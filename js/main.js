// Импортируем другие js-файлы
$(document).ready(function() {
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
  videoWrapper = document.querySelector(".video-review__wrapper"),
  moreLink = document.querySelector(".reviews .more_link");

videoButton.addEventListener("click", function(event) {
  event.preventDefault();
  let targetButton = event.target;
  if (targetButton.classList.contains("active")) {
    targetButton.classList.remove("active");
    reviewList.classList.remove("hide");
    videoWrapper.classList.remove("active");
    videoButton.textContent = '"Живой отзыв"';
    videoButton.classList.add("video");
    moreLink.classList.remove("hide");
  } else {
    targetButton.classList.add("active");
    reviewList.classList.add("hide");
    videoWrapper.classList.add("active");
    videoButton.textContent = "Отзывы";
    videoButton.classList.remove("video");
    moreLink.classList.add("hide");
  }
});
let sectionArr = document.querySelectorAll("section"),
  thirdSection = sectionArr[2],
  contactForm = document.querySelector(".contact-form");
let isContactForm = false;
window.addEventListener("scroll", function() {
  showContactForm();
});
function getBodyScrollTop() {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop)
  );
}
function showContactForm() {
  let offsetScroll = getBodyScrollTop();
  let thirdSectionOffset = thirdSection.offsetTop;
  if (thirdSectionOffset - offsetScroll < 0 && !isContactForm) {
    contactForm.classList.add("active");
    isContactForm = true;
  }
}
let inputFocused = document.querySelectorAll(".input__wrapper input");
let inputWrapper = document.querySelectorAll(".input__wrapper");
let modalClose = document.querySelector(".modal-block__close");
let modalBlock = document.querySelector(".modal-block");
let modalOpen = document.querySelector(".modal-block__open");
let submitLink = document.querySelector(".submit__link");
let modalEnd = document.querySelector(".modal-block__end");
let modalTel = document.querySelector("#tel");
let modalName = document.querySelector("#name");
let date = new Date();
inputFocused.forEach(function(item) {
  item.addEventListener("focus", function() {
    inputWrapper.forEach(function(item) {
      item.classList.remove("focused");
    });
    item.parentElement.classList.add("focused");
    this.parentElement.classList.remove("error");
    this.parentElement.classList.remove("validate");
  });
  item.addEventListener("blur", function() {
    inputWrapper.forEach(function(item) {
      item.classList.remove("focused");
    });
    if (this.classList.contains("telephone")) {
      let telClearValue = this.value.replace(/\s+/g, "").length;
      if (telClearValue != 15) {
        this.parentElement.classList.add("error");
        this.parentElement.classList.remove("validate");
      } else {
        this.parentElement.classList.add("validate");
        this.parentElement.classList.remove("error");
      }
    } else {
      let inputValue = this.value.length;
      if (inputValue == 0) {
        this.parentElement.classList.add("error");
        this.parentElement.classList.remove("validate");
      } else {
        this.parentElement.classList.add("validate");
        this.parentElement.classList.remove("error");
      }
    }
  });
});
modalClose.addEventListener("click", function() {
  modalBlock.classList.remove("open");
  document.querySelector("body").classList.remove("overflow");
});
modalOpen.addEventListener("click", function() {
  modalBlock.classList.add("open");
  document.querySelector("body").classList.add("overflow");
});
submitLink.addEventListener("click", function(event) {
  event.preventDefault();
  if (date.getHours() < 8) {
    modalEnd.innerHTML =
      "<p>Спасибо за заявку <br> <br> мы свяжемся с вами в течении <span>15-30</span> минут</p>";
  } else {
    modalEnd.innerHTML =
      "<p>Извините <br> <br> мы работает с <span>8:00</span> до <span>21:00</span> <br> <br> мы свяжемся с вами в течении следующиего рабочего дня</p>";
  }
  modalEnd.classList.add("show");
});
modalEnd.addEventListener("click", function() {
  if (modalEnd.classList.contains("show")) {
    modalBlock.classList.remove("open");
    modalEnd.classList.remove("show");
    document.querySelector("body").classList.remove("overflow");
  }
});
window.addEventListener("DOMContentLoaded", function() {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }
  function mask(event) {
    var matrix = "+38 (0__) ___ __ __",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else setCursorPosition(this.value.length, this);
  }
  var input = document.querySelector("#tel");
  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
});
let aboutSection = document.querySelector("#about-section");
let linkLevel = document.querySelector(".level-link");
let levelContent = document.querySelector(".level-content");
let levelList = levelContent.querySelector(".level-list");
let levelListItem = levelList.querySelectorAll("li");
let LevelListDesc = document.querySelectorAll(".level-list__desc");
aboutSection.addEventListener("click", function(event) {
  if (event.target == linkLevel) {
    if (levelContent.classList.contains("active")) {
      levelContent.classList.remove("active");
      levelListItem.forEach(function(element) {
        element.classList.remove("active");
        let elementDesc = element.querySelector(".level-list__desc");
        elementDesc.style.height = 0;
      });
    } else {
      levelContent.classList.add("active");
    }
  }
});
levelListItem.forEach(function(item) {
  item.addEventListener("click", function() {
    levelListItem.forEach(function(element) {
      element.classList.remove("active");
      let elementDesc = element.querySelector(".level-list__desc");
      elementDesc.style.height = 0;
    });
    let itemContent = this.querySelector(".level-list__desc");
    if (!itemContent.classList.contains("active")) {
      this.classList.add("active");
      itemContent.style.height = itemContent.dataset.height + "px";
    }
  });
});

LevelListDesc.forEach(function(item) {
  let itemHeight = item.offsetHeight;
  item.dataset.height = itemHeight;
  item.style.height = 0;
});