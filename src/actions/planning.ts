'use server';

import { cache } from 'react';

export const getPlanningData = cache(async () => {
  return [
    {
      id: 1,
      month: 'April 2024',
      focusKeywords: ['seo strategy guide', 'technical seo services'],
      contentPieces: 3,
      backlinksPlanned: 5,
      technicalFixes: 8,
      expectedTrafficIncrease: '15%'
    },
    {
      id: 2,
      month: 'May 2024',
      focusKeywords: ['local seo guide', 'ecommerce seo case study'],
      contentPieces: 4,
      backlinksPlanned: 6,
      technicalFixes: 5,
      expectedTrafficIncrease: '18%'
    },
    {
      id: 3,
      month: 'June 2024',
      focusKeywords: ['content marketing services', 'seo roi calculation'],
      contentPieces: 3,
      backlinksPlanned: 7,
      technicalFixes: 4,
      expectedTrafficIncrease: '12%'
    },
  ];
});

export type Planning = {
  id: number;
  month: string;
  focusKeywords: string[];
  contentPieces: number;
  backlinksPlanned: number;
  technicalFixes: number;
  expectedTrafficIncrease: string;
}
