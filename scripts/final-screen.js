//Imports needed functions from backend and global
import { getLastName } from "../backend/docs.js"
import { toggleDisplayState, showShoppingListTitles, addOtherItem } from "../backend/page-folders/backend-final-screen.js"
import { sortTabs } from "../backend/page-folders/global-js.js"
import { savePageToLocalStorage, showPageFromLocalStorage } from "../backend/recipelist.js"

//Start functions

//showPageFromLocalStorage()
showShoppingListTitles()
getLastName
sortTabs('list', 'list')


//Event Listeners
document.getElementById('windowPrint').addEventListener('click', function() {
  window.print();
});
//document.getElementById('homeTab').addEventListener('click', savePageToLocalStorage);
//document.getElementById('recipeBoxTab').addEventListener('click', savePageToLocalStorage);
//document.getElementById('cookBookTab').addEventListener('click', savePageToLocalStorage);
//document.getElementById('listTab').addEventListener('click', savePageToLocalStorage);

function setupEventListenersForCategory(category) {
  // Add event listeners for plus, minus, and input elements of a given category
  document.getElementById(`otherPlusButton-${category}`).addEventListener('click', () => toggleDisplayState(category, true));
  document.getElementById(`otherInputBar-${category}`).addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleDisplayState(category, true);
    }
  });
  document.getElementById(`otherMinusButton-${category}`).addEventListener('click', () => toggleDisplayState(category, false));
}

// Initialize event listeners for each category
['produce', 'meat', 'pantry', 'baking', 'dairy', 'other'].forEach(category => {
  setupEventListenersForCategory(category);
});

function setupAddOtherItemEventListeners(category) {
  document.getElementById(`otherInputBar-${category}`).addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addOtherItem(event, category);
    }
  });
}

// Initialize event listeners for each category
['produce', 'meat', 'pantry', 'baking', 'dairy', 'other'].forEach(category => {
  setupAddOtherItemEventListeners(category);
});









