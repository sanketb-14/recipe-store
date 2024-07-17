"use client";
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { addToFavorites } from "../lib/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/useToast";

const AddToFavorites = ({favorites }) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  
  const {recipeId} = useParams()
 
  const isFavorite = favorites.some(item => item.recipeId === recipeId)

  const [state , setState] = useState(isFavorite)
  console.log("state: ", state);

  const mutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profile"]);
      showToast(`${data.message}`, `${data.status}`);
      setState(!state);
      
    },
    onError: (error) => showToast(error.response?.data?.message || "An error occurred", "error")
  });

  const handleClick = () => {
    mutation.mutate(recipeId);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary"
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Loading..." : (state ? "Remove from favorites" : "Add to favorites")}
      <HeartIcon
        className={`size-6 ${state ? "text-red-500" : "text-white"}`}
      />
    </button>
  );
};

export default AddToFavorites;