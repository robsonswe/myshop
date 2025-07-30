import React from 'react';
import { BsShare } from 'react-icons/bs';
import Rating from '@/components/ui/Rating';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white">
            <span className="text-xl font-medium text-gray-600">
              {review.reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{review.reviewerName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Rating stars={review.rating} />
              <time className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <BsShare className="text-lg" />
        </button>
      </div>
      <p className="mt-4 text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
}