import { doc, getDoc, updateDoc, arrayRemove, setDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';


// Global variable for recipeList
let recipeList = [];

// Function to get the recipe list from Firestore or initialize it if it doesn't exist
export async function getRecipeList(user) {
  if (user) {
    const userDocRef = doc(db, 'users', user.uid, 'data', 'recipeList');

    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        recipeList = data.recipeList || []; // Get the recipe list or set as an empty array if it doesn't exist
        console.log('User recipes:', recipeList);

        if (recipeList.length > 0) {
          console.log('Recipes found');
        } else {
          console.log('No recipes found, initializing with an empty list.');
        }
        populateRecipeBox(); // Call populateRecipeBox after data is loaded
      } else {
        console.log("No recipeList document found for this user, initializing with an empty list.");
        recipeList = [];
        await setDoc(userDocRef, { recipeList: recipeList });
        populateRecipeBox(); // Populate empty list
      }

    } catch (error) {
      console.error("Error fetching recipeList from Firestore: ", error);
    }

  } else {
    console.log("No user is signed in.");
  }
}

// Call this function when the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    getRecipeList(user); // Fetch the user's recipes after they sign in
  } else {
    console.log("No user is signed in.");
  }
});

// Global Variables for adding a recipe
let fullRecipe = {};
let title = '';
let website = '';
let cuisine = '';
let servings = '';
let picture = '';
let ingredientList = [];
let quantityList = [];
let unitList = [];
let numberList = 0;
let i = 0;

let unitInputList = ['g','tsp', 'ea', 'can', 'bunch', 'tbs', 'quart', 'gallon', 'oz', 'clove', 'cup', 'loaf', 'slice', 'lb', 'pack', 'bunch', 'jar'];


//Start export functions

export function searchRecipes() {
  const searchText = document.getElementById('cutting-search').value.toLowerCase();
  
  recipeList.forEach((recipe, i) => {
      const recipeElement = document.getElementById(`existingRecipe${i}`);
      if (recipe.title.toLowerCase().includes(searchText)) {
          recipeElement.classList.remove('display-off');
      } else {
          recipeElement.classList.add('display-off');
      }
  });

  console.log(searchText); // Keep logging if needed
}



export function addField(event, field) {
  const recipeInput = document.getElementById(`id-${field}`);
  const recipeField = document.querySelector(`.${field}-onscreen`);

  if ((event.key === "Enter" || event.key === 'Tab') && recipeInput.value.trim()) {
    event.preventDefault();

    const fieldValue = recipeInput.value.toLowerCase();
    fullRecipe[field] = fieldValue;

    if (field === 'picture') {
      // If the field is 'picture', trigger previewImage to show the image
      previewImage();
    } else if (recipeField) {
      // If it's not the picture field, update the onscreen field with formatted text
      recipeField.innerHTML = formatField(field, fieldValue);
    }

    // Focus on the next input field based on the current field
    const nextField = getNextField(field);
    if (nextField) {
      document.getElementById(nextField).focus();
    }
  }
}


function formatField(field, value) {
  const formattedValue = toTitleCase(value);
  const formatMap = {
    title: () => formattedValue,
    website: () => ` / ${formattedValue}`,
    cuisine: () => `(${formattedValue})`,
    servings: () => `- ${formattedValue} servings`,
  };
  
  return formatMap[field] ? formatMap[field]() : value;
}

function getNextField(currentField) {
  const fieldOrder = ['title', 'website', 'cuisine', 'servings', 'picture', 'quantity'];
  const currentIndex = fieldOrder.indexOf(currentField);
  return currentIndex >= 0 && currentIndex < fieldOrder.length - 1
    ? `id-${fieldOrder[currentIndex + 1]}`
    : null;
}




export function printRecipe(){
  window.print()
}

export function previewImage() {
  const imageURL = document.getElementById('id-picture').value.trim();
  const location = document.getElementById('pictureInputContainer');
  const existingImage = document.getElementById('imageUpload');

  if (imageURL) {
    const html = `<img id="imageUpload" src="${imageURL}" class="image-preview">`;

    // If an existing image is already uploaded, replace it
    if (existingImage) {
      existingImage.remove();
    }

    // Insert new image after the container
    location.insertAdjacentHTML('afterend', html);

    // Update picture in the recipe object
    picture = imageURL;
    fullRecipe.picture = imageURL;

  } else {
    console.log('Error: Image URL is empty.');
  }

  console.log(fullRecipe);
}


export function enterPreviewImage(event) {
  if (['Enter', 'Tab'].includes(event.key)) {
    previewImage();
  }
}


export async function deleteRecipe() {
  const recipeName = toTitleCase(title); // Assuming `title` is globally available
  console.log(title);

  // Check if the user is signed in
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, 'users', user.uid, 'data', 'recipeList');

    try {
      // Find the recipe in the recipeList
      const recipeIndex = recipeList.findIndex(recipe => recipe.title === title);

      if (recipeIndex > -1) {
        if (confirm(`Are you sure you want to delete ${recipeName} from your recipe box?`)) {
          // Remove the recipe from Firestore
          const recipeToDelete = recipeList[recipeIndex]; // This will be an object
          
          await updateDoc(userDocRef, {
            recipeList: arrayRemove(recipeToDelete) // Use arrayRemove to delete the specific recipe object
          });

          alert(`${recipeName} has been removed.`);
          location.reload();
        }
      } else {
        alert(`${recipeName} is not in your recipe box.`);
      }

    } catch (error) {
      console.error('Error deleting recipe: ', error);
      alert('Failed to delete the recipe. Please try again.');
    }

  } else {
    console.log("No user is signed in.");
    alert('You must be signed in to delete a recipe.');
  }
}



export function populateRecipeBox() {
  const location = document.getElementById('recipeBoxList');

  if (!location) {
    console.error('Recipe box list element not found');
    return;
  }

  console.log('Running populateRecipeBox');

  // Ensure recipeList is populated
  if (!Array.isArray(recipeList) || recipeList.length === 0) {
    console.log('No recipes found.');
    location.innerHTML = '';
    return;
  }

  // Sort the recipe titles alphabetically and get the corresponding indexes
  const alphabetList = recipeList.map(recipe => recipe.title).sort();
  const indexList = alphabetList.map(title => recipeList.findIndex(recipe => recipe.title === title));

  // Clear any existing HTML content in the recipe box
  location.innerHTML = '';

  indexList.forEach(index => {
    const recipeTitle = toTitleCase(recipeList[index].title);

    // Create HTML structure for each recipe dynamically
    const recipeElement = document.createElement('div');
    recipeElement.id = `existingRecipe${index}`;
    recipeElement.className = 'recipe-box-recipe';
    recipeElement.innerText = recipeTitle;

    // Add the recipe element to the DOM
    location.appendChild(recipeElement);

    // Add event listener for the newly created element
    recipeElement.addEventListener('click', () => showExistingRecipe(index));
  });
}



export function showExistingRecipe(index) {
  const existingRecipe = recipeList[index];
  if (!existingRecipe) return;

  // Clear previous values
  fullRecipe = { ...existingRecipe };
  title = existingRecipe.title;
  website = existingRecipe.website;
  cuisine = existingRecipe.cuisine;
  servings = existingRecipe.servings;
  picture = existingRecipe.picture;
  
  ingredientList = [];
  quantityList = [];
  unitList = [];
  
  numberList = 0;

  document.getElementById('deleteButton').classList.add('display-on');

  // Update form fields
  document.getElementById('id-title').value = toTitleCase(title);
  document.getElementById('id-website').value = toTitleCase(website);
  document.getElementById('id-cuisine').value = toTitleCase(cuisine);
  document.getElementById('id-servings').value = servings;
  document.getElementById('id-picture').value = picture;

  document.querySelector('.title-onscreen').innerHTML = toTitleCase(title);
  document.querySelector('.website-onscreen').innerHTML = '/' + toTitleCase(website);
  document.querySelector('.cuisine-onscreen').innerHTML = `(${toTitleCase(cuisine)})`;
  document.querySelector('.servings-onscreen').innerHTML = `- ${servings} servings`;

  // Clear existing ingredients and add new ones
  clearIngredients();
  existingRecipe.ingredients.forEach((ingredientObj, i) => {
    // Get ingredient, quantity, and unit from each object
    const { ingredient, quantity, unit } = ingredientObj;

    // Add the values to their respective arrays
    ingredientList.push(ingredient);
    quantityList.push(quantity);
    unitList.push(unit);

    // Display the ingredient on the page
    displayIngredient(i, ingredient, quantity, unit);
  });

  console.log(ingredientList);
}



function clearIngredients() {
  ['ingredient', 'unit', 'quantity', 'ingredient2id', 'unit2id', 'quantity2id', 'ingredient3id', 'unit3id', 'quantity3id'].forEach(id => {
    const column = document.getElementById(id);
    while (column.firstChild) {
      column.removeChild(column.firstChild);
    }
  });
}

function displayIngredient(index, ingredient, quantity, unit) {
  const ingredientLocation = index < 10 ? 'ingredient' : index < 20 ? 'ingredient2id' : 'ingredient3id';
  const quantityLocation = index < 10 ? 'quantity' : index < 20 ? 'quantity2id' : 'quantity3id';
  const unitLocation = index < 10 ? 'unit' : index < 20 ? 'unit2id' : 'unit3id';

  // Create ingredient element
  const ingredientDiv = document.createElement('div');
  ingredientDiv.id = `ingredient${index}`;
  ingredientDiv.classList.add('list-text');
  ingredientDiv.textContent = toTitleCase(ingredient);

  // Create quantity element with delete button
  const quantityDiv = document.createElement('div');
  quantityDiv.id = `quantity${index}`;
  quantityDiv.classList.add('list-text');
  
  const deleteButton = document.createElement('div');
  deleteButton.classList.add('delete-ingredient');
  deleteButton.textContent = 'x';
  deleteButton.addEventListener('click', () => deleteIngredient(index));

  quantityDiv.appendChild(deleteButton);
  quantityDiv.append(toTitleCase(quantity));

  // Create unit element
  const unitDiv = document.createElement('div');
  unitDiv.id = `unit${index}`;
  unitDiv.classList.add('list-text');
  unitDiv.textContent = unit.toLowerCase();

  // Append elements to their respective containers
  document.getElementById(ingredientLocation).appendChild(ingredientDiv);
  document.getElementById(quantityLocation).appendChild(quantityDiv);
  document.getElementById(unitLocation).appendChild(unitDiv);
}



export function addIngredient(event) {
  const ingredientInput = document.querySelector('.input-ingredient');
  const quantityInput = document.querySelector('.input-quantity');
  const unitInput = document.querySelector('.input-unit');

  // Check if the event is triggered by Enter, Space, or Tab and quantity is filled but unit is missing
  if (["Enter", " ", "Tab"].includes(event.key) && quantityInput.value && !unitInput.value) {
    event.preventDefault();
    document.getElementById('id-unit').focus();
    return;
  }

  // Check if the event is triggered and unit is valid, but ingredient is missing
  if (["Enter", " ", "Tab"].includes(event.key) && quantityInput.value && unitInputList.includes(unitInput.value) && !ingredientInput.value) {
    event.preventDefault();
    document.getElementById('id-ingredient').focus();
    return;
  }

  // If all fields are filled (ingredient, quantity, and unit), add the ingredient to the lists
  if (["Enter", "Tab"].includes(event.key) && ingredientInput.value && quantityInput.value && unitInput.value) {
    event.preventDefault();

    const ingredient = ingredientInput.value.trim().toLowerCase();
    const quantity = quantityInput.value.trim().toLowerCase();
    const unit = unitInput.value.trim().toLowerCase();

    // Add to the lists
    ingredientList.push(ingredient);
    quantityList.push(quantity);
    unitList.push(unit);

    // Determine the location to append based on the numberList
    const columnIndex = numberList < 10 ? '' : numberList < 20 ? '2id' : '3id';

    // Generate and insert the HTML for quantity, unit, and ingredient
    appendIngredientHTML(numberList, ingredient, quantity, unit, columnIndex);

    // Clear the input fields
    ingredientInput.value = '';
    quantityInput.value = '';
    unitInput.value = '';

    // Increment the number of ingredients and focus on the quantity field
    numberList++;
    document.getElementById('id-quantity').focus();
  }
}

function appendIngredientHTML(index, ingredient, quantity, unit, columnSuffix) {
  const quantityLocation = document.getElementById(`quantity${columnSuffix}`);
  const unitLocation = document.getElementById(`unit${columnSuffix}`);
  const ingredientLocation = document.getElementById(`ingredient${columnSuffix}`);

  const quantityDiv = document.createElement('div');
  quantityDiv.id = `quantity${index}`;
  quantityDiv.classList.add('list-text');

  const deleteButton = document.createElement('div');
  deleteButton.classList.add('delete-ingredient');
  deleteButton.textContent = 'x';
  deleteButton.dataset.index = index; // Store the index in the button's data attribute

  // Add an event listener to the delete button
  deleteButton.addEventListener('click', deleteIngredient);

  quantityDiv.appendChild(deleteButton);
  quantityDiv.appendChild(document.createTextNode(toTitleCase(quantity)));

  const unitDiv = document.createElement('div');
  unitDiv.id = `unit${index}`;
  unitDiv.classList.add('list-text');
  unitDiv.textContent = unit.toLowerCase();

  const ingredientDiv = document.createElement('div');
  ingredientDiv.id = `ingredient${index}`;
  ingredientDiv.classList.add('list-text');
  ingredientDiv.textContent = toTitleCase(ingredient);

  // Append elements to the DOM
  ingredientLocation.appendChild(ingredientDiv);
  quantityLocation.appendChild(quantityDiv);
  unitLocation.appendChild(unitDiv);
}



export function deleteIngredient(event) {
  // Get the index from the delete button's data attribute
  const index = event.target.dataset.index;

  const unitElement = document.getElementById(`unit${index}`);
  const quantityElement = document.getElementById(`quantity${index}`);
  const ingredientElement = document.getElementById(`ingredient${index}`);

  if (!unitElement || !quantityElement || !ingredientElement) {
    console.log('Ingredient elements not found.');
    return;
  }

  const ingredientText = ingredientElement.innerText.toLowerCase();
  const unitText = unitElement.innerText.toLowerCase();

  const ingredientIndex = ingredientList.findIndex((ingredient, i) =>
    ingredient === ingredientText && unitList[i] === unitText
  );

  if (ingredientIndex > -1) {
    // Remove the ingredient from the arrays
    ingredientList.splice(ingredientIndex, 1);
    unitList.splice(ingredientIndex, 1);
    quantityList.splice(ingredientIndex, 1);

    // Remove the corresponding elements from the DOM
    ingredientElement.remove();
    quantityElement.remove();
    unitElement.remove();

    // Decrement the number of ingredients
    numberList--;

    console.log('Ingredient removed:', ingredientList);
    console.log('Updated Unit List:', unitList);
    console.log('Updated Quantity List:', quantityList);

    // Focus back on the quantity input
    document.getElementById('id-quantity').focus();
  } else {
    console.log('Ingredient not found in the list.');
  }
}





export function addToList(input){
  let location = document.getElementById(`${input}`)
  let html = `<div class="list-text">${input}</div>`
  location.insertAdjacentHTML("beforeend", html)
}

export async function saveRecipe() {
  const requiredFields = ['title', 'website', 'cuisine', 'servings', 'picture'];

  // Check if all required fields are filled
  for (const field of requiredFields) {
    if (!fullRecipe[field] || fullRecipe[field].trim() === '') {
      alert('Missing entries. Fill out fields on the left and try again.');
      return;
    }
  }

  // Convert ingredients into an array of objects
  const ingredients = ingredientList.map((ingredient, index) => ({
    ingredient: ingredient,
    quantity: quantityList[index],
    unit: unitList[index]
  }));

  const newRecipe = {
    title: fullRecipe.title,
    cuisine: fullRecipe.cuisine,
    servings: fullRecipe.servings,
    picture: fullRecipe.picture,
    website: fullRecipe.website,
    ingredients: ingredients // Store ingredients as an array of objects
  };

  const user = auth.currentUser;

  if (!user) {
    alert('You must be signed in to save a recipe.');
    return;
  }

  // Reference to the Firestore document
  const userDocRef = doc(db, 'users', user.uid, 'data', 'recipeList');

  try {
    // Check if the document exists
    const docSnap = await getDoc(userDocRef);

    let recipeList = [];

    if (docSnap.exists()) {
      recipeList = docSnap.data().recipeList || [];
    }

    // Check if the recipe title already exists
    const existingRecipeIndex = recipeList.findIndex(recipe => recipe.title === fullRecipe.title);
    if (existingRecipeIndex > -1) {
      if (confirm('A recipe with this title already exists. Do you want to overwrite it?')) {
        recipeList[existingRecipeIndex] = newRecipe;
      } else {
        return;
      }
    } else {
      recipeList.push(newRecipe);
    }

    // Save the updated recipeList back to Firestore (creating the document if it doesn't exist)
    await setDoc(userDocRef, { recipeList: recipeList }, { merge: true });

    alert('Recipe saved successfully!');
    clearRecipeForm();
  } catch (error) {
    console.error('Error saving recipe:', error);
    alert('Failed to save recipe. Please try again.');
  }
}

function clearRecipeForm() {
  document.querySelector(`.recipe-list-container`).innerHTML = '';
  document.querySelector(`.input-title`).value = '';
  document.querySelector(`.input-website`).value = '';
  document.querySelector(`.input-cuisine`).value = '';
  document.querySelector(`.input-picture`).value = '';
  document.querySelector(`.input-servings`).value = '';

  fullRecipe = {};
  ingredientList = [];
  quantityList = [];
  unitList = [];
  numberList = 0;
  //alert('Form cleared');
  location.reload();
}



export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}