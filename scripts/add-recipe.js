import { populateRecipeBox } from '../backend/utils.js'
import { sortTabs } from '../backend/utils.js'
import { addField } from '../backend/utils.js'

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

