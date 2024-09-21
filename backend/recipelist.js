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
