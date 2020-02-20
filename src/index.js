import { log, doc } from './helpers'
import { createRecipe, createIngredient, getRecipes, removeRecipe, toggleIngredients, removeIngredient } from './recipes'
import { generateRecipeDom, renderRecipes } from './views'
import { setFilters } from './filters'

// createRecipe()
renderRecipes()
log(getRecipes())

doc.querySelector('#create-recipe').addEventListener('click', (e) => {
    createRecipe()
    renderRecipes()
})

doc.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value.trim()
    })
    renderRecipes()
})