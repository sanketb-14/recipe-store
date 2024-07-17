import React from "react";
import Loader from "../components/Loader";
import RecipeList from "../components/RecipeList";
import Filter from "../components/Filter";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-4xl mb-5 text-accent font-medium">
          Welcome! to the Recipe-Store
        </h1>
        <p className="text-primary text-lg mb-10">
          Welcome to Recipe Store, your ultimate destination for culinary
          inspiration and recipe sharing! Whether you're a seasoned chef or a
          kitchen novice, Recipe Store is designed to ignite your passion for
          cooking and help you discover new and exciting dishes.
        </p>
        <div className="w-full m-2 flex justify-end "></div>
        <Suspense
          fallback={<Loader />}
          // key={params}
        >
          <RecipeList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
