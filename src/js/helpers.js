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
    //Throw the error so the promise is rejected and the model can catch it
    throw error;
  }
};

export const numberToFraction = function (amount) {
  // This is a whole number and doesn't need modification.
  if (parseFloat(amount) === parseInt(amount)) {
    return amount;
  }
  // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
  const gcd = function (a, b) {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const len = amount.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = amount * denominator;
  var divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  let base = 0;
  // In a scenario like 3/2, convert to 1 1/2
  // by pulling out the base number and reducing the numerator.
  if (numerator > denominator) {
    base = Math.floor(numerator / denominator);
    numerator -= base * denominator;
  }
  amount = Math.floor(numerator) + "/" + Math.floor(denominator);
  if (base) {
    amount = base + " " + amount;
  }
  return amount;
};
