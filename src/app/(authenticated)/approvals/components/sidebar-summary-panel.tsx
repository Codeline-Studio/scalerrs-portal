'use client';

type SidebarSummaryPanelProps = {
  counts: {
    keywords: number;
    briefs: number;
    articles: number;
    backlinks: number;
    quickwins: number;
  };
  totalApproved: number;
  totalPending: number;
};

const SidebarSummaryPanel = ({ counts, totalApproved, totalPending }: SidebarSummaryPanelProps) => {
  // Calculate the percentage for the progress circle
  const percentage = totalPending > 0 ? (totalApproved / (totalApproved + totalPending)) * 100 : 0;
  const dashOffset = 283 - (283 * percentage / 100);

  return (
    <div className="bg-white p-4 rounded-lg border border-lightGray">
      <h3 className="font-medium text-dark mb-3">Pending Approvals</h3>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="10"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#9EA8FB"
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{totalApproved} of {totalApproved + totalPending}</span>
            <span className="text-xs text-mediumGray">items</span>
          </div>
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between py-2 border-b border-lightGray">
          <span>Keyword Plans</span>
          <span className="font-medium">{counts.keywords}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-lightGray">
          <span>Briefs</span>
          <span className="font-medium">{counts.briefs}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-lightGray">
          <span>Articles</span>
          <span className="font-medium">{counts.articles}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-lightGray">
          <span>Link Lists</span>
          <span className="font-medium">{counts.backlinks}</span>
        </div>
        {counts.quickwins > 0 && (
          <div className="flex justify-between py-2">
            <span>Quick Wins</span>
            <span className="font-medium">{counts.quickwins}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSummaryPanel;
