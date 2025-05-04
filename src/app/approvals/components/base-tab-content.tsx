'use client';

import { useEffect, useState } from 'react';
import ApprovalTable from './approval-table';
import { getApprovalItems, ApprovalItems, ApprovalItem } from '@/actions/approvals';

interface BaseTabContentProps {
  items: ApprovalItem[];
  categoryKey: keyof ApprovalItems;
}

export default function BaseTabContent({ items: initialItems, categoryKey }: BaseTabContentProps) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState('all');

  const tabReviewCount = items.filter(
    item => ['awaiting_approval', 'resubmitted'].includes(item.status)
  ).length;

  // Filter items based on filter
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return ['awaiting_approval', 'resubmitted'].includes(item.status);
    return item.status === filter;
  });

  // Handle updates to items
  const handleItemsUpdated = async () => {
    const updatedApprovalItems = await getApprovalItems();
    setItems(updatedApprovalItems[categoryKey]);
  };

  return (
    <>
      {/* Tab-level header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <p className="font-medium">You have {tabReviewCount} item{tabReviewCount !== 1 ? 's' : ''} to review in this section</p>
        </div>

        {tabReviewCount > 0 && (
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-scalerrs hover:bg-primary/80 transition-colors">
              Approve All
            </button>
            <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-scalerrs hover:bg-primary/10 transition-colors">
              Request Changes
            </button>
          </div>
        )}
      </div>

      {/* Table View */}
      <div className="overflow-hidden">
        {filteredItems.length > 0 ? (
          <ApprovalTable
            items={filteredItems}
            categoryKey={categoryKey}
            onItemsUpdated={handleItemsUpdated}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-mediumGray">No items found in this section.</p>
          </div>
        )}
      </div>
    </>
  );
}
