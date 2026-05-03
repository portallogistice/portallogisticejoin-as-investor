import React from 'react';

export default function LoadingState() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Period selector skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        ))}
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-64">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-64">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
