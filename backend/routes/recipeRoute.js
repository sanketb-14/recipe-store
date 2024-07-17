import { Router } from "express";

import { protect } from "../controllers/authController.js";
import {
  createOrUpdateReview,
  createRecipe,
  
  getAllRecipe,
  getRecipe,
  getReviewsForRecipe,
} from "../controllers/recipeController.js";

const router = Router();

router.get("/", getAllRecipe);
router.get("/:recipeId", getRecipe);

router.route("/:recipeId/reviews").get(getReviewsForRecipe)

router.use(protect);

router.route("/createReview/:recipeId").post(createOrUpdateReview);
router.route("/create").post(createRecipe);

export default router;
