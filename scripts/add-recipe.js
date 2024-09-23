//Imports needed functions from backend and global
import { saveRecipe, printRecipe, deleteRecipe, addIngredient, populateRecipeBox, addField, previewImage, searchRecipes, showHelp } from '../backend/page-folders/backend-add-recipe.js'
import { getLastName } from '../backend/docs.js';
import { sortTabs } from "../backend/page-folders/global-js.js"
import { auth } from '../backend/firebase.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'


//On Start-up
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    // Handle the signed-in user and update the UI accordingly
  } else {
    console.log("No user is signed in.");
    // Redirect to login page if necessary
  }
});

getLastName()
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

document.getElementById('ingredientQuestion').addEventListener('mouseover', () => showHelp('ingredient'));
document.getElementById('ingredientQuestion').addEventListener('mouseout', () => showHelp('ingredient'));

document.getElementById('unitQuestion').addEventListener('mouseover', () => showHelp('unit'));
document.getElementById('unitQuestion').addEventListener('mouseout', () => showHelp('unit'));

document.getElementById('quantityQuestion').addEventListener('mouseover', () => showHelp('quantity'));
document.getElementById('quantityQuestion').addEventListener('mouseout', () => showHelp('quantity'));









