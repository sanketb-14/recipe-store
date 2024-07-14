import axios from "axios";
import { revalidatePath } from "next/cache";
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

export const getUserDetails = async ({ accessToken }) => {
  const response = await axios.get(`${baseUrl}/api/v1/auth/my-account`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
 
  const data = await response.data;
  console.log("response", data);
  return data;
};


export const fetchAllRecipe = async(queryParams)=>{
  const  response = await axios.get(`${baseUrl}/api/v1/recipe?${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const  data = await response.data

  return data

}