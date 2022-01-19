import parentView from "./parentView.js";
("use strict");
class AsideResultsView extends parentView {
  //Adding the parent element
  _parentElement = document.querySelector(".result-list");
  _errorMessage =
    "No food items found. Please check your spellings or try again! 🙃";

  //Markup for the results
  _generateMarkup() {
    //data returns an array of strings
    //Therefore got to join
    return this._data
      .map((result) => {
        return `
        <li class="result-preview">
            <a href="#${result.id}" class="result-preview-link">
            <figure class="result-preview-figure">
                <img src="${result.image}" alt="${result.title}" class="result-preview-img">
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

export default new AsideResultsView();
