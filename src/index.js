import { log, doc } from './helpers'
import { createRecipe, createIngredient, getRecipes, removeRecipe, toggleIngredients, removeIngredient } from './recipes'
import { renderRecipes } from './views'

log('Load index.js')

// createRecipe()
// createIngredient('5410dd90-0d21-4cbe-a46e-5a3fd01148ec')
// toggleIngredients('5410dd90-0d21-4cbe-a46e-5a3fd01148ec', 'd24540f5-746f-49b2-9954-634e87e68cc3')
// removeIngredient('5410dd90-0d21-4cbe-a46e-5a3fd01148ec')
renderRecipes()
getRecipes().forEach((recipe) => {
    log(recipe)
})