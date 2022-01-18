import Fraction from "fractional";
("use strict");

//Class for the Receipe View
class ReceipeView {
  //Private Property
  //Prierty to be inherted by other classes
  #parentElement = document.querySelector(".searched-item");
  #data;

  render(data) {
    //storing the data rendered by the controller in this property
    this.#data = data;

    const markup = this.#generateMarkup();
    //Clear parent element
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Method to clear the parent container of the markup
  #clear() {
    this.#parentElement.innerHTML = "";
  }

  //Method as the Publisher. Therefore, needs access to the subscriber (handler function)
  //Rendering the receipe right in the beginning
  //Needs to be public to call in the controller
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  //Private method to render the HTMLMarkup
  #generateMarkup() {
    return `
    <figure class="figure-section">
    <img
      src="${this.#data.image}"
      alt="${this.#data.title}"
      class="food-image"
    />
    <h1 class="food-title">
      <span class="food-title-span"
        >${this.#data.title}</span
      >
    </h1>
  </figure>
  <!--Section for the cooking details such as time and servings-->
  <div class="cooking-details">
    <div class="cooking-time">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        class="menu-svg"
      >
        <rect width="256" height="256" fill="none"></rect>
        <circle
          cx="128"
          cy="128"
          r="96"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></circle>
        <polyline
          points="128 72 128 128 184 128"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></polyline>
      </svg>
      <span class="cooking-info-no cooking-time-no data-time">${
        this.#data.cookingTime
      }</span>
      <span class="cooking-info-text cooking-time-text">Minitues</span>
    </div>
    <div class="quantity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        class="menu-svg"
      >
        <rect width="256" height="256" fill="none"></rect>
        <circle
          cx="88"
          cy="108"
          r="52"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></circle>
        <path
          d="M155.4,57.9A54.5,54.5,0,0,1,169.5,56a52,52,0,0,1,0,104"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></path>
        <path
          d="M16,197.4a88,88,0,0,1,144,0"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></path>
        <path
          d="M169.5,160a87.9,87.9,0,0,1,72,37.4"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        ></path>
      </svg>
      <span class="cooking-info-no servings-number">${
        this.#data.servings
      }</span>
      <span class="cooking-info-text servings-number-text">Servings</span>
      <div class="quantity-buttons">
        <!--Buttons to reduce or increase servings-->
          <!--button to reduce-->
        <button class="quantity-button btn-reduce" data-update-to="3">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
        </button>
          <!--button to increase-->
        <button class="quantity-button btn-increase"  data-update-to="5" >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="servings-icon"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="88" y1="128" x2="168" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="88" x2="128" y2="168" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
        </button>
      </div>
      <!--Button to add the dish as a bookmark-->
      <button class="btn-dish-bookmark">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="bookmark-dish-icon"><rect width="256" height="256" fill="none"></rect><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
      </button>
    </div>
  </div>
  <div class="dish-ingredients">
    <h2 class="ingredients-header">Receipe Ingredients</h2>
    <ul class="ingredient-list">
    ${this.#data.ingredients
      .map((ing) => {
        return `
      <li class="ingredient">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="ingredient-icon"><rect width="256" height="256" fill="none"></rect><polyline points="172 104 113.3 160 84 132" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle></svg>
      <div class="ingredient-amount">${
        ing.quantity ? new Fraction.Fraction(ing.quantity).toString() : ""
      }</div>
      <span class="receipe-ingredient-unit">${ing.unit} ${
          ing.description
        }</span>

    </li>`;
      })
      .join("")}
    </ul>
    <!--Button to make an Order-->
    <div class="order-btn-flex">
    <button class="btn-order">
      <span class="order-text">Order</span>
    </button>
  </div>
  </div>
   
                        `;
  }
}

//Creating a default export so that only this object will be called by other modules
export default new ReceipeView();
