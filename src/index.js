import { log, doc } from './helpers'
import { createRecipe, getRecipes, removeRecipe, toggleRecipe } from './recipes'

log('Load index.js')

// createRecipe()
// log(getRecipes())
// removeRecipe()
toggleRecipe('9e827836-c154-44e2-9085-b287c5bd7d82')
log(getRecipes())
