import prisma from "../DB/db.config.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createRecipe = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    dietaryPreference,
    difficultyLevel,
    pictures,
  } = req.body;

  const userId = req.user.id;

  if (!title || !description) {
    return next(new AppError("Title and description are required", 402));
  }
  const newRecipe = await prisma.recipe.create({
    data: {
      title,
      description,
      ingredients: ingredients || [],
      instructions: instructions || [],
      cookingTime: parseInt(cookingTime) || 30,
      servings: parseInt(servings) || 2,
      dietaryPreference: dietaryPreference || ["VEGAN"],
      difficultyLevel: difficultyLevel || "EASY",
      pictures: pictures || "N/A",
      user: { connect: { id: userId } },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
  });

  if (!newRecipe) {
    return next(new AppError("Recipe creation failed"), 500);
  }

  return res.status(201).json(newRecipe);
});

export const getAllRecipe = catchAsync(async (req, res, next) => {
  const {
    dietaryPreference,
    difficultyLevel,
    maxCookingTime,
    minRating,
    page = 1,
    limit = 10,
  } = req.query;

  // Build the where clause for filtering
  const where = {};

  if (dietaryPreference) {
    where.dietaryPreference = {
      hasSome: dietaryPreference.split(","),
    };
  }

  if (difficultyLevel) {
    where.difficultyLevel = difficultyLevel;
  }

  if (maxCookingTime) {
    where.cookingTime = {
      lte: parseInt(maxCookingTime),
    };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Fetch recipes
  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: parseInt(limit),
    select: {
      id: true,
      title: true,
      pictures: true,
      cookingTime: true,
      difficultyLevel: true,
      dietaryPreference: true,
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  // Calculate average rating and filter by minRating if provided
  const filteredRecipes = recipes
    .map((recipe) => {
      const avgRating =
        recipe.reviews.length > 0
          ? recipe.reviews.reduce((sum, review) => sum + review.rating, 0) /
            recipe.reviews.length
          : 0;
      return { ...recipe, avgRating };
    })
    .filter(
      (recipe) => !minRating || recipe.avgRating >= parseFloat(minRating)
    );

  // Count total recipes (for pagination info)
  const totalRecipes = await prisma.recipe.count({ where });

  if (filteredRecipes.length === 0) {
    return next(new AppError("No recipes found matching the criteria", 404));
  }

  res.status(200).json({
    status: "success",
    results: filteredRecipes.length,
    totalRecipes,
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalRecipes / limit),
    data: {
      recipes: filteredRecipes,
    },
  });
});

export const getRecipe = catchAsync(async (req, res, next) => {
  console.log("Recipe id", req.params.recipeId);

  const recipe = await prisma.recipe.findUnique({
    where: { id: req.params.recipeId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      favorites: true,
      reviews: true,
      collections: true,
    },
  });

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  res.status(200).json({ recipe });
});

export const createOrUpdateReview = catchAsync(async (req, res, next) => {
  const { recipeId } = req.params;
  const { rating, comment } = req.body;

  
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    return next(
      new AppError("Please provide a valid rating between 1 and 5", 400)
    );
  }

  if (!comment) {
    return next(new AppError("Please provide a comment for your review", 400));
  }

  // Check if the recipe exists
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  // Try to find an existing review
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_recipeId: {
        userId: userId,
        recipeId: recipeId,
      },
    },
  });

  let review;

  if (existingReview) {
    // Update existing review
    review = await prisma.review.update({
      where: {
        id: existingReview.id,
      },
      data: {
        rating,
        comment,
        updatedAt: new Date(),
      },
    });
  } else {
    // Create new review
    review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        recipeId,
      },
    });
  }

  res.status(201).json({
    review,
  });
});

export const editRecipe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const {
    recipeId,
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    pictures,
    dietaryPreference,
    difficultyLevel,
  } = req.body;

  // Check if the recipe exists and belongs to the user
  const existingRecipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      userId: userId,
    },
  });

  if (!existingRecipe) {
    return next(
      new AppError(
        "Recipe not found or you do not have permission to edit this recipe",
        404
      )
    );
  }

  // Prepare the update data
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (ingredients !== undefined) updateData.ingredients = ingredients;
  if (instructions !== undefined) updateData.instructions = instructions;
  if (cookingTime !== undefined) updateData.cookingTime = cookingTime;
  if (servings !== undefined) updateData.servings = servings;
  if (pictures !== undefined) updateData.pictures = pictures;
  if (difficultyLevel !== undefined)
    updateData.difficultyLevel = difficultyLevel;

  // Handle dietaryPreference separately
  if (dietaryPreference !== undefined && Array.isArray(dietaryPreference)) {
    updateData.dietaryPreference = {
      set: dietaryPreference,
    };
  }

  // Only update if there are changes
  if (Object.keys(updateData).length > 0) {
    updateData.updatedAt = new Date();

    // Update the recipe
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: {
        recipe: updatedRecipe,
      },
    });
  } else {
    // No changes were made
    res.status(200).json({
      status: "success",
      message: "No changes were made to the recipe",
      data: {
        recipe: existingRecipe,
      },
    });
  }
});

// Delete Recipe
export const deleteRecipe = catchAsync(async (req, res, next) => {
  const { recipeId } = req.body;
  console.log("removing recipe", recipeId);
  const userId = req.user.id;

  if (!recipeId) {
    return next(new AppError("Recipe ID is required", 400));
  }

  // Check if the recipe exists and belongs to the user
  const existingRecipe = await prisma.recipe.findFirst({
    where: {
      id: recipeId,
      userId: userId,
    },
  });

  console.log("existingRecipe", existingRecipe);

  if (!existingRecipe) {
    return next(
      new AppError(
        "Recipe not found or you do not have permission to delete this recipe",
        404
      )
    );
  }

  // Delete the recipe
  await prisma.recipe.delete({
    where: { id: recipeId },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});


export async function getReviewsForRecipe(req, res) {
    const { recipeId } = req.params;
  
    try {
      const reviews = await prisma.review.findMany({
        where: {
          recipeId: recipeId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      res.status(200).json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews for recipe:', error);
      res.status(500).json({ error: 'An error occurred while fetching reviews for this recipe' });
    }
  }