"use strict";
import { async } from "regenerator-runtime";
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
    // 1) Fetch recipe from url
    const resp = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    //Assign the json object to a variable
    const data = await resp.json();
    console.log(data);
    //validate
    if (!resp.ok) {
      throw new Error(`${data.message} , ${resp.status}`);
    }
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
    alert(error);
  }
};
