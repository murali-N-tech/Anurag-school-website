import React from 'react';

/**
 * A reusable skeleton loading card component.
 * It mimics the layout of the News and Event cards and uses a pulse animation.
 */
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Image Placeholder */}
      <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
      <div className="p-6">
        {/* Title Placeholder */}
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></div>
        {/* Date Placeholder */}
        <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse mb-4"></div>
        {/* Content Placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        {/* Button Placeholder */}
        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mt-6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
