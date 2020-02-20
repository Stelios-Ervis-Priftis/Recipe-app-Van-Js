import { log, doc } from './helpers'
import { getRecipes } from './recipes'

// generateRecipeDOM
// Get the DOM elements for an individual recipe
const generateRecipeDom = (recipe) => {
    const recipeRoot = doc.createElement('div')
    const recipeEl = doc.createElement('a')
    const textEl = doc.createElement('p')

    if (recipe.title.length ) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)

    recipeEl.appendChild(textEl)
    recipeEl.appendChild(generateSummaryDom())
    recipeRoot.appendChild(recipeEl)

    return recipeRoot
}
// Arguments: recipe
// Return value: the recipe element

// renderRecipes
// Render application todos base on the filters
const renderRecipes = () => {
    const recipesEl = doc.querySelector('#recipes')
    const recipes = getRecipes()

    recipes.forEach((recipe) => {
        const recipeTitle = generateRecipeDom(recipe)
        recipesEl.appendChild(recipeTitle)
    })
}
// Arguments: none
// Return value: none


const generateSummaryDom = () => {
    const statusEl = doc.createElement('p')
    statusEl.textContent = `Structure if all the ingredients exit`
    return statusEl
}
// Arguments: incompletedTodos
// Return value: the summary

export { generateRecipeDom, renderRecipes, generateSummaryDom }