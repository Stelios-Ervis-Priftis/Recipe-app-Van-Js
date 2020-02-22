import { log, doc } from './helpers'
import { initializeEditPage } from './views'
import { upDateRecipe, loadRecipes, removeRecipe } from './recipes'

const recTitleEl = doc.querySelector('#recipe-title')
const recSubTitleEl = doc.querySelector('#recipe-sub-title')
const recBody = doc.querySelector('#recipe-body')
const recDelete = doc.querySelector('#delete-recipe')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)


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


window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        initializeEditPage(recipeId)
    }
})