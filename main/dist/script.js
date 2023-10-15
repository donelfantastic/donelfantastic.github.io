let menuIcon = $(".toggle-nav");
let nav = $(".nav");
let navItem = $(".nav__item");

menuIcon.click(function () {
  $(this).toggleClass("toggle-nav--open");

  if (nav.hasClass("nav--open")) {
    navItem.removeClass("nav__item--open");

    setTimeout(function () {
      nav.removeClass("nav--open");
    }, 550);
  } else {
    nav.addClass("nav--open");

    setTimeout(function () {
      navItem.addClass("nav__item--open");
    }, 550);
  }
});

// SOCIAL PANEL JS
const floating_btn = document.querySelector(".floating-btn");
const close_btn = document.querySelector(".close-btn");
const social_panel_container = document.querySelector(
  ".social-panel-container"
);

floating_btn.addEventListener("click", () => {
  social_panel_container.classList.toggle("visible");
});

close_btn.addEventListener("click", () => {
  social_panel_container.classList.remove("visible");
});