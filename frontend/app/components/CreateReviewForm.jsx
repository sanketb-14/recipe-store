import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; // Assuming you're using axios for API calls

const ReviewForm = ({ recipeId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const queryClient = useQueryClient();

  const createOrUpdateReview = async (data) => {
    const response = await axios.post(`/api/recipes/${recipeId}/reviews`, data);
    return response.data;
  };

  const mutation = useMutation(createOrUpdateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recipe', recipeId]);
      reset(); // Reset form after successful submission
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          {...register('rating', { 
            required: 'Rating is required', 
            min: { value: 1, message: 'Rating must be at least 1' },
            max: { value: 5, message: 'Rating must not exceed 5' }
          })}
        />
        {errors.rating && <span>{errors.rating.message}</span>}
      </FormRow>

      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          {...register('comment', { required: 'Comment is required' })}
        />
        {errors.comment && <span>{errors.comment.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit Review'}
      </button>

      {mutation.isError && <div>An error occurred: {mutation.error.message}</div>}
    </form>
  );
};

export default ReviewForm;