"use strict";

const { object } = require("webidl-conversions");

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
    //Fetch info from url
    const resp = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
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
      ingredients: receipe.ingredients,
      servings: receipe.servings,
    };
  } catch (error) {
    console.log(error);
  }
};

getItem();
