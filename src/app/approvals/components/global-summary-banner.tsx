'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface GlobalSummaryBannerProps {
  counts: {
    keywords: number;
    briefs: number;
    articles: number;
    backlinks: number;
    quickwins: number;
  };
}

export default function GlobalSummaryBanner({ counts }: GlobalSummaryBannerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const categoriesCount = Object.values(counts).filter(count => count > 0).length;

  const handleTabChange = (tabId: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams?.toString());
    // Set the tab parameter
    params.set('tab', tabId);
    // Navigate to the new URL
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="card bg-[#FFF8E1] p-4 rounded-lg mb-6 border border-[#FFE082]" style={{ color: '#353233' }}>
      <p className="font-medium">You have {totalCount} items awaiting your review across {categoriesCount} categories</p>
      <div className="text-sm mt-1">
        Jump to: {' '}
        {counts.keywords > 0 && (
          <button
            className="text-primary hover:underline ml-2"
            onClick={() => handleTabChange('keywords')}
          >
            Keyword Plans ({counts.keywords})
          </button>
        )}
        {counts.briefs > 0 && (
          <button
            className="text-primary hover:underline ml-2"
            onClick={() => handleTabChange('briefs')}
          >
            Briefs ({counts.briefs})
          </button>
        )}
        {counts.articles > 0 && (
          <button
            className="text-primary hover:underline ml-2"
            onClick={() => handleTabChange('articles')}
          >
            Articles ({counts.articles})
          </button>
        )}
        {counts.backlinks > 0 && (
          <button
            className="text-primary hover:underline ml-2"
            onClick={() => handleTabChange('backlinks')}
          >
            Link Lists ({counts.backlinks})
          </button>
        )}
        {counts.quickwins > 0 && (
          <button
            className="text-primary hover:underline ml-2"
            onClick={() => handleTabChange('quickwins')}
          >
            Quick Wins ({counts.quickwins})
          </button>
        )}
      </div>
    </div>
  );
}
