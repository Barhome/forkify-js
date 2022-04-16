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
    console.log(state.recipe);
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
