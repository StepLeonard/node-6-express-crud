// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()
// this function reads the recipes file
// and returns all the recipes
async function getAllRecipes() {
  // read the recipes-data.json file
  const data = await fs.readFile("recipes-data.json", "utf8");

  // turn the JSON text into JavaScript objects
  const parsedRecipes = JSON.parse(data);

  // return all the recipes
  return parsedRecipes;
}

// 2. getOneRecipe(index)
// this function gets one recipe using its index
async function getOneRecipe(index) {
  // read the recipes file
  const data = await fs.readFile("recipes-data.json", "utf8");

  // convert the JSON text into JavaScript objects
  const parsedRecipes = JSON.parse(data);

  // return the recipe at the given index
  return parsedRecipes[index];
}

// 3. getAllRecipeNames()
// this function returns only the names of all recipes
async function getAllRecipeNames() {
  // read the recipes file
  const data = await fs.readFile("recipes-data.json", "utf8");

  // convert the JSON into JavaScript objects
  const parsedRecipes = JSON.parse(data);

  // create a new array that only contains the recipe names
  const recipeNames = parsedRecipes.map((recipe) => {
    return recipe.name;
  });

  // return the list of recipe names
  return recipeNames;
}

// 4. getRecipesCount()
// this function counts how many recipes exist
async function getRecipesCount() {
  // read the recipes file
  const data = await fs.readFile("recipes-data.json", "utf8");

  // convert JSON text into JavaScript objects
  const parsedRecipes = JSON.parse(data);

  // return the number of recipes in the array
  return parsedRecipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
// this endpoint sends back all recipes
app.get("/get-all-recipes", async (req, res) => {
  // call the helper function
  const recipes = await getAllRecipes();

  // send the recipes back as JSON
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
// this endpoint sends one recipe based on the index in the URL
app.get("/get-one-recipe/:index", async (req, res) => {
  // get the index from the URL
  const index = Number(req.params.index);

  // call the helper function
  const recipe = await getOneRecipe(index);

  // send the recipe back as JSON
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
// this endpoint returns only the names of recipes
app.get("/get-all-recipe-names", async (req, res) => {
  // call the helper function
  const recipeNames = await getAllRecipeNames();

  // send the recipe names as JSON
  res.json(recipeNames);
});

// 4. GET /get-recipes-count
// this endpoint tells us how many recipes exist
app.get("/get-recipes-count", async (req, res) => {
  // call the helper function
  const count = await getRecipesCount();

  // send the number of recipes back
  res.json(count);
});
