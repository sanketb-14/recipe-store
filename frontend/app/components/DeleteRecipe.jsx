import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteRecipe } from "../lib/data-service";
import { useToast } from "../hooks/useToast";


const DeleteRecipe = ({ user, recipeId }) => {
  const queryClient = useQueryClient();
  const recipes = user?.data?.recipes || [];
  const recipeIds = recipes.map((item) => item.id);
  const {showToast} = useToast()

  const { isPending, mutate, data, error } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast("Recipe deleted successfully", "success");
      
    },
    onError:(err) =>showToast("Error deleting","error")
  });

  
  const canDelete = recipeIds.includes(recipeId);

  return (
    <>
      {canDelete && (
        <button
          onClick={() => mutate({recipeId})}
          disabled={isPending}
          className="btn btn-error btn-sm"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      )}
    </>
  );
};

export default DeleteRecipe;
