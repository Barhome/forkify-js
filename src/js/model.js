//import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helper";
export const state = {
  recipe: {},
};

// function to change state.recipe and the controller will grab it.
export const loadRecipe = async function (id) {
  try {
    data = await getJSON(`${API_URL}/${id}`);
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
  } catch (err) {
    console.log(`${err}: error modal failed to load recipe data`);
    throw err;
  }
};
