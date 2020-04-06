import { log, doc } from './helpers'
import { createRecipe, getRecipes, loadRecipes } from './recipes'
import { renderRecipes } from './views'
import { setFilters, getFilters } from './filters'

renderRecipes()

// Sort by witch value are choosing
doc.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderRecipes()
})
// Create recipe
doc.querySelector('#create-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})
// Search for recipe
doc.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value.trim()
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        renderRecipes()
    }
})