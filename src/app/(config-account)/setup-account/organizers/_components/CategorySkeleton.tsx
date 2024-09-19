import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4 font-bold text-3xl text-first_violet ">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="ml-3">
                  <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                <div className="h-8 w-20 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CategorySkeleton;
