import React from "react";

const GraphSkeleton = () => {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 rounded-xl p-5 flex flex-col justify-end">
      {/* Skeleton bars container */}
      <div className="flex items-end justify-between h-full gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-md animate-pulse"
            style={{
              height: `${40 + Math.random() * 50}%`, // variable bar heights
            }}
          ></div>
        ))}
      </div>

      {/* Bottom labels skeleton */}
      <div className="flex justify-between mt-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-6 bg-gray-300 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GraphSkeleton;
