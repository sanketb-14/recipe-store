"use server";

import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getGuest } from "@/app/lib/data-service";


export async function signInActionCredentials(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

 if(!email || !password) throw new Error("email or password is missing");

 
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result.error) {
    return { error: result.error };
  }

  // If successful, fetch the user data
  const userData = await getGuest({ email, password });
  
  // Return the user data

  return { user: userData.data.user, token: userData.token } ,revalidatePath("/login"),   redirect("/account")
 



}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
  revalidatePath("/login")

}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function signUpAction(formData) {
  
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");
  const gender = formData.get("gender") || "male";

  if (password !== password_confirmation) throw new Error("password should match")

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use server-side environment variable

  const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      password_confirmation,
      gender,
    }),
  });

  const data = await response.json();
  if(data.status ==="fail") throw new Error("unable to create user")

  // If signup is successful, you might want to automatically sign in the user
  await signIn("credentials", { email, password, redirect: false });
  redirect("/account");
  
}

