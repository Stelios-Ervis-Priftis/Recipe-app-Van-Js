import { log, doc } from './helpers'
import { createRecipe, getRecipes } from './recipes'
import { renderRecipes } from './views'
import { setFilters } from './filters'

renderRecipes()

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

log(getRecipes())