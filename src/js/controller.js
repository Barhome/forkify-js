import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    console.log(recipeView);
    recipeView.renderSpinner();

    // loading recipe

    await model.loadRecipe(id);

    // rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

["load", "hashchange"].forEach((event) =>
  addEventListener(event, controlRecipes)
);

console.log(recipeView);
const test = new recipeView();
console.log(test);
