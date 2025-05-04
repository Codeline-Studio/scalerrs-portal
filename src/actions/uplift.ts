'use server';

import { cache } from 'react';

export const getUpliftData = cache(async () => {
  return [
    {
      id: 1,
      url: '/blog/seo-strategy-2024',
      currentTraffic: 1250,
      potentialTraffic: 3800,
      upliftPercentage: 204,
      primaryKeyword: 'seo strategy guide',
      secondaryKeywords: 4,
      priority: 'High'
    },
    {
      id: 2,
      url: '/services/technical-seo',
      currentTraffic: 850,
      potentialTraffic: 2100,
      upliftPercentage: 147,
      primaryKeyword: 'technical seo services',
      secondaryKeywords: 6,
      priority: 'Medium'
    },
    {
      id: 3,
      url: '/case-studies/ecommerce-seo',
      currentTraffic: 1450,
      potentialTraffic: 2800,
      upliftPercentage: 93,
      primaryKeyword: 'ecommerce seo case study',
      secondaryKeywords: 3,
      priority: 'High'
    },
    {
      id: 4,
      url: '/blog/local-seo-guide',
      currentTraffic: 720,
      potentialTraffic: 4500,
      upliftPercentage: 525,
      primaryKeyword: 'local seo guide',
      secondaryKeywords: 8,
      priority: 'Critical'
    },
    {
      id: 5,
      url: '/services/content-marketing',
      currentTraffic: 980,
      potentialTraffic: 1850,
      upliftPercentage: 89,
      primaryKeyword: 'content marketing services',
      secondaryKeywords: 5,
      priority: 'Medium'
    },
  ];
});

export type Uplift = {
  id: number;
  url: string;
  currentTraffic: number;
  potentialTraffic: number;
  upliftPercentage: number;
  primaryKeyword: string;
  secondaryKeywords: number;
  priority: string;
}
