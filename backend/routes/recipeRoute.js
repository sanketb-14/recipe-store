import {Router} from "express"

import { protect } from "../controllers/authController.js"
import { createOrUpdateReview, createRecipe, deleteRecipe, editRecipe, getAllRecipe, getRecipe } from "../controllers/recipeController.js"

const router = Router()

router.get('/', getAllRecipe)
router.get('/:recipeId', getRecipe)
router.use(protect)
router.route('/:recipeId').patch(editRecipe).delete(deleteRecipe)
router.route("/createReview/:recipeId").post(createOrUpdateReview)
router.route('/create').post(createRecipe)




export default router