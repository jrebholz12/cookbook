
let recipeList = JSON.parse(localStorage.getItem('recipeList')) || []
//localStorage.setItem('recipeList', JSON.stringify(recipeList))
//localStorage.setItem('recipeListBackup2', JSON.stringify(recipeList))
//localStorage.setItem('recipeListBackup3', JSON.stringify(recipeList))
//localStorage.setItem('recipeListBackup4', JSON.stringify(recipeList))
//recipeList.splice(21, 3)
//localStorage.setItem('recipeList', JSON.stringify(recipeList))
let shoppingRecipeList = [JSON.parse(localStorage.getItem('shoppingRecipeList'))] || []
let fullRecipe = {}
let title = ''
let website = ''
let cuisine = ''
let servings = ''
let picture = ''
let ingredientList = []
let quantityList = []
let unitList = []
let numberList = 0

let unitInputList = ['g','tsp', 'ea', 'can', 'bunch', 'tbs', 'quart', 'gallon', 'oz', 'clove', 'cup', 'loaf', 'slice', 'lb', 'pack', 'bunch', 'jar']


console.log(JSON.stringify(recipeList))
//recipeList.splice(42, 1)
//localStorage.setItem('recipeList', JSON.stringify(recipeList))

populateRecipeBox()
sortTabs('recipeBox', 'recipe-box')
console.log(recipeList)

function searchRecipes(){
  let searchtext = document.getElementById('cutting-search').value
  for(let i=0; i<recipeList.length; i++){
    if(recipeList[i].title.includes(searchtext)){
      if(document.getElementById(`existingRecipe${i}`).classList.contains('display-off')){
        document.getElementById(`existingRecipe${i}`).classList.remove('display-off')
      }
    } else{
      document.getElementById(`existingRecipe${i}`).classList.add('display-off')
    }
    console.log(searchtext)
  } 
    
 

  }


function addField(event, field){
  let recipeInput = document.querySelector(`.input-${field}`)
  let recipeField = document.querySelector(`.${field}-onscreen`)
  if((event.key === "Enter" || event.key === 'Tab') && recipeInput.value !== ''){
    event.preventDefault() 
    if(field === 'title'){
      title = recipeInput.value.toLowerCase()
      recipeField.innerHTML = toTitleCase(recipeInput.value)
      fullRecipe.title = recipeInput.value.toLowerCase()
      document.getElementById('id-website').focus()

    } else if(field === 'website'){
      website = recipeInput.value
      recipeField.innerHTML = ' / ' + toTitleCase(recipeInput.value)
      fullRecipe.website = recipeInput.value.toLowerCase()
      document.getElementById('id-cuisine').focus()

    } else if(field === 'cuisine'){
      cuisine = recipeInput.value.toLowerCase()
      recipeField.innerHTML = '(' + toTitleCase(recipeInput.value) + ')'
      fullRecipe.cuisine = recipeInput.value.toLowerCase()
      document.getElementById('id-servings').focus()

    } else if(field === 'servings'){
      servings = recipeInput.value
      recipeField.innerHTML = '-' + ' ' + toTitleCase(recipeInput.value) + ' ' + 'servings'
      fullRecipe.servings = recipeInput.value.toLowerCase()
      document.getElementById('id-picture').focus()

    } else if(field === 'picture'){
      picture = recipeInput.value
      fullRecipe.picture = recipeInput.value
      document.getElementById('id-quantity').focus()
}
}
}

function printRecipe(){
  window.print()
}

function previewImage(){
  let imageURL = document.getElementById('id-picture')
  imageURL = imageURL.value
  let location = document.getElementById('pictureInputContainer')
  let html = `<img id="imageUpload" src="${imageURL}" class="image-preview">`
  if(imageURL !== ''){
    if(document.getElementById('imageUpload') !== null){
      document.getElementById('imageUpload').remove()
      location.insertAdjacentHTML('afterend', html)
      picture = imageURL
      fullRecipe.picture = imageURL
    } else{
    location.insertAdjacentHTML('afterend', html)
    picture = imageURL
    fullRecipe.picture = imageURL
    }
  } else {
    console.log('problem')
  }
  console.log(fullRecipe)
}

function enterPreviewImage(event){
  if(event.key === 'Enter' || event.key === 'Tab' ){
    previewImage()
  }
}

function deleteRecipe(){
  let recipeName = toTitleCase(title)
  console.log(title)
  loop1: for(let i = 0; i<recipeList.length; i++){
    if(recipeList[i].title === title){
      if(confirm(`Are you sure you want to delete ${recipeName} from your recipe box?`) === true){
        recipeList.splice(i, 1)
        localStorage.setItem('recipeList', JSON.stringify(recipeList))
        alert(`${recipeName} has been removed.`)
        location.reload()
        return
      } else {}
    } else {continue loop1}
      
    }  
    alert(`${recipeName} is not in your recipe box.`)   
    
  }


function populateRecipeBox(){
  let location = document.getElementById('recipeBoxList')
  let alphabetList = []
  let indexList = []
  for(let i=0; i<recipeList.length; i++){
    let AZtitle = recipeList[i].title
    alphabetList.push(AZtitle)
  }
  alphabetList.sort()
  console.log(alphabetList)
  loop1: for(let i=0; i<alphabetList.length; i++){
    loop2: for(let z=0; z<recipeList.length; z++){
      if(alphabetList[i] === recipeList[z].title){
        indexList.push(`${z}`)
        continue loop1;
      } else{
        continue loop2;
      }
    }  
  }

  for(let i = 0; i<recipeList.length; i++){
    let recipeTitle = recipeList[indexList[i]].title
    recipeTitle = toTitleCase(recipeTitle)
    let html = `<div id=existingRecipe${indexList[i]} onclick="showExistingRecipe(${indexList[i]})" class="recipe-box-recipe">${recipeTitle}</div>`
    location.insertAdjacentHTML('beforeend', html)
  }
}

function showExistingRecipe(index){
  fullRecipe = {}
  title = ''
  website = ''
  cuisine = ''
  servings = ''
  picture = ''

  ingredientList = []
  quantityList = []
  unitList = []
  numberList=0

  document.getElementById('deleteButton').classList.add('display-on')
  

  let firstColumn = document.getElementById('ingredient').childElementCount
  let secondColumn = document.getElementById('ingredient2id').childElementCount
  let thirdColumn = document.getElementById('ingredient3id').childElementCount
  
  if(firstColumn>0){
    for(let i = 0; i < firstColumn; i++){
      document.getElementById('ingredient').firstChild.remove()
      document.getElementById('unit').firstChild.remove()
      document.getElementById('quantity').firstChild.remove()
    }
  } 
  if(secondColumn>0){
    for(let i = 0; i < secondColumn; i++){
      document.getElementById('ingredient2id').firstChild.remove()
      document.getElementById('unit2id').firstChild.remove()
      document.getElementById('quantity2id').firstChild.remove()
    }
  }

  if(thirdColumn>0){
    for(let i = 0; i < thirdColumn; i++){
      document.getElementById('ingredient3id').firstChild.remove()
      document.getElementById('unit3id').firstChild.remove()
      document.getElementById('quantity3id').firstChild.remove()
    }
  }

  let recipeTitle = document.getElementById(`existingRecipe${index}`).innerHTML
  recipeTitle = recipeTitle.toLowerCase()
  let existingRecipe = []
  for(let i = 0; i<recipeList.length; i++){
    if(recipeTitle === recipeList[i].title){
      existingRecipe = recipeList[i]
      break;
    } else{
      continue;
    }
  }
  title = existingRecipe.title.toLowerCase()
  website = existingRecipe.website.toLowerCase()
  cuisine = existingRecipe.cuisine.toLowerCase()
  servings = existingRecipe.servings.toLowerCase()
  picture = existingRecipe.picture
  document.getElementById('id-title').value = toTitleCase(title)
  document.getElementById('id-website').value = toTitleCase(website)
  document.getElementById('id-cuisine').value = toTitleCase(cuisine)
  document.getElementById('id-servings').value = servings
  document.getElementById('id-picture').value = picture
  document.querySelector('.title-onscreen').innerHTML = toTitleCase(title)
  document.querySelector('.website-onscreen').innerHTML = '/' + toTitleCase(website)
  document.querySelector('.cuisine-onscreen').innerHTML = '(' + toTitleCase(cuisine) + ')'
  document.querySelector('.servings-onscreen').innerHTML = '-' + ' ' + servings + ' ' + 'servings'

  for(let i=0; i<existingRecipe.ingredients[0].length; i++){
    let ingredient = existingRecipe.ingredients[0][i]
    let quantity = existingRecipe.ingredients[1][i]
    let unit = existingRecipe.ingredients[2][i]
    let ingredientLocation = ''
    let quantityLocation = ''
    let unitLocation = ''
    let ingredientHTML = `<div id="ingredient${i}" class="list-text">${toTitleCase(ingredient)}</div>`
    let quantityHTML = `<div id="quantity${i}" class="list-text"><div onclick="deleteIngredient(${i})" class="delete-ingredient">x</div>${toTitleCase(quantity)}</div>`
    let unitHTML =  `<div id="unit${i}" class="list-text">${unit.toLowerCase()}</div>`
    numberList++
    if(i<10){
      quantityLocation = document.getElementById('quantity')
      unitLocation = document.getElementById('unit')
      ingredientLocation = document.getElementById('ingredient')
    } else if(i<20) {
      quantityLocation = document.getElementById('quantity2id')
      unitLocation = document.getElementById('unit2id')
      ingredientLocation = document.getElementById('ingredient2id')
    } else {
      quantityLocation = document.getElementById('quantity3id')
      unitLocation = document.getElementById('unit3id')
      ingredientLocation = document.getElementById('ingredient3id')
    }
    
    ingredientList.push(ingredient)
    quantityList.push(quantity)
    unitList.push(unit)
    ingredientLocation.insertAdjacentHTML('beforeend', ingredientHTML)
    unitLocation.insertAdjacentHTML('beforeend', unitHTML)
    quantityLocation.insertAdjacentHTML('beforeend', quantityHTML)  
  }
  console.log(ingredientList)
  console.log()

}

function addIngredient(event){
  let ingredientInput = document.querySelector('.input-ingredient')
  let quantityInput = document.querySelector('.input-quantity')
  let unitInput = document.querySelector('.input-unit')

  if((event.key === "Enter" || event.key == " " || event.key === 'Tab') && quantityInput.value !== '' && unitInput.value === ''){
    event.preventDefault() 
    document.getElementById('id-unit').focus()
  } else if((event.key === "Enter" || event.key == " " || event.key === 'Tab') && quantityInput.value !== '' && unitInputList.includes(unitInput.value) && ingredientInput.value === ''){
   event.preventDefault()
    document.getElementById('id-ingredient').focus()
  }

  if((event.key === "Enter" || event.key === 'Tab') && ingredientInput.value !== '' && quantityInput.value !== '' && unitInput.value !== ''){
    event.preventDefault() 
    let ingredient = ingredientInput.value.toLowerCase()
    let quantity = quantityInput.value.toLowerCase()
    let unit = unitInput.value.toLowerCase()
    ingredientList.push(ingredient)
    quantityList.push(quantity)
    unitList.push(unit)
    let location = ''
    
    if(numberList<10){
      location = document.getElementById('quantity')
    } else if(numberList<20) {
      location = document.getElementById('quantity2id')
    } else {
      location = document.getElementById('quantity3id')
    }
   
    let html = `<div id="quantity${numberList}" class="list-text"><div onclick="deleteIngredient(${numberList})" class="delete-ingredient">x</div>${toTitleCase(quantity)}</div>`
    location.insertAdjacentHTML("beforeend", html)

    if(numberList<10){
      location = document.getElementById('unit')
    } else if(numberList<20) {
      location = document.getElementById('unit2id')
    } else {
      location = document.getElementById('unit3id')
    }

    html = `<div id="unit${numberList}" class="list-text">${unit.toLowerCase()}</div>`
    location.insertAdjacentHTML("beforeend", html)

    if(numberList<10){
      location = document.getElementById('ingredient')
    } else if(numberList<20) {
      location = document.getElementById('ingredient2id')
    } else {
      location = document.getElementById('ingredient3id')
    }

    html = `
    <div id="ingredient${numberList}" class="list-text">${toTitleCase(ingredient)}</div>
    `
    location.insertAdjacentHTML("beforeend", html)

    ingredientInput.value = ''  
    quantityInput.value = ''  
    unitInput.value = ''  

    numberList++

    document.getElementById('id-quantity').focus()
}
}

function deleteIngredient(index){

  let unit = document.getElementById(`unit${index}`)
  let quantity = document.getElementById(`quantity${index}`)
  let ingredient = document.getElementById(`ingredient${index}`)
  console.log(ingredientList)
  console.log(unitList)
  console.log(quantityList)

  for(let i =0; i<ingredientList.length; i++){
    if(ingredientList[i] === ingredient.innerText.toLowerCase() && unitList[i] === unit.innerText.toLowerCase()){
      ingredientList.splice(i, 1)
      unitList.splice(i, 1)
      quantityList.splice(i, 1)
      break;
    } else{
      console.log('not found')
      continue;
    }
  }

  ingredient.remove()
  quantity.remove()
  unit.remove()

  numberList = numberList -1
  
  console.log(ingredientList)
  console.log(unitList)
  console.log(quantityList)

  document.getElementById('id-quantity').focus()
}



function addToList(input){
  const location = document.getElementById(`${input}`)
  let html = `<div class="list-text">${input}</div>`
  location.insertAdjacentHTML("beforeend", html)
}

function saveRecipe(){
  if(title === '' || website === '' || cuisine === '' || servings === '' || picture === '' ){
    alert('Missing entries. Fill out fields on left and try again.')
    return;
  }

  for(let i = 0; i<recipeList.length; i++){
    if(recipeList[i].title === title){
      if(confirm('There is already a recipe saved with this name. Saving will overwrite - Is that ok?') === true){
        recipeList[i].title = title
        recipeList[i].website = website
        recipeList[i].cuisine = cuisine
        recipeList[i].picture = picture
        recipeList[i].servings = servings
        recipeList[i].ingredients[0] = ingredientList
        recipeList[i].ingredients[1] = quantityList
        recipeList[i].ingredients[2] = unitList
        localStorage.setItem('recipeList', JSON.stringify(recipeList));
        clearTheRest()
        return;
      } else {return}
    }
  }

  if(confirm('Are you sure you are ready to save this recipe?') === false){
    return;
  }

  fullRecipe.title = title
  fullRecipe.cuisine = cuisine
  fullRecipe.servings = servings
  fullRecipe.picture = picture
  fullRecipe.website = website
  fullRecipe.ingredients = [ingredientList, quantityList, unitList]
  recipeList.push(fullRecipe)
  localStorage.setItem('recipeList', JSON.stringify(recipeList));
  clearTheRest()

  function clearTheRest(){
    document.querySelector(`.recipe-list-container`).innerHTML = ''
    document.querySelector(`.input-title`).value = ''
    document.querySelector(`.input-website`).value = ''
    document.querySelector(`.input-cuisine`).value = ''
    document.querySelector(`.input-picture`).value = ''
    document.querySelector(`.input-servings`).value = ''
    fullRecipe = {}
    title = ''
    website = ''
    ingredientList = []
    quantityList = []
    unitList = []
    i = 0
    alert('Recipe Saved!')
    location.reload()
  }
}


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




