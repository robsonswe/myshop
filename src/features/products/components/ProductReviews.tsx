import { useState } from 'react';
import ReviewCard from './ReviewCard';
import { Review } from '@/entities/review/model/types';
interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews } : ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("newest");

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "newest":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="mt-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          <p className="text-gray-600 mt-1">{averageRating} out of 5 ({reviews.length} reviews)</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
      
      <div className="grid gap-6">
        {sortedReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
}