//import { async } from "regenerator-runtime";
import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper";
export const state = {
  recipe: {},
  search: {
    query: "",
    resaults: [],
    page: 1,
    resaultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// function to change state.recipe and the controller will grab it.
export const loadRecipe = async function (id) {
  try {
    data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //console.log(state.recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResaults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.resaults = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // fixing a bug as we need to reset page to avoid starting on old page at a new search occurs.
    state.search.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchResaultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resaultsPerPage;
  const end = page * state.search.resaultsPerPage;
  return state.search.resaults.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQW = (oldQW * newServings) / state.recipe.servings; ex: (2*8)/4
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as a bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  //delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id == id);
  state.bookmarks.splice(index, 1);

  // mark current recipe as not a bookmark

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
