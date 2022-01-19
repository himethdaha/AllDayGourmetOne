"use strict";
class SearchResultsView {
  //Private property
  //Form element as the parent element
  _parentEl = document.querySelector(".menu-search-form");

  //Method to get the value in the input field
  getQuery() {
    const queryValue = this._parentEl.querySelector(".input-item").value;
    //Clear on submit
    this._parentEl.querySelector(".input-item").value = "";
    return queryValue;
  }

  //Publisher method to the subscriber getAllReceipies
  addHandlerSearch(handler) {
    //Event listner handled on the submit event in the entire form
    this._parentEl.addEventListener("submit", function (e) {
      //Prevent default cos otherwise the page will reload on submit...Remember?
      e.preventDefault();
      handler();
    });
  }
}

//Export the object
export default new SearchResultsView();
