'use client';

import React from 'react';

export function TabContentLoader() {
  return (
    <div className="w-full py-12">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3 text-mediumGray">Loading content...</span>
      </div>
    </div>
  );
}
