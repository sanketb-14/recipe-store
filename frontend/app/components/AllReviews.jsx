"use client"

import React from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchReviews = async (recipeId) => {
  const { data } = await axios.get(`${baseUrl}/api/v1/recipe/${recipeId}/reviews`);

  return data.reviews;
};

const AllReviews = ({ recipeId }) => {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', recipeId],
    queryFn: () => fetchReviews(recipeId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

//   console.log("reviews", reviews);

  if (isLoading) return <div className="text-center">Loading reviews...</div>;
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  if (!reviews || reviews.length === 0) {
    return <h1 className='text-3xl flex mt-4 justify-center'>No Reviews...</h1>
  }

  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200 grid grid-cols-2 gap-4 bg-base-100">
        {reviews.map((review) => (
          <li key={review.id} className="px-4 py-4 sm:px-6 rounded-lg shadow-xl">
            
            <div className="flex items-center space-x-4">
              <img
                className="h-10 w-10 rounded-full"
                src={review.user.profilePic || 'https://via.placeholder.com/40'}
                alt={review.user.username}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate ">
                  {review.user.username}
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-2 text-sm text-accent text-center">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllReviews;