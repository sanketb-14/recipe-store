"use client";

import React, { useState } from "react";
import Pagination from "./Pagination";
import { fetchAllRecipe } from "../lib/data-service";
import RenderRecipes from "./RenderRecipes";
import Filter from "./Filter";
import { useQuery,useMutation, useQueryClient  } from "@tanstack/react-query";
import Loader from "./Loader";
import { useToast } from "../hooks/useToast";

const RecipeList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({});
    const queryClient = useQueryClient();
  
    const queryParams = new URLSearchParams({
      ...filters,
      page: currentPage,
      limit: 10,
    }).toString();
  
    const { isPending, data, error } = useQuery({
      queryKey: ['recipes', queryParams],
      queryFn: () => fetchAllRecipe(queryParams),
    });
  
    const filterMutation = useMutation({
      mutationFn: (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        return Promise.resolve();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['recipes']);
      },
    });
  
    const handleFilterChange = (newFilters) => {
      filterMutation.mutate(newFilters);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // queryClient.invalidateQueries(['recipes']);
      };
  
    if (isPending) {
      return <Loader />;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const allRecipes = data.data.recipes;
    const totalPages = data.totalPages;

  

  

   
  

  return (
    <>
      <Filter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2  bg-base-200 justify-center rounded-xl shadow-xl p-1 sm:p-4 mt-1 sm:mt-8 ">
        <RenderRecipes recipes={allRecipes} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RecipeList;
