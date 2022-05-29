import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import searchView from "./views/searchView.js";
import resaultsView from "./views/resaultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

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

    console.log("test search resaults");
    // updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    console.log("test bookmarks");

    // loading recipe
    console.log(id);
    await model.loadRecipe(id);

    console.log("test load recipe");

    // rendering recipe

    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
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
    //console.log(model.state.search.resaults);
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

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // displaying a spinner
    addRecipeView.renderSpinner();
    // upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    //render bookmark view

    bookmarksView.render(model.state.bookmarks);

    // change Id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      console.log("test time out");
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    //console.error("form error", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResaults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
