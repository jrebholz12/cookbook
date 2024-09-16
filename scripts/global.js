function sortTabs(page, style){
  getLastName()
  let home = document.getElementById('homeTab')
  let recipeBox = document.getElementById('recipeBoxTab')
  let cookBook = document.getElementById('cookBookTab')
  let list = document.getElementById('listTab')
    if(home.classList.contains('home-tab')){
      home.classList.remove('home-tab')
    } else if(recipeBox.classList.contains('recipe-box-tab')){
      recipeBox.classList.remove('recipe-box-tab')
    } else if(cookBook.classList.contains('cookbook-tab')){
      cookBook.classList.remove('cookbook-tab')
    } else if(list.classList.contains('list-tab')){
      list.classList.remove('list-tab')
    } else {}

    let current = document.getElementById(`${page}Tab`)
    current.classList.add(`${style}-tab`)
}

function getLastName(){
  let name = localStorage.getItem('lastName')
  if(!name){
    return
  } else {
    document.getElementById('familyName').innerHTML = name
  }
  console.log(name)
}