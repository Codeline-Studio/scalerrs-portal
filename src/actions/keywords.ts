'use server';

import { cache } from 'react';

export const getKeywordData = cache(async () => {
  return [
    {
      id: 1,
      keyword: 'seo strategy guide',
      volume: 2400,
      difficulty: 68,
      currentRank: 8,
      targetRank: 3,
      targetPage: '/blog/seo-strategy-2024',
      status: 'Improving'
    },
    {
      id: 2,
      keyword: 'technical seo services',
      volume: 1800,
      difficulty: 72,
      currentRank: 12,
      targetRank: 5,
      targetPage: '/services/technical-seo',
      status: 'Stable'
    },
    {
      id: 3,
      keyword: 'ecommerce seo case study',
      volume: 720,
      difficulty: 45,
      currentRank: 6,
      targetRank: 1,
      targetPage: '/case-studies/ecommerce-seo',
      status: 'Improving'
    },
    {
      id: 4,
      keyword: 'local seo guide',
      volume: 3600,
      difficulty: 65,
      currentRank: 15,
      targetRank: 7,
      targetPage: '/blog/local-seo-guide',
      status: 'New Target'
    },
    {
      id: 5,
      keyword: 'content marketing services',
      volume: 2900,
      difficulty: 74,
      currentRank: 9,
      targetRank: 3,
      targetPage: '/services/content-marketing',
      status: 'Improving'
    },
  ];
});

export type KeywordData = {
  id: number;
  keyword: string;
  volume: number;
  difficulty: number;
  currentRank: number;
  targetRank: number;
  targetPage: string;
  status: string;
}
