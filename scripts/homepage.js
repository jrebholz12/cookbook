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




