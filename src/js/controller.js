//Importing everything from model
import * as model from "./model.js";
import { async } from "regenerator-runtime";
//Importing the receipieView as a default export
import receipeView from "./views/receipeView.js";
("use strict");
//Import from model

//Polyfilling everything except async/await
import "core-js/stable";
//Polyfilling asyn/await
import "regenerator-runtime/runtime";

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
    //Await the function when calling because its async and async functions return Promises
    //I got to wait the promise to handle it
    //Receipe is loaded here and is stored in the state object
    await model.loadReceipe(id);

    //2)RENDER RECEIPE
    //ReceipeView object will render and store this data in itself
    //Get all the data from step 1 and pass it into the render method
    receipeView.render(model.state.receipe);
  } catch (error) {
    console.log(error);
  }
};

//Initialization method
//Method which executes everything once the page is loaded
//Publisher Subscriber Pattern
const init = function () {
  receipeView.addHandlerRender(controlReceipies);
};

init();
