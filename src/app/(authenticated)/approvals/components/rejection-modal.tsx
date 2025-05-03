'use client';

import { useState } from 'react';

export default function RejectionModal({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium text-dark mb-2">Request Changes</h3>
        <p className="text-mediumGray text-sm mb-4">Please provide details about the changes needed:</p>
        <textarea
          className="w-full border border-lightGray rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          placeholder="Describe the changes needed..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-mediumGray bg-lightGray rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (reason.trim()) {
                onConfirm(reason);
                setReason('');
              }
            }}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium rounded-scalerrs transition-colors ${reason.trim() ? 'text-white bg-primary hover:bg-primary/80' : 'text-white bg-primary/50 cursor-not-allowed'}`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
