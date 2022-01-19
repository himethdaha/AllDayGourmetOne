//Importing everything from model
import * as model from "./model.js";
import { async } from "regenerator-runtime";
//Importing the receipieView as a default export
import receipeView from "./views/receipeView.js";
//Importing the SearchResultsView as a default export
import searchResultsView from "./views/searchResultsView.js";
//Importing the view for the results after a search
import asideResultsView from "./views/asideResultsView.js";
//Importing the view for the pagination buttons
import pagination from "./views/pagination.js";
("use strict");
//Import from model

//Polyfilling everything except async/await
import "core-js/stable";
//Polyfilling asyn/await
import "regenerator-runtime/runtime";
import pagination from "./views/pagination.js";

//Implementing parcels HMR
if (module.hot) {
  module.hot.accept();
}

const parentElement = document.querySelector(".searched-item");

//Function to get a receipe
//handler function in subscriber-publisher design pattern
const controlReceipies = async function () {
  try {
    //Get the hash from the window url
    //slice off the hash from the url
    const id = window.location.hash.slice(1);
    console.log(id);
    //When loading without an id it gives an error
    //To stop that do a guard clause
    if (!id) return;

    //1)CALL THE LOAD RECEIPE FUNCTION
    //Await  the function when calling because its async and async functions return Promises
    //I got to wait the promise to handle it
    //Receipe is loaded here and is stored in the state object. Hence, no need to store in a variable
    await model.loadReceipe(id);

    //2)RENDER RECEIPE
    //ReceipeView object will render and store this data in itself
    //Get all the data from step 1 and pass it into the render method
    receipeView.render(model.state.receipe);
  } catch (error) {
    //Rendering the error
    //No need to pass the error message, cos the receipeView should handle all things related to the UI
    receipeView.renderError();
  }
};

//Function to get all the searched receipies
//Subscriber for the publisher addHandlerSearch
const getAllReceipies = async function () {
  try {
    //Get the query value from the method inside the getQuery in searchResultsView
    const query = searchResultsView.getQuery();
    if (!query) return;
    //No need to store in a variable cos all this does is manipulate the state object
    await model.loadAllReceipies(query);
    //Here the results rendered are for the 1st page
    asideResultsView.render(model.getSearchResultsInPage());
    //Render the pagination buttons below the search results
    //Have to pass in the entire search object for the render method
    pagination.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

//Controller executed on pagination button click
const btnPagination = function (pageNo) {
  //Render the new results using getSeachResultsInPage
  //This method is insdie the asideResultsView which loops through all the results and render the data
  //REMEMBER??..
  asideResultsView.render(model.getSearchResultsInPage(pageNo));
  //Render the pagination buttons
  pagination.render(model.state.search);
};

//Controller function for updating the servings
const controlServings = function (newServings) {
  //Update servings in the model. Hence, the state
  model.updateServings(newServings);
  //Update the view
  receipeView.render(model.state.receipe);
};

//Initialization method
//Method which executes everything once the page is loaded
//Publisher Subscriber Pattern
const init = function () {
  receipeView.addHandlerRender(controlReceipies);
  receipeView.addHandlerServings(controlServings);
  searchResultsView.addHandlerSearch(getAllReceipies);
  pagination.addhandlerPagination(btnPagination);
};

init();
