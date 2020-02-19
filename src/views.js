import { log, doc } from './helpers'
import { getRecipes } from './recipes'

const renderRecipes = () => {
    const recipes = getRecipes()
    const recipesRoot = doc.querySelector('#recipes')

    recipes.forEach((recipe) => {
        log(recipe)
        const recipeEl = doc.createElement('span')
        recipeEl.textContent = recipe.title
        recipesRoot.appendChild(recipeEl)
    })
}

export { renderRecipes }