import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-8 w-1/3 bg-gray-200 rounded-md" />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-24 bg-gray-200 rounded-md" />
        <div className="h-24 bg-gray-200 rounded-md" />
        <div className="h-24 bg-gray-200 rounded-md" />
      </div>

      {/* Chart / Table area */}
      <div className="h-80 bg-gray-200 rounded-md" />

      {/* Table rows / list */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
