"use client";

import { StatusBadge } from "./status-badge";
import { useState } from "react";
import RejectionModal from "./rejection-modal";
import {
  approveItem,
  requestChanges,
  ApprovalTableProps,
  KeywordApprovalItem,
  BriefApprovalItem,
  ArticleApprovalItem,
  BacklinkApprovalItem,
  QuickWinApprovalItem,
  ApprovalItem,
} from "@/actions/approvals";

export default function ApprovalTable({
  items,
  categoryKey,
  onItemsUpdated,
}: ApprovalTableProps) {
  const [rejectionModal, setRejectionModal] = useState({
    isOpen: false,
    itemId: 0,
  });

  const handleApprove = async (id: number) => {
    const result = await approveItem(categoryKey, id);
    if (result.success && onItemsUpdated) {
      onItemsUpdated();
    }
  };

  const handleRequestChanges = (id: number) => {
    setRejectionModal({ isOpen: true, itemId: id });
  };

  const confirmRequestChanges = async (reason: string) => {
    const result = await requestChanges(
      categoryKey,
      rejectionModal.itemId,
      reason
    );
    if (result.success && onItemsUpdated) {
      onItemsUpdated();
    }
    setRejectionModal({ isOpen: false, itemId: 0 });
  };

  const isBriefItem = (item: ApprovalItem): item is BriefApprovalItem =>
    "type" in item;
  const isArticleItem = (item: ApprovalItem): item is ArticleApprovalItem =>
    "wordCount" in item;
  const isKeywordItem = (item: ApprovalItem): item is KeywordApprovalItem =>
    "volume" in item;
  const isBacklinkItem = (item: ApprovalItem): item is BacklinkApprovalItem =>
    "count" in item;
  const isQuickWinItem = (item: ApprovalItem): item is QuickWinApprovalItem =>
    "pages" in item;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-lightGray">
          <thead>
            <tr className="bg-lightGray">
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray uppercase tracking-wider">
                Deliverable
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray uppercase tracking-wider">
                Strategist
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-mediumGray uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-lightGray">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-lightGray/30">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-start">
                    <div>
                      <div className="text-sm font-medium text-dark">
                        {item.item}
                      </div>
                      {isBriefItem(item) && (
                        <div className="text-xs text-mediumGray">
                          {item.type}
                        </div>
                      )}
                      {isArticleItem(item) && (
                        <div className="text-xs text-mediumGray">
                          {item.wordCount} words
                        </div>
                      )}
                      {isKeywordItem(item) && (
                        <div className="text-xs text-mediumGray">
                          Volume: {item.volume}
                        </div>
                      )}
                      {isBacklinkItem(item) && (
                        <div className="text-xs text-mediumGray">
                          {item.count} links
                        </div>
                      )}
                      {isQuickWinItem(item) && (
                        <div className="text-xs text-mediumGray">
                          {item.pages} pages
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-dark">{item.strategist}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-mediumGray">
                    {item.lastUpdated}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  {(item.status === "awaiting_approval" ||
                    item.status === "resubmitted" ||
                    item.status === "needs_revision") && (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1 text-xs font-medium text-white bg-primary rounded-scalerrs hover:bg-primary/80 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequestChanges(item.id)}
                        className="px-3 py-1 text-xs font-medium text-primary border border-primary rounded-scalerrs hover:bg-primary/10 transition-colors"
                      >
                        Request Changes
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RejectionModal
        isOpen={rejectionModal.isOpen}
        onClose={() => setRejectionModal({ isOpen: false, itemId: 0 })}
        onConfirm={confirmRequestChanges}
      />
    </>
  );
}
