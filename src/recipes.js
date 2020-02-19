import moment from 'moment'
import uuidv4 from'uuid/v4'
import { log } from './helpers'

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
// Return value: todos array

// createRecipe
const createRecipe = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    
    recipes.push({
        id: id,
        title: 'Recipe title',
        body: 'Steps',
        createdAt: timestamp,
        upDateAt: timestamp,
        ingredients: [

        ]
    })
    saveRecipes()
}
// Arguments: todo text
// Return value: none

// createIngredients
const createIngredients = (id) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    recipe.ingredients.push({
        text: 'ingredients',
        completed: false
    })
    saveRecipes()
}
// Arguments: id
// Return value: none

// removeRecipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    log(recipeIndex)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}
// Arguments: id of todo to remove
// Return value: none

// removeIngredients
const removeIngredients = (id) => {
    // find the id and remove the ingredient
}

// toggleRecipe
const toggleRecipe = (id) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    log(recipe)

    if (recipe) {
        recipe.ingredients.completed = !recipe.ingredients.completed
        saveRecipes()
    }
}
// Arguments: id of todo to toggle
// Return value: none

loadRecipes()
// Make sure to call loadRecipe and setup the exports
export { createRecipe, createIngredients, getRecipes, removeRecipe, removeIngredients, toggleRecipe }