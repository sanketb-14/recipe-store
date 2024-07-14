import { Suspense } from "react";
import MyProfile from "../components/MyProfile";
import { auth } from "../lib/auth";
import Loader from "../components/Loader";
import MyRecipe from "../components/MyRecipe";
import { getUserDetails } from "../lib/data-service";
import { revalidateTag } from "next/cache";

const Page = async () => {
  const session = await auth();
  let token = JSON.stringify(session)
  token = JSON.parse(token)
 

  
  const detailUser = await getUserDetails(token);
  console.log("user details: ", detailUser)

  // Access the properties from the nested 'user' object
  const recipes = detailUser.user.recipes
  const followers = detailUser.user.followers
  const followings = detailUser.user.following  
  const favorites = detailUser.user.favorites

 

  

  

  return (
    <div className="w-full max-w-6xl flex-col p-1 sm:p-4   flex justify-start h-screen">
       <MyProfile session={session} recipes ={recipes} followers={followers} followings={followings}/>
      <Suspense fallback={<Loader />}>
      <MyRecipe  recipes={recipes} favorites={favorites} />
       
      </Suspense>
    </div>
  );
};

export default Page;