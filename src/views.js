import { log, doc } from './helpers'
import { getRecipes } from './recipes'

const generateRecipeDom = (recipe) => {
    const recipeRoot = doc.createElement('div')
    const recipeEl = doc.createElement('a')
    const textEl = doc.createElement('p')
    const statusEl = doc.createElement('p')

    if (recipe.title.length ) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    statusEl.textContent = `Structure if all the ingredients exit`

    recipeEl.appendChild(textEl)
    recipeEl.appendChild(statusEl)
    recipeRoot.appendChild(recipeEl)

    return recipeRoot
}

const renderRecipes = () => {
    const recipesEl = doc.querySelector('#recipes')
    const recipes = getRecipes()

    recipes.forEach((recipe) => {
        const recipeTitle = generateRecipeDom(recipe)
        recipesEl.appendChild(recipeTitle)
    })
}

export { generateRecipeDom, renderRecipes }