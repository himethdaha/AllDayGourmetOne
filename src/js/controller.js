"use strict";
//Polyfilling everything except async/await
import "core-js/stable";
//Polyfilling asyn/await
import "regenerator-runtime/runtime";

const parentElement = document.querySelector(".searched-item");
console.log(parentElement);

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long. Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

//Function to get a receipe
const getItem = async function () {
  try {
    //Get the hash from the window url
    //slice off the hash from the url
    const id = window.location.hash.slice(1);

    //When loading without an id it gives an error
    //To stop that do a guard clause
    if (!id) return;
    // 1) Fetch recipe from url
    const resp = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    //Assign the json object to a variable
    const data = await resp.json();
    //validate
    if (!resp.ok) {
      throw new Error(`${data.message} , ${resp.status}`);
    }
    //Get the meal object into my receipe variable
    let receipe = data.data.recipe;
    console.log(receipe);
    //Create the receipe Object from the receipe variable
    receipe = {
      id: receipe.id,
      title: receipe.title,
      image: receipe.image_url,
      servings: receipe.servings,
      cookingTime: receipe.cooking_time,
      ingredients: receipe.ingredients,
    };

    //2) Render receipe
    const htmlMarkup = `
    <figure class="figure-section">
    <img
      src="${receipe.image}"
      alt="${receipe.title}"
      class="food-image"
    />
    <h1 class="food-title">
      <span class="food-title-span"
        >${receipe.title}</span
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
        receipe.cookingTime
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
      <span class="cooking-info-no servings-number">${receipe.servings}</span>
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
    ${receipe.ingredients
      .map((ing) => {
        return `
      <li class="ingredient">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="ingredient-icon"><rect width="256" height="256" fill="none"></rect><polyline points="172 104 113.3 160 84 132" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><circle cx="128" cy="128" r="96" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle></svg>
      <div class="ingredient-amount">${ing.quantity}</div>
      <span class="receipe-ingredient-unit">${ing.unit} ${ing.description}</span>

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
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  } catch (error) {
    alert(error);
  }
};

//Event listener for the side bar items
window.addEventListener("hashchange", getItem);
//Event listener for when the page is loaded with an id in the url
window.addEventListener("load", getItem);
