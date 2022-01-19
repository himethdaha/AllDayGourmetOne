"use strict";
import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { validateAndGetJson } from "./helpers.js";
//////////////////////////////////// BUSINESS LOGIC////////////////////////////////////

//State object. Contains all the data I need to build the application
//The Controller will grab the receipe information out of here
export const state = {
  receipe: {},
  search: {
    query: "",
    results: [],
  },
};

//Function to grab the receipe from the API
//This function will change the state object
export const loadReceipe = async function (id) {
  try {
    // 1) Fetch recipe from url and validate it
    //returned response from the method is stored
    const data = await validateAndGetJson(`${API_URL}${id}`);
    //Get the meal object into my receipe variable
    let receipe = data.data.recipe;
    console.log(receipe);

    //Create the receipe Object from the receipe variable
    state.receipe = {
      id: receipe.id,
      title: receipe.title,
      image: receipe.image_url,
      servings: receipe.servings,
      cookingTime: receipe.cooking_time,
      ingredients: receipe.ingredients,
    };
  } catch (error) {
    //Throw error so the controller can catch it
    throw error;
  }
};

//Method to load all searched results
export const loadAllReceipies = async function (query) {
  try {
    //Store the query in state.query
    state.search.query = query;

    //store the promise
    const data = await validateAndGetJson(`${API_URL}?search=${query}`);
    console.log(data);

    //Return a new array with new objects
    //Then store in the state
    //Store the data in state.results object
    state.search.results = data.data.recipes.map((rec) => {
      return { id: rec.id, title: rec.title, image: rec.image_url };
    });
  } catch (error) {
    //Throw the error so the controller can catch it
    throw error;
  }
};
