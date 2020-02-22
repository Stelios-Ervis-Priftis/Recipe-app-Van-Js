import { log, doc } from './helpers'
import { initializeEditPage } from './views'
import { upDateRecipe } from './recipes'

const recTitleEl = doc.querySelector('#recipe-title')
const recSubTitleEl = doc.querySelector('#recipe-sub-title')
const recBody = doc.querySelector('#recipe-body')
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

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        log(e.key)
    }
})