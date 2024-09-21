import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { auth, db } from './firebase.js'; // Ensure you are importing the auth and Firestore instances

export async function getRecipeList() {
  let recipeList = [];

  // Check if a user is signed in
  const user = auth.currentUser;
  if (user) {
    const recipeListDocRef = doc(db, 'users', user.uid, 'data', 'recipeList'); // Firestore doc path

    try {
      const recipeListDoc = await getDoc(recipeListDocRef);
      if (recipeListDoc.exists()) {
        recipeList = recipeListDoc.data().recipeList; // Retrieve the 'recipes' array
        console.log("Recipe list fetched from Firestore:", recipeList);
      } else {
        console.log("No recipeList found, initializing an empty list.");
        // Optionally initialize an empty recipeList if the doc doesn't exist
        await setDoc(recipeListDocRef, { recipeList: [] });
      }
    } catch (error) {
      console.error("Error fetching recipeList from Firestore:", error);
    }
  } else {
    console.log("No user is signed in. Cannot fetch recipe list.");
  }

  return recipeList;
}

export function transformRecipeList(recipeList) {
  return recipeList.map(recipe => {
    // Separate the ingredients into arrays for ingredient names, quantities, and units
    const ingredientNames = recipe.ingredients.map(ingredient => ingredient.ingredient);
    const ingredientQuantities = recipe.ingredients.map(ingredient => ingredient.quantity);
    const ingredientUnits = recipe.ingredients.map(ingredient => ingredient.unit);
    
    return {
      title: recipe.title,
      website: recipe.website,
      cuisine: recipe.cuisine,
      servings: recipe.servings,
      picture: recipe.picture,
      ingredients: [ingredientNames, ingredientQuantities, ingredientUnits]
    };
  });
}

export function formatForFirestore(ingredientCategoryList) {
  const formattedCategoryList = ingredientCategoryList.map((categoryList, index) => {
    return { category: `category${index + 1}`, ingredients: categoryList };
  });
  
  return formattedCategoryList;  // Return as a new variable name
}

export function revertFormattedCategoryList(formattedCategoryList) {
  const originalCategoryList = formattedCategoryList.map(item => item.ingredients);
  return originalCategoryList;  // You can use a different name here if needed
}

