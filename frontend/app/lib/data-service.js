import axios from "axios";
import { useProfile } from "../context/UserContext";
import axiosInstance from "@/helper/axiosInstance";

// import { headers } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getGuest(user) {
  const res = await axios.post(`${baseUrl}/api/v1/auth/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data.status === "fail" || res.data.status === "error") {
    console.error("API returned fail or error status:", res.data);
    throw new Error(res.data.message || "Authentication failed");
  }

  return res.data;
}

export async function createGuest(formData) {
  const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export const fetchAllRecipe = async (queryParams) => {
  const response = await axios.get(`${baseUrl}/api/v1/recipe?${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;

  return data;
};

export const getMyProfile = async (token) => {
  console.log(token);
  const response = await axios.get(`${baseUrl}/api/v1/auth/my-account`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  return data;
};

export const getSingleRecipe = async (params) => {
  const response = await axios.get(`${baseUrl}/api/v1/recipe/${params}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  return data;
};

export const deleteRecipe = async (recipeId) => {
  const response = await axiosInstance.delete(
    `${baseUrl}/api/v1/auth/my-account/edit`,
    { data: recipeId } // Send recipeId in the request body
  );
  console.log("response", response.data);

  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await axiosInstance.post(
    `${baseUrl}/api/v1/recipe/create`,
    recipeData
  );
  console.log("response", response.data);
  return response.data;
};

export const addToFavorites = async (recipeId) => {
  const response = await axiosInstance.post(
    `${baseUrl}/api/v1/auth/add-to-favorites`,
    { recipeId } // Send as an object
  );
  return response.data;
};

export const createOrUpdateReview = async (recipeId, rating, comment) => {
  const response = await axiosInstance.post(
    `${baseUrl}/api/v1/recipe/createReview/${recipeId}`,
    { rating, comment }
  );
  console.log("response", response.data);
  return response.data;
};
