import moment from 'moment'
import uuidv4 from'uuid/v4'
import { log, animateCSS } from './helpers'

// Setup the empty recipes array
let recipes = []

// loadRecipes
const loadRecipes = () => {
    const recipesJson = localStorage.getItem('recipes')

    try {
        recipes = recipesJson ? JSON.parse(recipesJson) : []
    } catch (error) {
        recipes = []
    }
}
// Arguments: none
// Return value: none

// saveRecipes
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}
// Arguments: none
// Return value: none

// getRecipes
const getRecipes = () => recipes
// Arguments: none
// Return value: recipes array

// createRecipe
const createRecipe = () => {
    const recipeId = uuidv4()
    const timestamp = moment().valueOf()
    
    recipes.push({
        id: recipeId,
        title: '',
        subTitle: '',
        body: '',
        createdAt: timestamp,
        upDateAt: timestamp,
        ingredients: []
    })
    saveRecipes()

    return recipeId
}
// Arguments: none
// Return value: recipeId

// removeRecipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}
// Arguments: id of recipe to remove it
// Return value: none

// createIngredients
const createIngredient = (id, e) => {
    const ingredientId = uuidv4()
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    let newIngredient = e.target.elements.newIngredient.value.trim()
    let ingredientEl = e.target.elements.newIngredient

    if (recipe && newIngredient.length > 0) {
        recipe.ingredients.push({
            id: ingredientId,
            text: newIngredient,
            completed: false
        })
        e.target.elements.newIngredient.value = ''
        e.target.elements.newIngredient.removeAttribute('class', 'error')
        saveRecipes()
    } else {
        e.target.elements.newIngredient.setAttribute('class', 'error')
        animateCSS(ingredientEl, 'shake', 'faster')
    }
}
// Arguments: id of recipe for accessed to create the ingredient
// Return value: none

const removeIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    } else {
        log('Ingredient not found')
    }
}
// Arguments: id of recipe for accessed and id of ingredient to remove it
// Return value: none

// toggleIngredients
const toggleIngredients = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    recipe.ingredients.find((ingredient) => {
        if (ingredient.id === ingredientId) {
            ingredient.completed = !ingredient.completed
            saveRecipes()
        }
    })
}
// Arguments: id of recipe for accessed and id of ingredient to toggle it
// Return value: none

const upDateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.subTitle === 'string') {
        recipe.subTitle = updates.subTitle
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body
    }

    saveRecipes()

    return recipe
}

loadRecipes()
// Make sure to call loadRecipe and setup the exports
export { createRecipe, createIngredient, getRecipes, removeRecipe, removeIngredient, toggleIngredients, upDateRecipe, loadRecipes }