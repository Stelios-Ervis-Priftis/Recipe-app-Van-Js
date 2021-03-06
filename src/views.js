import { log, doc } from './helpers'
import { getRecipes, toggleIngredients, removeIngredient, sortRecipes } from './recipes'
import { getFilters } from './filters'

// generateRecipeDOM
// Get the DOM elements for an individual recipe
const generateRecipeDom = (recipe) => {
    const recipeRoot = doc.createElement('div')
    const recipeEl = doc.createElement('a')
    const textEl = doc.createElement('p')
    const arrowEl = doc.createElement('i')
    const heartEl = doc.createElement('i')
    const recPopEl = doc.createElement('p')

    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    recipeRoot.setAttribute('class', 'recipe')
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    textEl.setAttribute('class', 'rec-title')
    arrowEl.setAttribute('class', 'rec-arrow fas fa-angle-double-right')
    heartEl.setAttribute('class', 'far fa-heart')
    recPopEl.textContent = recipe.popularity
    
    if (recipe.popularity > 0) {
        heartEl.removeAttribute('class', 'far fa-heart')
        heartEl.setAttribute('class', 'fas fa-heart')
    }


    recipeRoot.appendChild(recipeEl)
    recipeEl.appendChild(textEl)
    textEl.appendChild(arrowEl)
    recipeEl.appendChild(ingredientsStockMessage(recipe))
    recipeRoot.appendChild(recPopEl)
    recipeRoot.appendChild(heartEl)


    return recipeRoot
}
// Arguments: recipe
// Return value: the recipe element

// renderRecipes
// Render application recipes base on the filters
const renderRecipes = () => {
    const recipesEl = doc.querySelector('#recipes')
    const recipes = getRecipes()
    const filters = getFilters()
    const sortedRecipes = sortRecipes(recipes, filters)
    const filteredRecipes = sortedRecipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()) || recipe.subTitle.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeTitle = generateRecipeDom(recipe)
            recipesEl.appendChild(recipeTitle)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.setAttribute('class', 'empty-message')
        emptyMessage.textContent = 'None recipes found.'
        recipesEl.appendChild(emptyMessage)
    }
}
// Arguments: none
// Return value: none

const generateIngredientsDom = (recipeId, ingredient) => {
    const ingredientRoot = doc.createElement('label')
    const checkboxLabel = doc.createElement('label')
    const ingredientCheckbox = doc.createElement('input')
    const customCheckbox = doc.createElement('span')
    const ingredientText = doc.createElement('span')
    const removeButton = doc.createElement('button')

    // actions
    removeButton.addEventListener('click', (e) => {
        removeIngredient(recipeId, ingredient.id)
        renderIngredients(recipeId)
    })
    ingredientCheckbox.addEventListener('change', (e) => {
        toggleIngredients(recipeId, ingredient.id)
        renderIngredients(recipeId)
    })
    ingredientCheckbox.checked = ingredient.completed

    // setup text content and attributes
    ingredientRoot.setAttribute('class', 'ingredientRoot')
    checkboxLabel.setAttribute('class', 'checkbox-label')
    ingredientCheckbox.setAttribute('type', 'checkbox')
    customCheckbox.setAttribute('class', 'checkbox-custom')
    removeButton.textContent = 'remove'
    ingredientText.textContent = ingredient.text

    // append the elements
    ingredientRoot.appendChild(checkboxLabel)
    checkboxLabel.appendChild(ingredientCheckbox)
    checkboxLabel.appendChild(customCheckbox)
    ingredientRoot.appendChild(ingredientText)
    ingredientRoot.appendChild(removeButton)

    return ingredientRoot
}

const renderIngredients = (recipeId) => {
    const ingredientsEl = doc.querySelector('#ingredients')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    ingredientsEl.innerHTML = ''

    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsEl.appendChild(generateIngredientsDom(recipeId, ingredient))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.setAttribute('class', 'empty-message')
        emptyMessage.textContent = 'No ingredient\'s available.'
        ingredientsEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (recipeId) => {
    const recTitleEl = doc.querySelector('#recipe-title')
    const recSubTitleEl = doc.querySelector('#recipe-sub-title')
    const recBody = doc.querySelector('#recipe-body')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('./index.html')
    }

    recTitleEl.value = recipe.title
    recSubTitleEl.value = recipe.subTitle
    recBody.value = recipe.body
}

const ingredientsStockMessage = (recipe) => {
    const statusEl = doc.createElement('p')
    statusEl.setAttribute('class', 'stock-message')
    const totalIngredients = recipe.ingredients.length
    const ingredientInStock = recipe.ingredients.filter((ingredient) => ingredient.completed)

    if (ingredientInStock.length === totalIngredients && totalIngredients !== 0) {
        statusEl.textContent = `You have the ingredients, don't be lazy!`
    } else if (ingredientInStock.length > 0) {
        statusEl.textContent = `You have some ingredients, what you miss?`
    } else if (totalIngredients > 0) {
        statusEl.textContent = `You have add ingredients but don't posses them yet.`
    } else if (totalIngredients === 0) {
        statusEl.textContent = `You haven't add any ingredients yet.`
    }

    return statusEl
}

export { generateRecipeDom, renderRecipes, renderIngredients, initializeEditPage }