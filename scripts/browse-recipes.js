//Imports needed functions from backend and global
import { getLastName } from '../backend/docs.js';
import { importCuisines, populateRecipeShoppingList, hidePreview, ingredientSearch, setShoppingListTitles, sortAZ, sortNewToOld, sortOldToNew, sortRandom } from "../backend//page-folders/backend-browse-recipes.js"
import { sortTabs } from '../backend/page-folders/global-js.js';

//Start functions
sortTabs('cookBook', 'cookbook')
getLastName()
sortRandom()
importCuisines()

//Event Listeners
document.getElementById('AZSort').addEventListener('click', sortAZ)
document.getElementById('OldNewSort').addEventListener('click', sortOldToNew)
document.getElementById('NewOldSort').addEventListener('click', sortNewToOld)
document.getElementById('randomSort').addEventListener('click', sortRandom)

document.getElementById('search-bar-input').addEventListener('keydown', (event)=>ingredientSearch(event))
document.getElementById('exitButton').addEventListener('click', hidePreview)

document.getElementById('getIngredients').addEventListener('click', populateRecipeShoppingList)






