export default class parentView {
  _data;

  render(data) {
    //Check if any data is received and if not return the renderError method
    if (!data || data.length === 0) {
      return this.renderError();
    }
    //storing the data rendered by the controller in this property
    this._data = data;
    const markup = this._generateMarkup();
    //Clear parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Method to update the DOM
  update(data) {
    //storing the data rendered by the controller in this property
    this._data = data;
    //This is currently a string
    const newMarkup = this._generateMarkup();
    //Convert the markup string to a DOM object that can be stored in memory
    //So that object can be compared with the current DOM, to make the neccesary updates
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //These return Node lists. Convert to arrays
    const newElements = Array.from(newDom.querySelectorAll("*"));
    //Get the elements in the searched-item div
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    //Comparing newElements and currentElements
    newElements.forEach((newEl, i) => {
      //Current element at position 'i'
      const currEL = currentElements[i];

      //CHANGE text content
      //If the node content isn't equal AND the firstchild's node value isn't empty, change the text content
      if (
        !newEl.isEqualNode(currEL) &&
        newEl.firstChild?.nodeValue?.trim() !== ""
      ) {
        currEL.textContent = newEl.textContent;
      }

      //CHANGE attributes
      //change the data values of the quantity buttons
      if (!newEl.isEqualNode(currEL)) {
        //Get the attributes of the dissimilar nodes
        //Convert it to an array
        //Loop over the attributes
        //Set the new attributes to the cuurent attributes
        Array.from(newEl.attributes).forEach((attr) => {
          //Replace current elements attributes with new Elements attributes
          currEL.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  //Method to clear the parent container of the markup
  _clear() {
    this._parentElement.innerHTML = "";
  }
  //Markup for error message
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error-message">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="error-icon"><rect width="256" height="256" fill="none"></rect><polyline points="128 240 154.3 200 104 200 130.3 160" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><path d="M88,92a68,68,0,1,1,68,68H76a44,44,0,0,1,0-88,42.5,42.5,0,0,1,14.3,2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>                
      </div>
      <span class="error-message-text">${message}</span>
    </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerTestimonials() {
    const testimonials = document.querySelectorAll(".test");
    const btnRight = document.querySelector(".btn--right");
    const btnLeft = document.querySelector(".btn--left");
    let currentSlide = 0;
    const maxSlides = testimonials.length;
    const buttonContainer = document.querySelector(".buttons");
    const circleButtons = document.querySelectorAll(".circle-btn");
    const year = document.querySelector(".year");

    testimonials.forEach((element, index) => {
      //Move them off the screen
      element.style.transform = `translateX(${170 * index}%)`;
    });

    //Button right functionality

    btnRight.addEventListener("click", function () {
      //Check if the currentSlide is at the last slide
      //maxSlides.length = 3, currSlide is '0' based. That's why i gotta subtract 1
      if (currentSlide === maxSlides - 1) {
        //If at the last slide, when the click event happens change the currentSlide to 0
        currentSlide = 0;
      } else {
        //When clicking the button add one to the currentSlide variable
        currentSlide++;
      }
      testimonials.forEach((element, index) => {
        //Move them off the screen
        //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
        //This way we can get the next slide as the current and the current slide as the previous
        element.style.transform = `translateX(${
          170 * (index - currentSlide)
        }%)`;
        activateButton(currentSlide);
      });
    });

    //Button left functionality
    btnLeft.addEventListener("click", function () {
      //Check if the currentSlide is at '0'
      if (currentSlide === 0) {
        //If at '0' assign currentSlide to the last slide
        currentSlide = maxSlides - 1;
      } else {
        //When clicking the button subtract one to the currentSlide variable
        currentSlide--;
      }

      testimonials.forEach((element, index) => {
        //Move them off the screen
        //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
        //This way we can get the next slide as the current and the current slide as the previous
        element.style.transform = `translateX(${
          170 * (index - currentSlide)
        }%)`;
        activateButton(currentSlide);
      });
    });

    //Adding event listeners when the arrow keys are pressed
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        //Check if the currentSlide is at the last slide
        //maxSlides.length = 3, currSlide is '0' based. That's why i gotta subtract 1
        if (currentSlide === maxSlides - 1) {
          //If at the last slide, when the click event happens change the currentSlide to 0
          currentSlide = 0;
        } else {
          //When clicking the button add one to the currentSlide variable
          currentSlide++;
        }
        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //This way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${
            170 * (index - currentSlide)
          }%)`;
          activateButton(currentSlide);
        });
      }

      if (e.key === "ArrowLeft") {
        //Check if the currentSlide is at '0'
        if (currentSlide === 0) {
          //If at '0' assign currentSlide to the last slide
          currentSlide = maxSlides - 1;
        } else {
          //When clicking the button subtract one to the currentSlide variable
          currentSlide--;
        }

        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //This way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${
            170 * (index - currentSlide)
          }%)`;
          activateButton(currentSlide);
        });
      }
    });

    //Event listener for the circular buttons
    //Add the listner to the parent element
    buttonContainer.addEventListener("click", function (e) {
      //Check if the event target contains the class for the cirlce buttons
      if (e.target.classList.contains("circle-btn")) {
        const slide = e.target.dataset.slide;
        testimonials.forEach((element, index) => {
          //Move them off the screen
          //Subtract the currentSlide from the index to move the slide at '0' to '-1' and slide at '1' to '0'
          //This way we can get the next slide as the current and the current slide as the previous
          element.style.transform = `translateX(${170 * (index - slide)}%)`;
          activateButton(currentSlide);
        });
      }
    });

    //Show the active slide in the cirlce dots
    const activateButton = function (slide) {
      //Loop through all the circle buttons
      circleButtons.forEach((circle) => circle.classList.remove("active"));
      //Select the button based on the dataselector
      document
        .querySelector(`.circle-btn[data-slide="${slide}"]`)
        .classList.add("active");
    };

    //Getting the current year for the copyright text
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    year.textContent = currYear;
  }
}
