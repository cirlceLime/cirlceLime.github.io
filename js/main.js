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