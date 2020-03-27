import { log, doc } from './helpers'
import { createRecipe, getRecipes, loadRecipes } from './recipes'
import { renderRecipes } from './views'
import { setFilters } from './filters'

renderRecipes()
log(getRecipes())

doc.querySelector('#create-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

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