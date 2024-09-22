const homePage = document.querySelector(".homePage");
const secondPage = document.querySelector(".secondPage");
const thirdPage = document.querySelector(".thirdPage");

const soundButton = document.querySelector(".soundButton");
soundButton.addEventListener("click", () => {
  soundButton.classList.toggle("soundOff");
});

const toSecondPageButton = document.querySelector(".continueButton");
if (toSecondPageButton) {
  toSecondPageButton.addEventListener("click", () => {
    homePage.classList.add("hidden");
    secondPage.classList.remove("hidden");
    thirdPage.classList.add("hidden");
  });
}

const toThirdPageButton = document.querySelector(".toThirdPageButton");
if (toThirdPageButton) {
  toThirdPageButton.addEventListener("click", () => {
    homePage.classList.add("hidden");
    secondPage.classList.add("hidden");
    thirdPage.classList.remove("hidden");
  });
}

const finalPageButton = document.querySelector(".finalPageButton");
if (finalPageButton) {
  finalPageButton.addEventListener("click", () => {
    homePage.classList.remove("hidden");
    secondPage.classList.add("hidden");
    thirdPage.classList.add("hidden");
  });
}

const slider = document.querySelector(".slider");
const slideCard = document.querySelector(".slideCard");
const prevButton = document.querySelector(".prevButton");
const nextButton = document.querySelector(".nextButton");
const sliderImages = document.querySelectorAll(".slideImage");

const handleActiveSlider = (element) => {
  sliderImages.forEach((el) => {
    el.classList.remove("activeImage");
  });
  element.classList.add("activeImage");

  checkButtonsDisability();
};

const swipeNext = () => {
  const slideWidth = slideCard.clientWidth;
  slider.scrollLeft = slider.scrollLeft + slideWidth;
  handleActiveSlider(
    sliderImages[Math.ceil(slider.scrollLeft / slideWidth) + 1]
  );
}

const swipePrev = () => {
  const slideWidth = slideCard.clientWidth;
  slider.scrollLeft -= slideWidth;
  handleActiveSlider(
    sliderImages[Math.ceil(slider.scrollLeft / slideWidth) - 1]
  );
}

const checkButtonsDisability = () => {
  prevButton.disabled = sliderImages[0].classList.contains("activeImage");
  nextButton.disabled =
    sliderImages[sliderImages.length - 1].classList.contains("activeImage");
};

nextButton.addEventListener("click", swipeNext);
prevButton.addEventListener("click", swipePrev);

const sliderContainerArea = document.querySelector(".sliderContainer");

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

if (sliderContainerArea) {
  sliderContainerArea.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: false }
  );

  sliderContainerArea.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    false
  );
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  if (deltaX > 0) {
    swipePrev();
  } else {
    swipeNext();
  }
}
