import { log, doc } from './helpers'
import { getRecipes, toggleIngredients, removeIngredient } from './recipes'
import { getFilters } from './filters'

// generateRecipeDOM
// Get the DOM elements for an individual recipe
const generateRecipeDom = (recipe) => {
    const recipeRoot = doc.createElement('div')
    const recipeEl = doc.createElement('a')
    const textEl = doc.createElement('p')

    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeRoot.setAttribute('class', 'recipe')
    textEl.setAttribute('class', 'rec-title')

    recipeEl.appendChild(textEl)
    recipeEl.appendChild(ingredientsStockMessage(recipe))
    recipeRoot.appendChild(recipeEl)

    return recipeRoot
}
// Arguments: recipe
// Return value: the recipe element

// renderRecipes
// Render application todos base on the filters
const renderRecipes = () => {
    const dropdown = doc.querySelector('#filter-by')
    const recipesEl = doc.querySelector('#recipes')
    const recipes = getRecipes()
    const filters = getFilters()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()) || recipe.subTitle.toLowerCase().includes(filters.searchText.toLowerCase()))

    // Sort by wich value are chosing
    dropdown.addEventListener('change', (e) => {
        log(e.target.value)
        log(getRecipes())
    })
    
    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeTitle = generateRecipeDom(recipe)
            recipesEl.appendChild(recipeTitle)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'None recipe found.'
        emptyMessage.setAttribute('class', 'empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}
// Arguments: none
// Return value: none

const generateIngredientsDom = (recipeId, ingredient) => {
    const ingredientRoot = doc.createElement('div')
    const ingredientCheckbox = doc.createElement('input')
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
    ingredientCheckbox.setAttribute('type', 'checkbox')
    removeButton.textContent = 'x'
    ingredientText.textContent = ingredient.text

    // append the elements
    ingredientRoot.appendChild(ingredientCheckbox)
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
        emptyMessage.textContent = 'No ingrendients available.'
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
        statusEl.textContent = `You have all the ingredients, ready to make it!`
    } else if (ingredientInStock.length > 0) {
        statusEl.textContent = `You have some of the ingredients, check out what you miss.`
    } else if (totalIngredients > 0) {
        statusEl.textContent = `You have add ingredients but you don't posses them yet.`
    } else if (totalIngredients === 0) {
        statusEl.textContent = `You haven't add any ingredients yet.`
    }

    return statusEl
}

export { generateRecipeDom, renderRecipes, renderIngredients, initializeEditPage }