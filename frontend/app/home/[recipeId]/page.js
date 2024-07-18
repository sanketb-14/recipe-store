import { fetchAllRecipe, getMyProfile } from "@/app/lib/data-service";
import React from "react";
import { auth } from "@/app/lib/auth";
import SingleRecipe from "@/app/components/SingleRecipe";
import { Suspense } from "react";
import Loader from "@/app/components/Loader";

export async function generateMetadata({ params }) {
  // You might want to fetch minimal data here just for the metadata
  return { title: `Recipe ${params.recipeId}` };
}

export async function generateStaticParams() {
  const { data } = await fetchAllRecipe();
  const ids = data.recipes.map((recipe) => ({ recipeId: String(recipe.id) }));
  return ids;
}

const Page = async ({ params }) => {
  const session = await auth();
  const myProfile = session && (await getMyProfile(session));

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent font-medium">
        Welcome! to the Recipe-Store
      </h1>
      <Suspense fallback={<Loader />} key={params}>
        <SingleRecipe
          recipeId={params.recipeId}
          session={session}
          myProfile={myProfile}
        />
      </Suspense>
    </div>
  );
};

export default Page;
