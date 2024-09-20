// Global Variables for list
let ingredientCategoryList = JSON.parse(localStorage.getItem('ingredientCategoryList')) || [['squash'], ['lentil'], ['milk'], ['steak'], ['flour'] ]
let produceList = ingredientCategoryList[0] || []
let pantryList = ingredientCategoryList[1] || []
let dairyList = ingredientCategoryList[2] || []
let meatList = ingredientCategoryList[3] || []
let bakingList = ingredientCategoryList[4] || []
let otherItemsId = document.getElementsByClassName('shopping-list-ingredient').length + 1
let maxLength = ''
let finalFinalList = [JSON.parse(localStorage.getItem('finalFinalList'))] || []


//Export Functions
export function getLength(){
  let lengthArray = []
  let length1 = produceList.length
  let length2 = pantryList.length
  let length3 = dairyList.length
  let length4 = meatList.length
  let length5 = bakingList.length
  lengthArray=[length1, length2, length3, length4, length5]
  maxLength = Math.max(...lengthArray)
}

export function saveList(){
  let saveCount = document.getElementById('numberSaved').childElementCount
  console.log(saveCount)
  let saveContent = document.getElementById('fullPage')
  localStorage.setItem(`savedList${saveCount+1}`, JSON.stringify(saveContent))
  let showSaved = document.getElementById('numberSaved')
  let html = `${Date()}`
  showSaved.insertAdjacentHTML('beforeend', html)
}

export function showShoppingListTitles(){
  let location = document.getElementById('shoppingListTitles')
  location.insertAdjacentHTML('beforeend', localStorage.getItem('shoppingListTitles'))
}

export function deselectAll(){
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

export function displayOtherItems(paragraph){
  let plusButton = document.getElementById(`otherPlusButton-${paragraph}`)
  let minusButton = document.getElementById(`otherMinusButton-${paragraph}`)
  let inputButton = document.getElementById(`otherInputBar-${paragraph}`)
  plusButton.classList.add('display-off')
  minusButton.classList.add('display-on')
  inputButton.classList.add('display-on')
  document.getElementById(`otherInputBar-${paragraph}`).focus()
}

export function displayOffOtherItems(paragraph){
  let plusButton = document.getElementById(`otherPlusButton-${paragraph}`)
  let minusButton = document.getElementById(`otherMinusButton-${paragraph}`)
  let inputButton = document.getElementById(`otherInputBar-${paragraph}`)
  plusButton.classList.remove('display-off')
  minusButton.classList.remove('display-on')
  inputButton.classList.remove('display-on')
}

export function displayOffBody(){
  let element = document.getElementsByClassName('display-on')
  element.classList.remove('display-on')
}

export function addOtherItem(event, paragraph){
  if(event.key === "Enter"){
    let location = document.getElementById(`plusContainer-${paragraph}`)
    let item = document.getElementById(`otherInputBar-${paragraph}`)
    let html =
    
    `<div id="ing${otherItemsId}" class="shopping-list-ingredient">${item.value}<div id="actionBar${otherItemsId}" class="action-bar">
    <img src=icons/edit.png id="editIcon${otherItemsId}" class="button-bar">
    <div id="moveBar${otherItemsId}"><img src=icons/move.png class="button-bar">
    <div id="${otherItemsId}moveList" class="move-list-container">
      <div id="${otherItemsId}moveList1" class="move-list-category"></div>
      <div id="${otherItemsId}moveList2" class="move-list-category"></div>
      <div id="${otherItemsId}moveList3" class="move-list-category"></div>
      <div id="${otherItemsId}moveList4" class="move-list-category"></div>
      <div id="${otherItemsId}moveList5" class="move-list-category"></div>
    </div></div>
    <img id="trashButton${otherItemsId}" src=icons/trash.png class="button-bar">
    </div></div>`

    location.insertAdjacentHTML("beforebegin", html)

    const hoverElement1 = document.getElementById(`ing${otherItemsId}`);
    hoverElement1.addEventListener('mouseover', () => displayActionBar(`${otherItemsId}`));
    hoverElement1.addEventListener('mouseout', () => displayActionBarOff(`${otherItemsId}`));

    const hoverElement2 = document.getElementById(`moveBar${otherItemsId}`);
    hoverElement2.addEventListener('mouseover', () => displayMoveBar(`${otherItemsId}`));
    hoverElement2.addEventListener('mouseout', () => displayMoveBarOff(`${otherItemsId}`));

    const newElement1 = document.getElementById(`editIcon${otherItemsId}`);
      newElement1.addEventListener('click', () => editIngredient(`${otherItemsId}`));

      const newElement2 = document.getElementById(`${otherItemsId}moveList1`);
      newElement2.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList1`));

      const newElement3 = document.getElementById(`${otherItemsId}moveList2`);
      newElement3.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList2`));

      const newElement4 = document.getElementById(`${otherItemsId}moveList3`);
      newElement4.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList3`));

      const newElement5 = document.getElementById(`${otherItemsId}moveList4`);
      newElement5.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList4`));

      const newElement6 = document.getElementById(`${otherItemsId}moveList5`);
      newElement6.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList5`));

      const newElement7 = document.getElementById(`trashButton${otherItemsId}`);
      newElement7.addEventListener('click', () => deleteIngredient(`${otherItemsId}`));


    otherItemsId++
    item.value = ''
    displayOffOtherItems(paragraph)
   } else{}
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)
}

export function editIngredient(index){
  let location = document.getElementById(`ing${index}`)
  location.outerHTML = `<div id="ing${index}" class="shopping-list-ingredient">edit</div>`
  let html = `<input onkeydown="saveEdit(event, ${index})" id="editInput${index}" class="edit-input-bar" value="${location.innerText}">`
  location = document.getElementById(`ing${index}`)
  location.insertAdjacentHTML('beforeend', html)
  document.getElementById(`editInput${index}`).focus()
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)
  
}

export function saveEdit(event, index){
  if(event.key === "Enter"){
  let permLocation = document.getElementById(`ing${index}`)
  let editLocation = document.getElementById(`editInput${index}`)
  permLocation.innerHTML = editLocation.value
  permLocation.outerHTML = `<div id="ing${otherItemsId}" class="shopping-list-ingredient">${item.value}<div id="actionBar${otherItemsId}" class="action-bar">
    <img src=icons/edit.png id="editIcon${otherItemsId}" class="button-bar">
    <div id="moveBar${otherItemsId}"><img src=icons/move.png class="button-bar">
    <div id="${otherItemsId}moveList" class="move-list-container">
      <div id="${otherItemsId}moveList1" class="move-list-category"></div>
      <div id="${otherItemsId}moveList2" class="move-list-category"></div>
      <div id="${otherItemsId}moveList3" class="move-list-category"></div>
      <div id="${otherItemsId}moveList4" class="move-list-category"></div>
      <div id="${otherItemsId}moveList5" class="move-list-category"></div>
    </div></div>
    <img id="trashButton${otherItemsId}" src=icons/trash.png class="button-bar">
    </div></div>`

    const hoverElement1 = document.getElementById(`ing${otherItemsId}`);
    hoverElement1.addEventListener('mouseover', () => displayActionBar(`${otherItemsId}`));
    hoverElement1.addEventListener('mouseout', () => displayActionBarOff(`${otherItemsId}`));

    const hoverElement2 = document.getElementById(`moveBar${otherItemsId}`);
    hoverElement2.addEventListener('mouseover', () => displayMoveBar(`${otherItemsId}`));
    hoverElement2.addEventListener('mouseout', () => displayMoveBarOff(`${otherItemsId}`));

    const newElement1 = document.getElementById(`editIcon${otherItemsId}`);
      newElement1.addEventListener('click', () => editIngredient(`${otherItemsId}`));

      const newElement2 = document.getElementById(`${otherItemsId}moveList1`);
      newElement2.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList1`));

      const newElement3 = document.getElementById(`${otherItemsId}moveList2`);
      newElement3.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList2`));

      const newElement4 = document.getElementById(`${otherItemsId}moveList3`);
      newElement4.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList3`));

      const newElement5 = document.getElementById(`${otherItemsId}moveList4`);
      newElement5.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList4`));

      const newElement6 = document.getElementById(`${otherItemsId}moveList5`);
      newElement6.addEventListener('click', () => makeTheMove(`${otherItemsId}moveList5`));

      const newElement7 = document.getElementById(`trashButton${otherItemsId}`);
      newElement7.addEventListener('click', () => deleteIngredient(`${otherItemsId}`));


  editLocation.remove
} else{}
//let fullHTML = document.getElementById('fullPage').innerHTML
//localStorage.setItem('fullHTML', fullHTML)
}

export function makeTheMove(index){
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

export function insertList(){  
  console.log(finalFinalList)
  finalFinalList = finalFinalList[0].sort()
  let location = ''
  loop1: for(let v=0; v<finalFinalList.length; v++){
    let html = `<div id="ing${v}" class="shopping-list-ingredient">${finalFinalList[v]}<div id="actionBar${v}" class="action-bar">
    <img src=icons/edit.png id="editIcon${v}" class="button-bar">
    <div id="moveBar${v}"><img src=icons/move.png class="button-bar">
    <div id="${v}moveList" class="move-list-container">
      <div id="${v}moveList1" class="move-list-category"></div>
      <div id="${v}moveList2" class="move-list-category"></div>
      <div id="${v}moveList3" class="move-list-category"></div>
      <div id="${v}moveList4" class="move-list-category"></div>
      <div id="${v}moveList5" class="move-list-category"></div>
    </div></div>
    <img id="trashButton${v}" src=icons/trash.png class="button-bar">
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
      location.insertAdjacentHTML("beforebegin", html)

      const hoverElement1 = document.getElementById(`ing${v}`);
      hoverElement1.addEventListener('mouseover', () => displayActionBar(`${v}`));
      hoverElement1.addEventListener('mouseout', () => displayActionBarOff(`${v}`));

      const hoverElement2 = document.getElementById(`moveBar${v}`);
      hoverElement2.addEventListener('mouseover', () => displayMoveBar(`${v}`));
      hoverElement2.addEventListener('mouseout', () => displayMoveBarOff(`${v}`));


    const newElement1 = document.getElementById(`editIcon${v}`);
      newElement1.addEventListener('click', () => editIngredient(`${v}`));

      const newElement2 = document.getElementById(`${v}moveList1`);
      newElement2.addEventListener('click', () => makeTheMove(`${v}moveList1`));

      const newElement3 = document.getElementById(`${v}moveList2`);
      newElement3.addEventListener('click', () => makeTheMove(`${v}moveList2`));

      const newElement4 = document.getElementById(`${v}moveList3`);
      newElement4.addEventListener('click', () => makeTheMove(`${v}moveList3`));

      const newElement5 = document.getElementById(`${v}moveList4`);
      newElement5.addEventListener('click', () => makeTheMove(`${v}moveList4`));

      const newElement6 = document.getElementById(`${v}moveList5`);
      newElement6.addEventListener('click', () => makeTheMove(`${v}moveList5`));

      const newElement7 = document.getElementById(`trashButton${v}`);
      newElement7.addEventListener('click', () => deleteIngredient(`${v}`));



    }
   
    //document.getElementById('fullPage').innerHTML = pastedit
  }

export function displayActionBar(index){
    let bar =document.getElementById(`actionBar${index}`)
    bar.classList.add('display-on')
}

export function displayActionBarOff(index){
  let bar =document.getElementById(`actionBar${index}`)
  bar.classList.remove('display-on')
  let moveBar = document.getElementById(`${index}moveList`)
  if(moveBar.classList.contains('.display-on')){
    moveBar.classList.remove('display-on')
  }
}

export function displayMoveBar(index){
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

export function displayMoveBarOff(index){
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

export function deleteIngredient(index){
  let ingredient = document.getElementById(`ing${index}`)
  ingredient.remove()
  //let fullHTML = document.getElementById('fullPage').innerHTML
  //localStorage.setItem('fullHTML', fullHTML)

}

export function recipeNames(){
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


