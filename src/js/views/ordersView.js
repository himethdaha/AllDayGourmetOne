import parentView from "./parentView.js";
("use strict");

class OrdersView extends parentView {
  //Adding the parent element
  _parentElement = document.querySelector(".orders-list");
  _errorMessage = "No orders yet. Get to ordering your cravings 🤤";

  //Event listener to load all orders in storage when the page loads
  addHandlerOrdersRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    //get the id
    const id = window.location.hash.slice(1);
    //data returns an array of strings
    //Therefore got to join
    return this._data
      .map((result) => {
        return `
        <li class="result-preview">
        <a href="#${result.id}" class="result-preview-link ${
          result.id === id ? "active-preview" : ""
        }">
        <figure class="result-preview-figure">
            <img src="${result.image}" alt="${
          result.title
        }" class="result-preview-img">
        </figure>
        <div class="result-preview-description">
            <h4 class="result-preview-title">${result.title}</h4>
        </div>
        </a>
  </li>
         `;
      })
      .join("");
  }
}

export default new OrdersView();
