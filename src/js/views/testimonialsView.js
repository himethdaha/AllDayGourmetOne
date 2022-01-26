import parentView from "./parentView.js";

class TestimonialsView extends parentView {
  //Properties to be uses
  _parentElement = document.querySelector(".testimonials-container");
  //   _overlay = document.querySelector(".blured");
  //   _commentBox = document.querySelector(".comment-box");
  //   _openBtn = document.querySelector(".add-comments");
  //   _closeBtn = document.querySelector(".close-btn");
  _testimonials = document.querySelectorAll(".test");
  _btnRight = document.querySelector(".btn--right");
  _btnLeft = document.querySelector(".btn--left");
  _currentSlide = 0;
  _maxSlides = testimonials.length;
  _buttonContainer = document.querySelector(".buttons");
  _circleButtons = document.querySelectorAll(".circle-btn");
  _year = document.querySelector(".year");

  constructor() {
    super();
    this._addHandlerShow();
    this._moveTestimonials();
    this._btnRight();
    this._btnLeft();
    this._keydownPress();
    this._circleBtn();
    this._activeBtn();
  }

  //Addhandler for open btn
  _addHandlerShow() {
    window.addEventListener("load", function () {
      _generateMarkup();
    });
    // _openBtn.addEventListener("click", function () {
    //   _overlay.classList.toggle("hidden");
    //   _commentBox.classList.toggle("hidden");
    // });
  }

  _moveTestimonials() {
    this._testimonials.forEach((element, index) => {
      //Move them off the screen
      element.style.transform = `translateX(${170 * index}%)`;
    });
  }

  _btnRight() {
    this._btnRight.addEventListener("click", function () {
      //Check if the currentSlide is at the last slide
      //maxSlides.length = 3, currSlide is '0' based. That's why i gotta subtract 1
      if (_currentSlide === _maxSlides - 1) {
        //If at the last slide, when the click event happens change the currentSlide to 0
        _currentSlide = 0;
      } else {
        //When clicking the button add one to the currentSlide variable
        _currentSlide++;
      }
      testimonials.forEach((element, index) => {
        //Move them off the screen
        //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
        //way we can get the next slide as the current and the current slide as the previous
        element.style.transform = `translateX(${
          170 * (index - _currentSlide)
        }%)`;
        activateButton(_currentSlide);
      });
    });
  }

  _btnLeft() {
    this._btnLeft.addEventListener("click", function () {
      //Check if the currentSlide is at '0'
      if (_currentSlide === 0) {
        //If at '0' assign currentSlide to the last slide
        _currentSlide = _maxSlides - 1;
      } else {
        //When clicking the button subtract one to the currentSlide variable
        _currentSlide--;
      }

      testimonials.forEach((element, index) => {
        //Move them off the screen
        //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
        //way we can get the next slide as the current and the current slide as the previous
        element.style.transform = `translateX(${
          170 * (index - _currentSlide)
        }%)`;
        activateButton(_currentSlide);
      });
    });
  }
  _keydownPress() {
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        //Check if the currentSlide is at the last slide
        //maxSlides.length = 3, currSlide is '0' based. That's why i gotta subtract 1
        if (_currentSlide === _maxSlides - 1) {
          //If at the last slide, when the click event happens change the currentSlide to 0
          _currentSlide = 0;
        } else {
          //When clicking the button add one to the currentSlide variable
          _currentSlide++;
        }
        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${
            170 * (index - _currentSlide)
          }%)`;
          activateButton(_currentSlide);
        });
      }

      if (e.key === "ArrowLeft") {
        //Check if the currentSlide is at '0'
        if (_currentSlide === 0) {
          //If at '0' assign currentSlide to the last slide
          _currentSlide = _maxSlides - 1;
        } else {
          //When clicking the button subtract one to the currentSlide variable
          _currentSlide--;
        }

        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${
            170 * (index - _currentSlide)
          }%)`;
          activateButton(_currentSlide);
        });
      }
    });
  }

  _circleBtn() {
    this._buttonContainer.addEventListener("click", function (e) {
      //Check if the event target contains the class for the cirlce buttons
      if (e.target.classList.contains("circle-btn")) {
        const slide = e.target.dataset.slide;
        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${170 * (index - slide)}%)`;
          activateButton(_currentSlide);
        });
      }
    });
  }

  _activeBtn(slide) {
    //Loop through all the circle buttons
    this._circleButtons.forEach((circle) => circle.classList.remove("active"));
    //Select the button based on the dataselector
    document
      .querySelector(`.circle-btn[data-slide="${slide}"]`)
      .classList.add("active");
  }

  _generateMarkup() {}
}

export default new TestimonialsView();
