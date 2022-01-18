"use strict";
//File containing all common functions
import { async } from "regenerator-runtime";
import { TIMEOUT_SECS } from "./config.js";
//Timer function for slow requests
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long. Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const validateAndGetJson = async function (url) {
  try {
    // 1) Fetch recipe from url
    const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    //Assign the json object to a variable
    const data = await resp.json();

    //validate
    if (!resp.ok) {
      throw new Error(`${data.message} , ${resp.status}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
