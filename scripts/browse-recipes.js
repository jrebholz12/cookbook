//Imports needed functions from backend and global
import { getLastName } from '../backend/docs.js';
import { importCuisines, populateRecipeShoppingList, hidePreview, ingredientSearch, setShoppingListTitles, sortAZ, sortNewToOld, sortOldToNew, sortRandom } from "../backend//page-folders/backend-browse-recipes.js"
import { sortTabs } from '../backend/page-folders/global-js.js';
import { clearPageFromLocalStorage } from '../backend/recipelist.js';

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

//document.getElementById('getIngredients').addEventListener('clic', clearPageFromLocalStorage)
document.getElementById('getIngredients').addEventListener('click', populateRecipeShoppingList)

document.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.getElementById('filterButton');
  const filterMain = document.querySelector('.filter-main');

  // Toggle visibility on click
  filterButton.addEventListener('click', () => {
    filterMain.classList.toggle('visible');
  });

  // Show on hover
  filterButton.addEventListener('mouseover', () => {
    filterMain.classList.add('visible');
  });

  // Hide on mouseout if not clicked
  filterButton.addEventListener('mouseout', () => {
    if (!filterMain.classList.contains('clicked')) {
      filterMain.classList.remove('visible');
    }
  });
});







