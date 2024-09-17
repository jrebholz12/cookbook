initiateTheme()
sortTabs('home', 'home')

function toggleSettings(){
  let box = document.getElementById('settingsBox')
  if(box.classList.contains('display-off')){
    box.classList.remove('display-off')
  } else {
    box.classList.add('display-off')
  }
  console.log(box.classList)
  console.log(document.getElementById('settingsContainer').innerHTML)
}

function updateLastName(event){
    let area = document.getElementById('last-name-indicator')
    let name = area.value || ''
  if(event.key === "Enter"){
    let displayName = name
    document.getElementById('familyName').innerHTML = displayName
    localStorage.setItem('lastName', name)
    console.log(localStorage.getItem('lastName'))
  } else{}
}

function changeTheme(theme){
  document.body.style.backgroundImage = `url('pictures/${theme}wallpaper.jpg')`
  document.getElementById('homepageArea').innerHTML = ''
  document.getElementById('homepageArea').innerHTML = `
  <div id="recBackground" class="${theme}-rectangle-background">
        <img class="cover" id="cookbookImage" src="icons/${theme}cookbook.png">
        <img class="spiral" src="icons/notebook-removebg-preview.png">
              <div class="box-container">
                <a href="add-recipe.html">
                  <div class="${theme}-button-box">
                   <img class="image-list" src="icons/recipeBox.png">
                   My Recipe Box
                  </div>
                </a>
                <a href="browse-recipes.html">
                  <div class="${theme}-button-box">
                  <img class="image-list" src="icons/littlebook.webp">
                  My CookBook
                  </div>
                </a>
            </div>
          </div>`
  localStorage.setItem('currentTheme', theme)
}

function initiateTheme(){
  let theme = localStorage.getItem('currentTheme')
  let location = document.getElementById('homepageArea')
  if(theme === null || theme.length === 0){
    theme = 'light' 
  }
  document.body.style.backgroundImage = `url('pictures/${theme}wallpaper.jpg')`
  let html = `<div id="recBackground" class="${theme}-rectangle-background">
        <img class="cover" id="cookbookImage" src="icons/${theme}cookbook.png">
        <img class="spiral" src="icons/notebook-removebg-preview.png">
              <div class="box-container">
                <a href="add-recipe.html">
                  <div class="${theme}-button-box">
                   <img class="image-list" src="icons/recipeBox.png">
                   My Recipe Box
                  </div>
                </a>
                <a href="browse-recipes.html">
                  <div class="${theme}-button-box">
                  <img class="image-list" src="icons/littlebook.webp">
                  My CookBook
                  </div>
                </a>
              </div>
      </div>`
  location.insertAdjacentHTML("afterbegin", html) 
  document.body.style.backgroundSize = '80%'
}




