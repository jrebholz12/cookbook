//Imports needed functions from backend and global
import { initiateTheme, toggleSettings, updateLastName, changeTheme } from "../backend/backend-index.js"
import { sortTabs, getLastName } from "../backend/global-js.js"

//On Start-up
initiateTheme()
sortTabs('home', 'home')

//Event Listeners
document.getElementById('settingsImage').addEventListener('click', toggleSettings)
document.getElementById('last-name-indicator').addEventListener('keydown', (event) => updateLastName(event))
document.getElementById('lightTheme').addEventListener('click', (theme) => changeTheme('light'))
document.getElementById('darkTheme').addEventListener('click', (theme) => changeTheme('dark'))



