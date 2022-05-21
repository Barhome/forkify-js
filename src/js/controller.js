import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resaultsView from "./views/resaultsView.js";
import bookmarksView from "./views/bookmarksView.js";
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

    // update results view to mark selected search result without rerendering the resault view to avoid reloading the images which means less http requests and less work on the browser.

    resaultsView.update(model.getSearchResaultsPage());
    bookmarksView.update(model.state.bookmarks);

    // loading recipe

    await model.loadRecipe(id);

    // rendering recipe

    recipeView.render(model.state.recipe);
    //test
    //controlServings();
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

const controlServings = function (newServings) {
  // update recipe servings in state

  model.updateServings(newServings);

  // update the recipe view with new servings

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);

  //update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResaults);
  paginationView.addHandlerClick(controlPagination);
};

init();
