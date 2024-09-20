//Imports needed functions from backend and global
import { showExistingRecipe, saveRecipe, printRecipe, deleteRecipe, addIngredient, populateRecipeBox, addField, previewImage, searchRecipes } from '../backend/backend-add-recipe.js'
import { getLastName, sortTabs } from '../backend/global-js.js';

//On Start-up
populateRecipeBox()
sortTabs('recipeBox', 'recipe-box');


//Event Listeners
document.getElementById('id-title').addEventListener('keydown', (event) => addField(event, 'title'));
document.getElementById('id-website').addEventListener('keydown', (event) => addField(event, 'website'));
document.getElementById('id-cuisine').addEventListener('keydown', (event) => addField(event, 'cuisine'));
document.getElementById('id-servings').addEventListener('keydown', (event) => addField(event, 'servings'));
document.getElementById('id-picture').addEventListener('keydown', (event) => addField(event, 'picture'));

document.getElementById('previewImageUpload').addEventListener('click', previewImage)

document.getElementById('id-quantity').addEventListener('keydown', (event)=> addIngredient(event))
document.getElementById('id-unit').addEventListener('keydown', (event)=> addIngredient(event))
document.getElementById('id-ingredient').addEventListener('keydown', (event)=> addIngredient(event))

document.getElementById('saveButton').addEventListener('click', saveRecipe)
document.getElementById('printButton').addEventListener('click', printRecipe)
document.getElementById('deleteButton').addEventListener('click', deleteRecipe)

document.getElementById('cutting-search').addEventListener('keyup', searchRecipes)







