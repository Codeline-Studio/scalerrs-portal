// Define types for approval items
export type ApprovalItem = {
  id: number;
  item: string;
  status: string;
  dateSubmitted: string;
  lastUpdated: string;
  strategist: string;
  dateApproved?: string;
  revisionReason?: string;
};

export type KeywordApprovalItem = ApprovalItem & {
  volume: number;
  difficulty: string;
};

export type BriefApprovalItem = ApprovalItem & {
  type: string;
};

export type ArticleApprovalItem = ApprovalItem & {
  wordCount: number;
};

export type BacklinkApprovalItem = ApprovalItem & {
  count: number;
};

export type QuickWinApprovalItem = ApprovalItem & {
  pages: number;
};

export type ApprovalItems = {
  keywords: KeywordApprovalItem[];
  briefs: BriefApprovalItem[];
  articles: ArticleApprovalItem[];
  backlinks: BacklinkApprovalItem[];
  quickwins: QuickWinApprovalItem[];
};

// Sample approval data
const approvalItems: ApprovalItems = {
  keywords: [
    { id: 1, item: 'enterprise seo services', volume: 1200, difficulty: 'High', status: 'awaiting_approval', dateSubmitted: '2025-04-01', lastUpdated: '2 days ago', strategist: 'Taylor Roberts' },
    { id: 2, item: 'seo agency for saas', volume: 880, difficulty: 'Medium', status: 'awaiting_approval', dateSubmitted: '2025-04-01', lastUpdated: '2 days ago', strategist: 'Taylor Roberts' },
    { id: 3, item: 'b2b seo strategy', volume: 720, difficulty: 'Medium', status: 'resubmitted', dateSubmitted: '2025-03-30', lastUpdated: '3 days ago', strategist: 'Alex Johnson' },
    { id: 4, item: 'content marketing for tech', volume: 1500, difficulty: 'High', status: 'approved', dateSubmitted: '2025-03-28', dateApproved: '2025-03-29', lastUpdated: '5 days ago', strategist: 'Taylor Roberts' },
    { id: 5, item: 'seo for startups', volume: 2200, difficulty: 'High', status: 'approved', dateSubmitted: '2025-03-25', dateApproved: '2025-03-26', lastUpdated: '8 days ago', strategist: 'Alex Johnson' },
    { id: 6, item: 'link building services', volume: 1800, difficulty: 'Very High', status: 'needs_revision', dateSubmitted: '2025-03-22', dateApproved: '2025-03-23', revisionReason: 'Too competitive for current resources', lastUpdated: '10 days ago', strategist: 'Sarah Williams' },
  ],
  briefs: [
    { id: 1, item: 'Customer Onboarding Brief', type: 'Frase', status: 'awaiting_approval', dateSubmitted: '2025-04-02', lastUpdated: '2 days ago', strategist: 'Taylor Roberts' },
    { id: 2, item: 'Keyword Research Brief', type: 'Google Doc', status: 'needs_revision', dateSubmitted: '2025-04-01', lastUpdated: 'April 18', strategist: 'Taylor Roberts' },
    { id: 3, item: 'Conversion Optimization Brief', type: 'Google Doc', status: 'needs_revision', dateSubmitted: '2025-03-31', lastUpdated: 'April 12', strategist: 'Taylor Roberts' },
    { id: 4, item: 'Competitor Analysis Brief', type: 'Google Doc', status: 'needs_revision', dateSubmitted: '2025-03-30', lastUpdated: 'April 8', strategist: 'Taylor Roberts' },
    { id: 5, item: 'Benchmark Review', type: 'Google Doc', status: 'approved', dateSubmitted: '2025-03-28', dateApproved: '2025-03-29', lastUpdated: 'April 8', strategist: 'Taylor Roberts' },
  ],
  articles: [
    { id: 1, item: 'Ultimate Guide to Enterprise SEO in 2025', wordCount: 2500, status: 'awaiting_approval', dateSubmitted: '2025-04-02', lastUpdated: '2 days ago', strategist: 'Sarah Williams' },
    { id: 2, item: 'How to Choose the Right SEO Agency for Your SaaS', wordCount: 1800, status: 'awaiting_approval', dateSubmitted: '2025-04-01', lastUpdated: '3 days ago', strategist: 'Alex Johnson' },
    { id: 3, item: 'B2B SEO Strategy: A Step-by-Step Guide', wordCount: 2200, status: 'resubmitted', dateSubmitted: '2025-03-31', lastUpdated: '4 days ago', strategist: 'Taylor Roberts' },
    { id: 4, item: '10 Content Marketing Tactics for Tech Companies', wordCount: 1500, status: 'approved', dateSubmitted: '2025-03-27', dateApproved: '2025-03-28', lastUpdated: '7 days ago', strategist: 'Sarah Williams' },
    { id: 5, item: 'SEO for Startups: A Complete Playbook', wordCount: 3000, status: 'approved', dateSubmitted: '2025-03-24', dateApproved: '2025-03-25', lastUpdated: '10 days ago', strategist: 'Alex Johnson' },
  ],
  backlinks: [
    { id: 1, item: 'Tech Industry Backlink Package', count: 15, status: 'awaiting_approval', dateSubmitted: '2025-04-02', lastUpdated: '2 days ago', strategist: 'Sarah Williams' },
    { id: 2, item: 'SaaS Niche Link Building', count: 8, status: 'approved', dateSubmitted: '2025-03-25', dateApproved: '2025-03-26', lastUpdated: '9 days ago', strategist: 'Alex Johnson' },
  ],
  quickwins: [
    { id: 1, item: 'Meta Description Updates', pages: 12, status: 'awaiting_approval', dateSubmitted: '2025-04-01', lastUpdated: '3 days ago', strategist: 'Taylor Roberts' },
    { id: 2, item: 'Internal Linking Improvements', pages: 8, status: 'approved', dateSubmitted: '2025-03-20', dateApproved: '2025-03-21', lastUpdated: '14 days ago', strategist: 'Sarah Williams' },
  ]
};

// Server action to get all approval items
export async function getApprovalItems(): Promise<ApprovalItems> {
  // In a real app, you would fetch this data from a database
  // For now, we'll just return the mock data
  return approvalItems;
}

// Calculate counts for pending items in each category
export function getPendingCounts(items: ApprovalItems) {
  return {
    keywords: items.keywords.filter(item => ['awaiting_approval', 'resubmitted'].includes(item.status)).length,
    briefs: items.briefs.filter(item => ['awaiting_approval', 'resubmitted'].includes(item.status)).length,
    articles: items.articles.filter(item => ['awaiting_approval', 'resubmitted'].includes(item.status)).length,
    backlinks: items.backlinks.filter(item => ['awaiting_approval', 'resubmitted'].includes(item.status)).length,
    quickwins: items.quickwins.filter(item => ['awaiting_approval', 'resubmitted'].includes(item.status)).length,
  };
}

// Server action to approve an item
export async function approveItem(
  category: keyof ApprovalItems,
  id: number
): Promise<{ success: boolean }> {
  // In a real app, you would update this in a database
  // For now, we just simulate the approval
  const itemIndex = approvalItems[category].findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    approvalItems[category][itemIndex] = {
      ...approvalItems[category][itemIndex],
      status: 'approved',
      dateApproved: new Date().toISOString().split('T')[0]
    };
    return { success: true };
  }

  return { success: false };
}

// Server action to request changes for an item
export async function requestChanges(
  category: keyof ApprovalItems,
  id: number,
  reason: string
): Promise<{ success: boolean }> {
  // In a real app, you would update this in a database
  // For now, we just simulate the change request
  const itemIndex = approvalItems[category].findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    approvalItems[category][itemIndex] = {
      ...approvalItems[category][itemIndex],
      status: 'needs_revision',
      revisionReason: reason
    };
    return { success: true };
  }

  return { success: false };
}
