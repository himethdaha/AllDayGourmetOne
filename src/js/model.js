"use strict";
import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { validateAndGetJson } from "./helpers.js";
//////////////////////////////////// BUSINESS LOGIC////////////////////////////////////

//State object
//The Controller will grab the receipe information out of here
export const state = {
  receipe: {},
};

//Function to grab the receipe from the API
//This function will change the state object
export const loadReceipe = async function (id) {
  try {
    // 1) Fetch recipe from url and validate it
    const data = await validateAndGetJson(`${API_URL}/${id}`);
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
    console.error(`☠️☠️☠️ ${error} ☠️☠️☠️`);
  }
};
