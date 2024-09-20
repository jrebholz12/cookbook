//Imports needed functions from backend and global
import { displayActionBar, displayActionBarOff, displayOtherItems, displayOffOtherItems, insertList, getLength, showShoppingListTitles } from "../backend/backend-final-screen.js"
import { sortTabs, getLastName } from "../backend/global-js.js"

//Start functions
showShoppingListTitles()
sortTabs('list', 'list')
getLength()
insertList()

//Event Listeners
document.getElementById('windowPrint').addEventListener('click', window.print)

document.getElementById('otherPlusButton-produce').addEventListener('click', ()=>displayOtherItems('produce'))
document.getElementById('otherInputBar-produce').addEventListener('keydown', (event)=>displayOtherItems(event, 'produce'))
document.getElementById('otherMinusButton-produce').addEventListener('click', ()=>displayOffOtherItems('produce'))

document.getElementById('otherPlusButton-meat').addEventListener('click', ()=>displayOtherItems('meat'))
document.getElementById('otherInputBar-meat').addEventListener('keydown', (event)=>displayOtherItems(event, 'meat'))
document.getElementById('otherMinusButton-meat').addEventListener('click', ()=>displayOffOtherItems('meat'))

document.getElementById('otherPlusButton-pantry').addEventListener('click', ()=>displayOtherItems('pantry'))
document.getElementById('otherInputBar-pantry').addEventListener('keydown', (event)=>displayOtherItems(event, 'pantry'))
document.getElementById('otherMinusButton-pantry').addEventListener('click', ()=>displayOffOtherItems('pantry'))

document.getElementById('otherPlusButton-baking').addEventListener('click', ()=>displayOtherItems('baking'))
document.getElementById('otherInputBar-baking').addEventListener('keydown', (event)=>displayOtherItems(event, 'baking'))
document.getElementById('otherMinusButton-baking').addEventListener('click', ()=>displayOffOtherItems('baking'))

document.getElementById('otherPlusButton-dairy').addEventListener('click', ()=>displayOtherItems('dairy'))
document.getElementById('otherInputBar-dairy').addEventListener('keydown', (event)=>displayOtherItems(event, 'dairy'))
document.getElementById('otherMinusButton-dairy').addEventListener('click', ()=>displayOffOtherItems('dairy'))

document.getElementById('otherPlusButton-other').addEventListener('click', ()=>displayOtherItems('other'))
document.getElementById('otherInputBar-other').addEventListener('keydown', (event)=>displayOtherItems(event, 'other'))
document.getElementById('otherMinusButton-other').addEventListener('click', ()=>displayOffOtherItems('other'))







