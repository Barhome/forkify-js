import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resaultsView from "./views/resaultsView.js";
import paginationView from "./views/paginationView.js";

// activating hot module from parcel

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe

    await model.loadRecipe(id);

    // rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResaults = async function () {
  try {
    resaultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search resaults
    await model.loadSearchResaults(query);

    // 3) Render resaults
    console.log(model.state.search.resaults);
    //resaultsView.render(model.state.search.resaults);
    resaultsView.render(model.getSearchResaultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render resaults

  resaultsView.render(model.getSearchResaultsPage(goToPage));

  // 2) Render initial pagination buttons

  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResaults);
  paginationView.addHandlerClick(controlPagination);
};

init();
