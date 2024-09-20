// Global Variables for list
//localStorage.setItem('ingredientCategoryList', JSON.stringify([['squash'], ['lentil'], ['milk'], ['steak'], ['flour'], ['wine']]));
let ingredientCategoryList = JSON.parse(localStorage.getItem('ingredientCategoryList')) || [['squash'], ['lentil'], ['milk'], ['steak'], ['flour'], ['wine']];
const [produceList, pantryList, dairyList, meatList, bakingList, otherList] = ingredientCategoryList;
let otherItemsId = document.getElementsByClassName('shopping-list-ingredient').length + 1;
let maxLength = '';
let finalFinalList = JSON.parse(localStorage.getItem('finalFinalList')) || [];

const listMap = {
  produceList: produceList,
  meatList: meatList,
  pantryList: pantryList,
  bakingList: bakingList,
  dairyList: dairyList,
  otherList: otherList
};


// Export Functions
export function getLength() {
  const lengthArray = [produceList.length, pantryList.length, dairyList.length, meatList.length, bakingList.length];
  maxLength = Math.max(...lengthArray);
}

export function saveList() {
  const saveCount = document.getElementById('numberSaved').childElementCount;
  const saveContent = document.getElementById('fullPage').innerHTML;
  localStorage.setItem(`savedList${saveCount + 1}`, JSON.stringify(saveContent));
  const showSaved = document.getElementById('numberSaved');
  showSaved.insertAdjacentHTML('beforeend', new Date().toString());
}

export function showShoppingListTitles() {
  const location = document.getElementById('shoppingListTitles');
  location.insertAdjacentHTML('beforeend', localStorage.getItem('shoppingListTitles'));
}

export function deselectAll() {
  const checkArea = document.getElementsByClassName('shopping-list-ingredient');
  Array.from(checkArea).forEach((el) => {
    el.classList.toggle('display-on');
    el.classList.toggle('display-off');
  });
}

export function displayOtherItems(paragraph) {
  toggleDisplayState(paragraph, true);
}

export function displayOffOtherItems(paragraph) {
  toggleDisplayState(paragraph, false);
}

function toggleDisplayState(paragraph, state) {
  const plusButton = document.getElementById(`otherPlusButton-${paragraph}`);
  const minusButton = document.getElementById(`otherMinusButton-${paragraph}`);
  const inputButton = document.getElementById(`otherInputBar-${paragraph}`);

  if (state) {
    plusButton.classList.add('display-off');
    minusButton.classList.add('display-on');
    inputButton.classList.add('display-on');
    inputButton.focus();
  } else {
    plusButton.classList.remove('display-off');
    minusButton.classList.remove('display-on');
    inputButton.classList.remove('display-on');
  }
}

export function addOtherItem(event, paragraph) {
  if (event.key === "Enter") {
    const location = document.getElementById(`plusContainer-${paragraph}`);
    const item = document.getElementById(`otherInputBar-${paragraph}`).value;
    const html = `
      <div id="ing${otherItemsId}" class="shopping-list-ingredient">${item}
        <div id="actionBar${otherItemsId}" class="action-bar">
          <img src="icons/edit.png" id="editIcon${otherItemsId}" class="button-bar">
          <div id="moveBar${otherItemsId}">
            <img src="icons/move.png" class="button-bar">
            <div id="${otherItemsId}moveList" class="move-list-container">
              ${[...Array(5).keys()].map(i => `<div id="${otherItemsId}moveList${i + 1}" class="move-list-category"></div>`).join('')}
            </div>
          </div>
          <img id="trashButton${otherItemsId}" src="icons/trash.png" class="button-bar">
        </div>
      </div>`;

    location.insertAdjacentHTML("beforebegin", html);

    // Add event listeners dynamically
    attachEventListeners(otherItemsId);
    otherItemsId++;
    document.getElementById(`otherInputBar-${paragraph}`).value = '';
    displayOffOtherItems(paragraph);
  }
}

function attachEventListeners(id) {
  const hoverElement = document.getElementById(`ing${id}`);
  hoverElement.addEventListener('mouseover', () => displayActionBar(id));
  hoverElement.addEventListener('mouseout', () => displayActionBarOff(id));

  const moveBar = document.getElementById(`moveBar${id}`);
  moveBar.addEventListener('mouseover', () => displayMoveBar(id));
  moveBar.addEventListener('mouseout', () => displayMoveBarOff(id));

  document.getElementById(`editIcon${id}`).addEventListener('click', () => editIngredient(id));
  [...Array(5).keys()].forEach(i => {
    document.getElementById(`${id}moveList${i + 1}`).addEventListener('click', () => makeTheMove(`${id}moveList${i + 1}`));
  });

  document.getElementById(`trashButton${id}`).addEventListener('click', () => deleteIngredient(id));
}

export function editIngredient(index) {
  const location = document.getElementById(`ing${index}`);
  const originalText = location.innerText;
  location.innerHTML = `<input id="editInput${index}" class="edit-input-bar" value="${originalText}">`;
  document.getElementById(`editInput${index}`).focus();
  document.getElementById(`editInput${index}`).addEventListener('keydown', (event) => saveEdit(event, index));
}

export function saveEdit(event, index) {
  if (event.key === "Enter") {
    const editLocation = document.getElementById(`editInput${index}`).value;
    const permLocation = document.getElementById(`ing${index}`);
    permLocation.innerHTML = editLocation;
    attachEventListeners(index); // Reattach the event listeners after editing
  }
}

export function makeTheMove(index) {
  const location = document.getElementById(index);

  // Log the index and element for debugging
  console.log(`Trying to find element with index: ${index}`);
  console.log('Found element:', location);

  if (!location) {
    console.error(`Element with index ${index} not found.`);
    return;
  }

  const moveLocation = location.innerText.toLowerCase().replace(' ', '') + 'List'; // Ensure correct moveLocation format
  const fullItem = location.closest('.shopping-list-ingredient');

  if (!fullItem) {
    console.error('Full item not found for ingredient');
    return;
  }

  const nameOfItem = fullItem.innerText.split(",")[0]; // Extract the item name before the comma
  const originalCategory = fullItem.closest('.category-list')?.id || ''; // Find the original category

  console.log(`Original Category: ${originalCategory}, Name of Item: ${nameOfItem}`);

  // Remove the item from the original category list
  if (originalCategory !== 'other') {
    moveCategories(nameOfItem, originalCategory); // Remove the item from the original list
  }

  // Add the item to the new category list
  const newList = listMap[moveLocation]; // Use listMap to access the correct list for the new category
  if (newList) {
    newList.push(nameOfItem);
    newList.sort(); // Optionally sort the list alphabetically
  } else {
    console.error(`List for ${moveLocation} not found.`);
  }

  // Update the DOM by moving the full item to the new category section
  const insertLocation = document.getElementById(`${moveLocation}Title`); // Correctly construct the new location ID
  if (insertLocation) {
    insertLocation.insertAdjacentElement('afterend', fullItem); // Insert the item in the new category
  } else {
    console.error(`Insert location for ${moveLocation}Title not found.`);
  }

  // Save the updated lists to localStorage
  updateIngredientCategoryList();
}

// Function to remove the item from the original list
function moveCategories(name, originalCategory) {
  const originalList = listMap[originalCategory]; // Use listMap to get the correct list for the original category

  // Check if originalList exists and is an array
  if (!Array.isArray(originalList)) {
    console.error(`Original list for category ${originalCategory} is not an array or not found.`);
    return;
  }

  // Find and remove the item from the original category list
  const index = originalList.indexOf(name);
  if (index > -1) {
    originalList.splice(index, 1);
  }
}

  // Function to update the ingredient category list in localStorage
  function updateIngredientCategoryList() {
  // Clear the existing contents of ingredientCategoryList
  ingredientCategoryList.length = 0;

  // Push the updated lists into the category array
  ingredientCategoryList.push(produceList, pantryList, dairyList, meatList, bakingList, otherList);

  // Save the updated ingredientCategoryList to localStorage
  localStorage.setItem('ingredientCategoryList', JSON.stringify(ingredientCategoryList));
}



export function deleteIngredient(index) {
  document.getElementById(`ing${index}`).remove();
}

export function recipeNames() {
  const location = document.getElementById('recipeNames');
  const quantMatrix = [];
  groceryTitles.forEach((title, i) => {
    let quantity = 1;
    for (let t = i + 1; t < groceryTitles.length; t++) {
      if (title === groceryTitles[t]) {
        quantity++;
        groceryTitles.splice(t, 1);
        t--;
      }
    }
    quantMatrix.push(quantity);
  });

  groceryTitles.forEach((title, i) => {
    if (quantMatrix[i] > 1) {
      groceryTitles[i] = `${title} x${quantMatrix[i]}`;
    }
  });

  groceryTitles.forEach(title => {
    location.insertAdjacentHTML("beforeend", `<div class="recipe-name">${title}</div>`);
  });
}

export function displayActionBar(index) {
  const bar = document.getElementById(`actionBar${index}`);
  if (bar) {
    bar.classList.add('display-on');
  }
}

export function displayActionBarOff(index) {
  const bar = document.getElementById(`actionBar${index}`);
  const moveBar = document.getElementById(`${index}moveList`);
  if (bar) {
    bar.classList.remove('display-on');
  }
  if (moveBar && moveBar.classList.contains('display-on')) {
    moveBar.classList.remove('display-on');
  }
}

export function insertList() {
  console.log(finalFinalList);

  // Check if finalFinalList is an array and has at least one item
  if (!Array.isArray(finalFinalList) || finalFinalList.length === 0) {
    console.error('finalFinalList is not an array or is empty.');
    return;
  }

  // If the first element is not an array, handle accordingly
  const sortedFinalList = Array.isArray(finalFinalList[0]) ? finalFinalList[0].sort() : finalFinalList.sort();

  let location = '';

  // Function to find the category for an ingredient by checking if it contains any keyword
  function findCategory(ingredient) {
    const lowerCaseIngredient = ingredient.toLowerCase();
    
    if (produceList.some(item => lowerCaseIngredient.includes(item.toLowerCase()))) {
      return document.getElementById("plusContainer-produce");
    } else if (pantryList.some(item => lowerCaseIngredient.includes(item.toLowerCase()))) {
      return document.getElementById("plusContainer-pantry");
    } else if (dairyList.some(item => lowerCaseIngredient.includes(item.toLowerCase()))) {
      return document.getElementById("plusContainer-dairy");
    } else if (meatList.some(item => lowerCaseIngredient.includes(item.toLowerCase()))) {
      return document.getElementById("plusContainer-meat");
    } else if (bakingList.some(item => lowerCaseIngredient.includes(item.toLowerCase()))) {
      return document.getElementById("plusContainer-baking");
    } else {
      return document.getElementById("plusContainer-other");
    }
  }

  // Loop through the sortedFinalList
  sortedFinalList.forEach((ingredient, v) => {
    // Generate HTML for each ingredient
    console.log(ingredient);
    console.log(produceList);
    
    const html = `
      <div id="ing${v}" class="shopping-list-ingredient">${ingredient}
        <div id="actionBar${v}" class="action-bar">
          <img src="icons/edit.png" id="editIcon${v}" class="button-bar">
          <div id="moveBar${v}">
            <img src="icons/move.png" class="button-bar">
            <div id="${v}moveList" class="move-list-container">
              ${[...Array(5).keys()].map(i => `<div id="${v}moveList${i + 1}" class="move-list-category"></div>`).join('')}
            </div>
          </div>
          <img id="trashButton${v}" src="icons/trash.png" class="button-bar">
        </div>
      </div>`;

    // Find the correct location based on whether the ingredient contains a word from the lists
    location = findCategory(ingredient);

    // Insert HTML before the correct location
    location.insertAdjacentHTML("beforebegin", html);

    // Add event listeners dynamically for each action
    attachEventListeners(v);
  });
}



export function displayMoveBar(index) {
  const bar = document.getElementById(`${index}moveList`);
  const ingredientElement = document.getElementById(`ing${index}`);

  // Check if the elements exist
  if (!bar || !ingredientElement) {
    console.error(`Elements for move bar or ingredient not found for index ${index}`);
    return;
  }

  // Use the closest category container and ensure it exists
  const parentCategory = ingredientElement.closest('.category-list');

  // Log ingredient element and parent category for debugging
  console.log('Ingredient Element:', ingredientElement);
  console.log('Parent Category:', parentCategory);

  if (!parentCategory) {
    console.error(`Parent category not found for ingredient element with index ${index}`);
    return;
  }

  const parentLocation = parentCategory.id;

  const categoryMap = {
    produceList: ['Meat', 'Pantry', 'Baking', 'Dairy', 'Other'],
    meatList: ['Produce', 'Pantry', 'Baking', 'Dairy', 'Other'],
    pantryList: ['Produce', 'Meat', 'Baking', 'Dairy', 'Other'],
    bakingList: ['Produce', 'Meat', 'Pantry', 'Dairy', 'Other'],
    dairyList: ['Produce', 'Meat', 'Pantry', 'Baking', 'Other'],
    otherList: ['Produce', 'Meat', 'Pantry', 'Baking', 'Dairy']
  };

  // Check if the parent location is valid and update the move list categories
  if (categoryMap[parentLocation]) {
    bar.classList.add('display-on');
    categoryMap[parentLocation].forEach((category, i) => {
      const categoryElement = document.getElementById(`${index}moveList${i + 1}`);
      if (categoryElement) {
        categoryElement.innerText = category;
      } else {
        console.error(`Move list category element not found for ${index}moveList${i + 1}`);
      }
    });
  } else {
    console.error(`Invalid parent location: ${parentLocation}`);
  }
}

export function displayMoveBarOff(index) {
  const bar = document.getElementById(`${index}moveList`);

  if (bar) {
    bar.classList.remove('display-on');

    // Clear the inner text of each move list category
    [...Array(5).keys()].forEach(i => {
      const categoryElement = document.getElementById(`${index}moveList${i + 1}`);
      if (categoryElement) {
        categoryElement.innerText = ''; // Clear the text content of each category
      } else {
        console.error(`Move list category element not found for ${index}moveList${i + 1}`);
      }
    });
  } else {
    console.error(`Move list bar not found for index ${index}`);
  }
}




