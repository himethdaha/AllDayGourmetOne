"use strict";
import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { RES_PER_PAGE } from "./config.js";
import { validateAndGetJson } from "./helpers.js";
//////////////////////////////////// BUSINESS LOGIC////////////////////////////////////

//State object. Contains all the data I need to build the application
//The Controller will grab the receipe information out of here
export const state = {
  receipe: {},
  search: {
    query: "",
    results: [],
    //For pagination
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  orders: [],
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

    //Create the receipe Object from the receipe variable
    state.receipe = {
      id: receipe.id,
      title: receipe.title,
      image: receipe.image_url,
      servings: receipe.servings,
      cookingTime: receipe.cooking_time,
      ingredients: receipe.ingredients,
    };
    //If the loaded recipie id is the same as the id in one of the objects in the bookmarks array
    //Doing this so that once bookmarked, it won't be lost
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      //Flag that receipie as bookmarked
      state.receipe.bookmarked = true;
    } else {
      //Flag that receipie as NOT bookmarked
      state.receipe.bookmarked = false;
    }

    if (state.orders.some((order) => order.id === id)) {
      //Flag recipie as ordered
      state.receipe.ordered = true;
    } else {
      //Flaf receipe as NOT ordered
      state.receipe.ordered = false;
    }
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

    //Return a new array with new objects
    //Then store in the state
    //Store the data in state.results object
    state.search.results = data.data.recipes.map((rec) => {
      return { id: rec.id, title: rec.title, image: rec.image_url };
    });
    //Reset the page property back to one after loading the results
    state.search.page = 1;
  } catch (error) {
    //Throw the error so the controller can catch it
    throw error;
  }
};

//Function to get a set number of results per page
export const getSearchResultsInPage = function (page = state.search.page) {
  //Storing the page number in the state object
  state.search.page = page;
  //Start value
  const start = (page - 1) * state.search.resultsPerPage;
  //End value
  const end = page * state.search.resultsPerPage;

  //Returning all the results between start and end
  return state.search.results.slice(start, end);
};

//Function to update servings
export const updateServings = function (newServings) {
  //Loop through the recipies ingredients
  state.receipe.ingredients.forEach((ing) => {
    //For each ingredients quantity, change it based on the new servings portion
    ing.quantity = (ing.quantity * newServings) / state.receipe.servings;
  });

  //Update the servings in the object
  state.receipe.servings = newServings;
};

//Function to store bookmarks in the local storage
const storeBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

//Function to store orders in the local storage
const storeOrders = function () {
  localStorage.setItem("orders", JSON.stringify(state.orders));
};

//Function to add bookmark
//This function will receive a receipie and set it as a bookmark
export const addBookmark = function (recipe) {
  //Push recipie to the bookmarks array
  state.bookmarks.push(recipe);
  //If recipie same as the one in bookmarks array add new bookmarked property to it. This will help us show the receipie as a bookmark
  if (recipe.id === state.receipe.id) state.receipe.bookmarked = true;
  storeBookmarks();
};

//Function to remove the bookmar
export const removeBookmark = function (id) {
  //To get the index use findIndex as it retrieves the index of the first element that satisfies the condition
  const index = state.bookmarks.findIndex((el) => el.id === id);
  //Remove from the bookmarks array
  state.bookmarks.splice(index, 1);
  //Remove property booked from current receipie
  if (id === state.receipe.id) state.receipe.bookmarked = false;
  storeBookmarks();
};

//Function to add orders
//This function will recieve a receipe and set it as an order
export const addOrder = function (recipe) {
  state.orders.push(recipe);
  //If recipie same as the one in orders array add new ordered property to it. This will help us show the receipie as an order in the view
  if (recipe.id === state.receipe.id) state.receipe.ordered = true;
  storeOrders();
};

//Function to remove orders
export const removeOrder = function (id) {
  //Get the id by findIndex
  const index = state.orders.findIndex((el) => el.id === id);
  //Splice it in the array
  state.orders.splice(index, 1);
  //Remove property ordered from current recipie
  if (id === state.receipe.id) state.receipe.ordered = false;
  storeOrders();
};

//Initializer function to get the values from the storage
const init = function () {
  //Get the bookmarks string and convert it back to an object
  const bookmarkStore = localStorage.getItem("bookmarks");

  //Get the orders string and convert it back to an object
  const orderStore = localStorage.getItem("orders");

  //If there are stored bookmarks
  if (bookmarkStore) {
    //Parse the string and store it in the state
    state.bookmarks = JSON.parse(bookmarkStore);
  }

  //If there are stored orders
  if (orderStore) {
    //Parse the string and store it in the state
    state.orders = JSON.parse(orderStore);
  }
};

init();
