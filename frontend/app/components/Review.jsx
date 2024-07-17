"use client";
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateReview } from '../lib/data-service';
import { useToast } from '../hooks/useToast';
import { StarIcon } from '@heroicons/react/24/solid';

const Review = ({ myProfile, recipeId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const existingReview = myProfile.user.reviews?.find(review => review.recipeId === recipeId);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
      setIsEditing(true);
    }
  }, [existingReview]);

  const mutation = useMutation({
    mutationFn: ({ rating, comment }) => createOrUpdateReview(recipeId, rating, comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['reviews']);
      showToast(data.message || 'Review submitted successfully', 'success');
      setIsEditing(true);
    },
    onError: (error) => {
      showToast(error.response?.data?.message || 'An error occurred', 'error');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      showToast('Please provide a valid rating between 1 and 5', 'error');
      return;
    }
    if (!comment.trim()) {
      showToast('Please provide a comment for your review', 'error');
      return;
    }
    mutation.mutate({ rating, comment });
  };

  return (
    <div className='w-full mt-4 bg-base-200 p-4 rounded-lg shadow'>
      <h2 className='text-2xl font-bold mb-4'>{isEditing ? 'Edit Your Review' : 'Write a Review'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Rating:</label>
          <div className='flex'>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='comment' className='block text-sm font-medium mb-1'>Comment:</label>
          <textarea
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full p-2 border rounded'
            rows='4'
          />
        </div>
        <button 
          type='submit' 
          className='btn btn-primary'
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Submitting...' : (isEditing ? 'Update Review' : 'Submit Review')}
        </button>
      </form>
      
    </div>
  );
};

export default Review;