import prisma from "../DB/db.config.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getMyProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      profilePic: true,
      gender: true,
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          pictures: true,
        },
      },
      favorites: {
        select: {
          recipe: {
            select: {
              id: true,
              title: true,
              description: true,
              pictures: true,
            },
          },
        },
      },
      followers: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      following: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      collections: true,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 500));
  }

  const transformedGuestUser = {
    ...user,
    favorites: user.favorites.map((fav) => fav.recipe),
  };
  return res.status(200).json({ user: transformedGuestUser });
});

export const getGuestUser = catchAsync(async (req, res, next) => {
  const guestUserId = req.params.guestUserId;

  const guestUser = await prisma.user.findUnique({
    where: { id: guestUserId },
    select: {
      id: true,
      username: true,
      email: true,
      profilePic: true,
      gender: true,
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          pictures: true,
        },
      },
      favorites: {
        select: {
          recipe: {
            select: {
              id: true,
              title: true,
              description: true,
              pictures: true,
            },
          },
        },
      },
      followers: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      following: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      collections: true,
    },
  });

  // If user not found, return an error
  if (!guestUser) {
    return next(new AppError("User not found", 404));
  }

  // Transform the favorites data to match the expected format
  const transformedGuestUser = {
    ...guestUser,
    favorites: guestUser.favorites.map((fav) => fav.recipe),
  };

  return res.status(200).json({ guestUser: transformedGuestUser });
});

export const addToFavorites = catchAsync(async (req, res, next) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  if (!recipeId) {
    return next(new AppError("Recipe ID is required", 400));
  }

  // Check if the recipe exists
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  // Check if the favorite already exists
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId: userId,
        recipeId: recipeId,
      },
    },
  });

  if (existingFavorite) {
     await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return res.status(201).json({
      status: "success",
      message: "Recipe removed from favorites",
    });
  }

  // Create new favorite
  const newFavorite = await prisma.favorite.create({
    data: {
      user: { connect: { id: userId } },
      recipe: { connect: { id: recipeId } },
    },
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          description: true,
        },
      },
    },
  });

  res.status(201).json({
    status: "success",
    message: "Recipe added to favorites",
    data: {
      favorite: newFavorite,
    },
  });
});

export const followUser = catchAsync(async (req, res, next) => {
  const { userIdToFollow } = req.body;
  const currentUserId = req.user.id;

  console.log("Following user", userIdToFollow);

  if (!userIdToFollow) {
    return next(new AppError("User ID to follow is required", 400));
  }

  if (currentUserId === userIdToFollow) {
    return next(new AppError("You cannot follow yourself", 400));
  }

  // Check if the user to follow exists
  const userToFollow = await prisma.user.findUnique({
    where: { id: userIdToFollow },
  });

  if (!userToFollow) {
    return next(new AppError("User to follow not found", 404));
  }

  // Check if already following
  const alreadyFollowing = await prisma.user.findFirst({
    where: {
      id: currentUserId,
      following: {
        some: {
          id: userIdToFollow,
        },
      },
    },
  });

  let updatedUser;
  let message;

  if (alreadyFollowing) {
    // Unfollow
    updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: {
        following: {
          disconnect: { id: userIdToFollow },
        },
      },
      select: {
        id: true,
        username: true,
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    message = "User unfollowed successfully";
  } else {
    // Follow
    updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: {
        following: {
          connect: { id: userIdToFollow },
        },
      },
      select: {
        id: true,
        username: true,
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    message = "User followed successfully";
  }

  res.status(200).json({
    status: "success",
    message,
    data: {
      user: updatedUser,
    },
  });
});


