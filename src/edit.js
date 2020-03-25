import { log, doc } from './helpers'
import { initializeEditPage, renderIngredients } from './views'
import { upDateRecipe, loadRecipes, removeRecipe, createIngredient, getRecipes } from './recipes'

const recTitleEl = doc.querySelector('#recipe-title')
const recSubTitleEl = doc.querySelector('#recipe-sub-title')
const recBody = doc.querySelector('#recipe-body')
const recDelete = doc.querySelector('#delete-recipe')
const recHomePage = doc.querySelector('#return')
const recipeId = location.hash.substring(1)

const createIngredientBtn = doc.querySelector('#add-ingredients')

initializeEditPage(recipeId)
renderIngredients(recipeId)

recTitleEl.addEventListener('input', (e) => {
    upDateRecipe(recipeId, {
        title: e.target.value
    })
})

recSubTitleEl.addEventListener('input', (e) => {
    upDateRecipe(recipeId, {
        subTitle: e.target.value
    })
})

recBody.addEventListener('input', (e) => {
    upDateRecipe(recipeId, {
        body: e.target.value
    })
})

recDelete.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('./index.html')
})

recHomePage.addEventListener('click', (e) => {
    location.assign(`/index.html`)
})

// Ingredients 
createIngredientBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    createIngredient(recipeId, e)
    renderIngredients(recipeId)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        initializeEditPage(recipeId)
    }
})