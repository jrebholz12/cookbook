
showShoppingListTitles()
let ingredientCategoryList = JSON.parse(localStorage.getItem('ingredientCategoryList'))
sortTabs('list', 'list')



/*let produceList = ['butternut', 'poblano', 'asparagus', 'cauliflower', 'fresh cilantro', 'fresh parsley', 'avocado', 'basil', 'bay leaf', 'bell pepper', 'butternut squash', 'carrot', 'celery', 'cilantro', 'cucumber', 'tomato', 'parsely', 'garlic', 'jalepeno', 'kale', 'lemon', 'lemon juice', 'lime',
 'lime juice', 'onion', 'mint', 'green onion', 'red bell pepper', 'rosemary', 'red onion', 'yellow onion', 'white onion', 'red potatoes', 'red potato',
  'shallot', 'spinach', 'broccolini', 'sweet potato', 'rhubarb', 'sage', 'tofu']
let pantryList = ['can', 'lentils', 'farro', 'tomato paste', 'diced tomatoes', 'rice', 'salsa', 'tortilla', 'pepita', 'mayonnaise', 'sriracha', 'spaghetti', 'linguine', 'pasta', 'noodle','vegetable broth']
let dairyList = ['milk', 'greek yogurt', 'cheese', 'parmesan', 'butter', 'half n half', 'creamer', 'sour cream', 'cream cheese', 'egg', 'heavy cream']
let meatList = ['steak', 'chicken', 'ground beef', 'ground sausage', 'turkey', 'meat', 'fish']
let bakingList = ['flour', 'vinegar', 'garlic powder', 'cinnamon', 'sugar', 'seasoning', 'worcestershire', 'salt', 'dried parsley', 'baking powder', 'corn starch', 'nuts', 'chili powder','cumin','olive oil','paprika','sherry vinegar','oregano', 'pepper']

let ingredientCategoryList = []
ingredientCategoryList.push(produceList)
ingredientCategoryList.push(pantryList)
ingredientCategoryList.push(dairyList)
ingredientCategoryList.push(meatList)
ingredientCategoryList.push(bakingList)
console.log(ingredientCategoryList)
localStorage.setItem('ingredientCategoryList', JSON.stringify(ingredientCategoryList))*/

let produceList = ingredientCategoryList[0] || []
let pantryList = ingredientCategoryList[1] || []
let dairyList = ingredientCategoryList[2] || []
let meatList = ingredientCategoryList[3] || []
let bakingList = ingredientCategoryList[4] || []


let maxLength = ''

getLength()
insertList()

let otherItemsId = document.getElementsByClassName('shopping-list-ingredient').length + 1


function getLength(){
  let lengthArray = []
  let length1 = produceList.length
  let length2 = pantryList.length
  let length3 = dairyList.length
  let length4 = meatList.length
  let length5 = bakingList.length
  lengthArray=[length1, length2, length3, length4, length5]
  maxLength = Math.max(...lengthArray)
}


function saveList(){
  let saveCount = document.getElementById('numberSaved').childElementCount
  console.log(saveCount)
  let saveContent = document.getElementById('fullPage')
  localStorage.setItem(`savedList${saveCount+1}`, JSON.stringify(saveContent))
  let showSaved = document.getElementById('numberSaved')
  let html = `${Date()}`
  showSaved.insertAdjacentHTML('beforeend', html)
}



function showShoppingListTitles(){
  let location = document.getElementById('shoppingListTitles')
  location.insertAdjacentHTML('beforeend', localStorage.getItem('shoppingListTitles'))
}

function deselectAll(){
  let checkArea = document.getElementsByClassName('shopping-list-ingredient')
  for(let i=0; i<checkArea.length;i++){
    let stringName = String(checkArea[1])
    let newIDCheck = document.getElementById(newID)
    if(newIDCheck.classList.includes('display-on')){
      newIDCheck.classList.remove('display-on')
    } else if(newIDCheck.classList.includes('display-off')){
      newIDCheck.classList.remove('display-off')
    } else{}
  }
}


function displayOtherItems(paragraph){
  let plusButton = document.getElementById(`otherPlusButton-${paragraph}`)
  let minusButton = document.getElementById(`otherMinusButton-${paragraph}`)
  let inputButton = document.getElementById(`otherInputBar-${paragraph}`)
  plusButton.classList.add('display-off')
  minusButton.classList.add('display-on')
  inputButton.classList.add('display-on')
  document.getElementById(`otherInputBar-${paragraph}`).focus()
}

function displayOffOtherItems(paragraph){
  let plusButton = document.getElementById(`otherPlusButton-${paragraph}`)
  let minusButton = document.getElementById(`otherMinusButton-${paragraph}`)
  let inputButton = document.getElementById(`otherInputBar-${paragraph}`)
  plusButton.classList.remove('display-off')
  minusButton.classList.remove('display-on')
  inputButton.classList.remove('display-on')
}

function displayOffBody(){
  let element = document.getElementsByClassName('display-on')
  element.classList.remove('display-on')
}

function addOtherItem(event, paragraph){
  if(event.key === "Enter"){
    let location = document.getElementById(`plusContainer-${paragraph}`)
    let item = document.getElementById(`otherInputBar-${paragraph}`)
    let html = //`<div onclick="editIngredient(${otherItemsId})" id="ing${otherItemsId}" class="shopping-list-ingredient">${item.value}</div>`
    
    `<div onmouseover="displayActionBar(${otherItemsId})" onmouseout="displayActionBarOff(${otherItemsId})" id="ing${otherItemsId}" class="shopping-list-ingredient">${item.value}<div id="actionBar${otherItemsId}" class="action-bar">
    <img src=icons/edit.png class="button-bar" onclick="editIngredient(${otherItemsId})">
    <div onmouseover="displayMoveBar(${otherItemsId})" onmouseout="displayMoveBarOff(${otherItemsId})"><img src=icons/move.png class="button-bar">
    <div id="${otherItemsId}moveList" class="move-list-container">
      <div onclick="makeTheMove('${otherItemsId}moveList1')" id="${otherItemsId}moveList1" class="move-list-category"></div>
      <div onclick="makeTheMove('${otherItemsId}moveList2')" id="${otherItemsId}moveList2" class="move-list-category"></div>
      <div onclick="makeTheMove('${otherItemsId}moveList3')" id="${otherItemsId}moveList3" class="move-list-category"></div>
      <div onclick="makeTheMove('${otherItemsId}moveList4')" id="${otherItemsId}moveList4" class="move-list-category"></div>
      <div onclick="makeTheMove('${otherItemsId}moveList5')" id="${otherItemsId}moveList5" class="move-list-category"></div>
    </div></div>
    <img src=icons/trash.png class="button-bar" onclick="deleteIngredient(${otherItemsId})">
    </div></div>`

    location.insertAdjacentHTML("beforebegin", html)
    otherItemsId++
    item.value = ''
    displayOffOtherItems(paragraph)
   } else{}
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)
}

function editIngredient(index){
  let location = document.getElementById(`ing${index}`)
  location.outerHTML = `<div id="ing${index}" class="shopping-list-ingredient">edit</div>`
  let html = `<input onkeydown="saveEdit(event, ${index})" id="editInput${index}" class="edit-input-bar" value="${location.innerText}">`
  location = document.getElementById(`ing${index}`)
  location.insertAdjacentHTML('beforeend', html)
  document.getElementById(`editInput${index}`).focus()
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)
  
}

function saveEdit(event, index){
  if(event.key === "Enter"){
  let permLocation = document.getElementById(`ing${index}`)
  let editLocation = document.getElementById(`editInput${index}`)
  permLocation.innerHTML = editLocation.value
  permLocation.outerHTML = `<div onmouseover="displayActionBar(${index})" onmouseout="displayActionBarOff(${index})" id="ing${index}" class="shopping-list-ingredient">${permLocation.innerHTML}<div id="actionBar${index}" class="action-bar">
    <img src=icons/edit.png class="button-bar" onclick="editIngredient(${index})">
    <div onmouseover="displayMoveBar(${index})" onmouseout="displayMoveBarOff(${index})"><img src=icons/move.png class="button-bar">
    <div id="${index}moveList" class="move-list-container">
      <div onclick="makeTheMove('${index}moveList1')" id="${index}moveList1" class="move-list-category"></div>
      <div onclick="makeTheMove('${index}moveList2')" id="${index}moveList2" class="move-list-category"></div>
      <div onclick="makeTheMove('${index}moveList3')" id="${index}moveList3" class="move-list-category"></div>
      <div onclick="makeTheMove('${index}moveList4')" id="${index}moveList4" class="move-list-category"></div>
      <div onclick="makeTheMove('${index}moveList5')" id="${index}moveList5" class="move-list-category"></div>
    </div></div>
    <img src=icons/trash.png class="button-bar" onclick="deleteIngredient(${index})">
    </div></div>`
  editLocation.remove
} else{}
//let fullHTML = document.getElementById('fullPage').innerHTML
//localStorage.setItem('fullHTML', fullHTML)
}

function makeTheMove(index){
  let location = document.getElementById(`${index}`)
  let moveLocation = location.innerText.toLowerCase()
  let fullItem = location.parentNode.parentNode.parentNode.parentNode
  let nameOfItemString = fullItem.innerText
  let nameOfItem = nameOfItemString.substring(0, nameOfItemString.indexOf(","))
  let originalCategory = location.parentNode.parentNode.parentNode.parentNode.parentNode.id
  originalCategory = originalCategory.substring(0, originalCategory.indexOf("L"))
  if(originalCategory !== 'other'){
    moveCategories(nameOfItem, originalCategory)
  }
    function moveCategories(name, original){
      let originalList = eval(original + 'List')
      loop1: for(let i = 0; i<originalList.length; i++){
        if(name === originalList[i]){
          originalList.splice(i, 1)
          i--
          continue loop1;
        }
      }
    }

  if(moveLocation !== 'other'){
    let newList = eval((moveLocation + 'List'))
    newList.push(nameOfItem) 
  }

  fullItem.remove()
  location = document.getElementById(`${index}`)
  let insertLocation = document.getElementById(`${moveLocation}ListTitle`)
  insertLocation.insertAdjacentElement('afterend', fullItem)
  ingredientCategoryList = []
  ingredientCategoryList.push(produceList)
  ingredientCategoryList.push(pantryList)
  ingredientCategoryList.push(dairyList)
  ingredientCategoryList.push(meatList)
  ingredientCategoryList.push(bakingList)
  localStorage.setItem('ingredientCategoryList', JSON.stringify(ingredientCategoryList)) 
}

function insertList(){  
  //let pastedit = localStorage.getItem('fullHTML')
  //if(pastedit = ""){
  finalFinalList = finalFinalList[0].sort()
  let location = ''
  loop1: for(let v=0; v<finalFinalList.length; v++){
    let html = `<div onmouseover="displayActionBar(${v})" onmouseout="displayActionBarOff(${v})" id="ing${v}" class="shopping-list-ingredient">${finalFinalList[v]}<div id="actionBar${v}" class="action-bar">
    <img src=icons/edit.png class="button-bar" onclick="editIngredient(${v})">
    <div onmouseover="displayMoveBar(${v})" onmouseout="displayMoveBarOff(${v})"><img src=icons/move.png class="button-bar">
    <div id="${v}moveList" class="move-list-container">
      <div onclick="makeTheMove('${v}moveList1')" id="${v}moveList1" class="move-list-category"></div>
      <div onclick="makeTheMove('${v}moveList2')" id="${v}moveList2" class="move-list-category"></div>
      <div onclick="makeTheMove('${v}moveList3')" id="${v}moveList3" class="move-list-category"></div>
      <div onclick="makeTheMove('${v}moveList4')" id="${v}moveList4" class="move-list-category"></div>
      <div onclick="makeTheMove('${v}moveList5')" id="${v}moveList5" class="move-list-category"></div>
    </div></div>
    <img src=icons/trash.png class="button-bar" onclick="deleteIngredient(${v})">
    </div></div>`
    let ingredient = finalFinalList[v]
    ingredient = ingredient.substring(0,ingredient.indexOf(","))
    
    loop2: for(let i=0; i<maxLength; i++){

      if(ingredient === produceList[i]){
        location = document.getElementById("plusContainer-produce")
        location.insertAdjacentHTML('beforebegin', html)
        continue loop1;
      } 

      if(ingredient === pantryList[i]){
        location = document.getElementById("plusContainer-pantry")
        location.insertAdjacentHTML('beforebegin', html)
        continue loop1;
      } 
      
      if(ingredient === dairyList[i]){
        location = document.getElementById("plusContainer-dairy")
        location.insertAdjacentHTML('beforebegin', html)
        continue loop1;
      } 

      if(ingredient === meatList[i]){
        location = document.getElementById("plusContainer-meat")
        location.insertAdjacentHTML('beforebegin', html)
        continue loop1;
      } 

      if(ingredient === bakingList[i]){
        location = document.getElementById("plusContainer-baking")
        location.insertAdjacentHTML('beforebegin', html)
        continue loop1;
      } 
        
      }

      location = document.getElementById("plusContainer-other")
      location.insertAdjacentHTML('beforebegin', html)

    }
   
    //document.getElementById('fullPage').innerHTML = pastedit
  }


function displayActionBar(index){
    let bar =document.getElementById(`actionBar${index}`)
    bar.classList.add('display-on')
}

function displayActionBarOff(index){
  let bar =document.getElementById(`actionBar${index}`)
  bar.classList.remove('display-on')
  let moveBar = document.getElementById(`${index}moveList`)
  if(moveBar.classList.contains('.display-on')){
    moveBar.classList.remove('display-on')
  }
}

function displayMoveBar(index){
  let bar = document.getElementById(`${index}moveList`)
  bar.classList.add('display-on')
  let childID = document.getElementById(`ing${index}`)
  let parentLocation = childID.parentNode.id
  let firstValue = document.getElementById(`${index}moveList1`)
  let secondValue = document.getElementById(`${index}moveList2`)
  let thirdValue = document.getElementById(`${index}moveList3`)
  let fourthValue = document.getElementById(`${index}moveList4`)
  let fifthValue = document.getElementById(`${index}moveList5`)
  if(parentLocation === 'produceList'){
    firstValue.innerText = 'Meat'
    secondValue.innerText = 'Pantry'
    thirdValue.innerText = 'Baking'
    fourthValue.innerText = 'Dairy'
    fifthValue.innerText = 'Other'
  } else if(parentLocation === 'meatList'){
    firstValue.innerText = 'Produce'
    secondValue.innerText = 'Pantry'
    thirdValue.innerText = 'Baking'
    fourthValue.innerText = 'Dairy'
    fifthValue.innerText = 'Other'
  } else if(parentLocation === 'pantryList'){
    firstValue.innerText = 'Produce'
    secondValue.innerText = 'Meat'
    thirdValue.innerText = 'Baking'
    fourthValue.innerText = 'Dairy'
    fifthValue.innerText = 'Other'
  } else if(parentLocation === 'bakingList'){
    firstValue.innerText = 'Produce'
    secondValue.innerText = 'Meat'
    thirdValue.innerText = 'Pantry'
    fourthValue.innerText = 'Dairy'
    fifthValue.innerText = 'Other'
  } else if(parentLocation === 'dairyList'){
    firstValue.innerText = 'Produce'
    secondValue.innerText = 'Meat'
    thirdValue.innerText = 'Pantry'
    fourthValue.innerText = 'Baking'
    fifthValue.innerText = 'Other'
  } else if(parentLocation === 'otherList'){
    firstValue.innerText = 'Produce'
    secondValue.innerText = 'Meat'
    thirdValue.innerText = 'Pantry'
    fourthValue.innerText = 'Baking'
    fifthValue.innerText = 'Dairy'
  }
}

function displayMoveBarOff(index){
 let bar =document.getElementById(`${index}moveList`)
 bar.classList.remove('display-on')
 let firstValue = document.getElementById(`${index}moveList1`)
  let secondValue = document.getElementById(`${index}moveList2`)
  let thirdValue = document.getElementById(`${index}moveList3`)
  let fourthValue = document.getElementById(`${index}moveList4`)
  let fifthValue = document.getElementById(`${index}moveList5`)
  firstValue.innerText = ''
  secondValue.innerText = ''
  thirdValue.innerText = ''
  fourthValue.innerText = ''
  fifthValue.innerText = ''
}



function deleteIngredient(index){
  let ingredient = document.getElementById(`ing${index}`)
  ingredient.remove()
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)

}

function recipeNames(){
  let location = document.getElementById('recipeNames')
  let quantMatrix = []
  loop1: for(let i = 0; i<groceryTitles.length; i++){
    let quantity = 1
    loop2: for(let t = i+1; t<groceryTitles.length; t++){
      if(groceryTitles[i] === groceryTitles[t]){
        quantity++
        groceryTitles.splice(t,1)
        t--
        continue;
      } else{continue;}
    }
    quantMatrix.push(quantity)
  }

  for(let i=0; i<groceryTitles.length; i++){
    if(quantMatrix[i] === 1){

    } else{
    let name = groceryTitles[i]
    groceryTitles[i] = `${name} x${quantMatrix[i]}`
    }
  }
  
  for(let i = 0; i<groceryTitles.length; i++){
  let html = `<div class="recipe-name">${groceryTitles[i]}</div>`
    location.insertAdjacentHTML("beforeend", html)
  }
}


/*function recipeNames(){
  let location = document.getElementById('recipeNames')
  console.log(groceryTitles)
   for(let i=0; i<groceryTitles.length;i++){
     let html = `<div class="recipe-name">${groceryTitles[i]}</div>`
     location.insertAdjacentHTML("beforeend", html)
   }
 }*/