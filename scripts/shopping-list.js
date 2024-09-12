let finalIngredientList = []
let finalQuantityList = []
let finalUnitList = []
let finalFinalList = [JSON.parse(localStorage.getItem('finalFinalList'))] || []
let shoppingHTML = ''




function populateRecipeShoppingList(){
  clearList = localStorage.getItem('fullHTML')
  clearList = ""
  localStorage.setItem('fullHTML', clearList)


  finalIngredientList = []
  finalQuantityList = []
  finalUnitList = []
  finalFinalList = []
  let addButton = document.getElementById('getIngredients')
  addButton.classList.remove('display-on')

  /*for (let i=0; i<shoppingRecipeList.length; i++){
    let ingredientsList = shoppingRecipeList[i].ingredients[0]
    let quantityList = shoppingRecipeList[i].ingredients[1]
    let unitsList = shoppingRecipeList[i].ingredients[2]
     for(let i=0; i<ingredientsList.length; i++){
      let separateIngredient = ingredientsList[i]
      let separateUnit = unitsList[i]
      let separateQuantity = quantityList[i]
      if (finalIngredientList.includes(separateIngredient) || finalIngredientList.includes(separateIngredient + 's') || finalIngredientList.includes(separateIngredient.substring(0, separateIngredient.length-1))){
        let exisitingIndex = finalIngredientList.indexOf(separateIngredient)
        if(finalUnitList[exisitingIndex] === unitsList[i]){
          finalQuantityList[exisitingIndex] = Number(finalQuantityList[exisitingIndex]) + Number(quantityList[i])
        } else {
          finalQuantityList.splice(exisitingIndex, 0, quantityList[i])
          finalUnitList.splice(exisitingIndex, 0, unitsList[i])
          finalIngredientList.splice(exisitingIndex, 0, separateIngredient)
          //finalQuantityList[exisitingIndex] = finalQuantityList[exisitingIndex] + String(quantityList[i])
          //finalUnitList[exisitingIndex] = finalUnitList[exisitingIndex] + String(unitsList[i])
        }
      } else{
        finalIngredientList.push(separateIngredient)
        finalUnitList.push(separateUnit)
        finalQuantityList.push(separateQuantity)
        
      }
    }
  }*/

  for (let v=0; v<shoppingRecipeList.length; v++){
    let ingredientsList = shoppingRecipeList[v].ingredients[0]
    let quantityList = shoppingRecipeList[v].ingredients[1]
    let unitsList = shoppingRecipeList[v].ingredients[2]
     loop1: for(let i=0; i<ingredientsList.length; i++){
      let separateIngredient = ingredientsList[i]
      let separateUnit = unitsList[i]
      let separateQuantity = quantityList[i]
      loop2: for(let t=0; t<finalIngredientList.length; t++){
        if(finalIngredientList[t] === separateIngredient || finalIngredientList[t] === (separateIngredient + 's') || finalIngredientList[t] === (separateIngredient.substring(0, separateIngredient.length-1))){
          if(finalUnitList[t] === separateUnit){
            finalQuantityList[t] = Number(finalQuantityList[t]) + Number(separateQuantity)
            continue loop1;
          } else {
            continue loop2;
          }}
        }
        finalIngredientList.push(separateIngredient)
        finalUnitList.push(separateUnit)
        finalQuantityList.push(separateQuantity)
        }
      }

  finalList()

}

function finalList(){
  for (let i=0; i<finalIngredientList.length; i++){
  let listItem = String(finalIngredientList[i]) +', ' + String(finalQuantityList[i]) + ' ' + String(finalUnitList[i])
  finalFinalList.push(listItem)
  }
localStorage.setItem('finalFinalList', JSON.stringify(finalFinalList))

}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}