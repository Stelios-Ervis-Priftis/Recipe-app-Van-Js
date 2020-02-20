import { log, doc } from './helpers'
import { createRecipe, createIngredient, getRecipes, removeRecipe, toggleIngredients, removeIngredient, upDateRecipe } from './recipes'
import { generateRecipeDom, renderRecipes } from './views'
import { setFilters } from './filters'

// upDateRecipe('f37907cf-3a43-45e2-8e08-7bbb5cfc6fc7', {
//     title: 'New title'
// })
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