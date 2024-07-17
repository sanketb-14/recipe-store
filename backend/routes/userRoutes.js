import { Router } from "express";
import {
  signup,
  login,
  logout,
  protect,
} from "../controllers/authController.js";
import { addToFavorites, followUser, getGuestUser, getMyProfile } from "../controllers/userController.js";
import { deleteRecipe, editRecipe } from "../controllers/recipeController.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.get("/logout", logout);
router.get("/get-profile/:guestUserId", getGuestUser);

router.use(protect);

router.route("/my-account").get(getMyProfile)
router.route("/my-account/edit").patch(editRecipe).delete(deleteRecipe);

router.post("/add-to-favorites", addToFavorites)
router.post("/follow-user", followUser);

export default router;
