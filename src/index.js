import { log, doc } from './helpers'
import { createRecipe, createIngredient, getRecipes, removeRecipe, toggleIngredients, removeIngredient } from './recipes'
import { generateRecipeDom, renderRecipes } from './views'

// createRecipe()
renderRecipes()
log(getRecipes())

doc.querySelector('#create-recipe').addEventListener('click', (e) => {
    createRecipe()
    renderRecipes()
})