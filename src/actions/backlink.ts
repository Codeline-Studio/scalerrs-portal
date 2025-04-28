'use server';

import { cache } from 'react';

export const getBacklinkData = cache(async () => {
  return [
    {
      id: 1,
      targetUrl: '/blog/seo-strategy-2024',
      sourceDomain: 'searchenginejournal.com',
      domainRating: 86,
      linkType: 'Guest Post',
      status: 'Live',
      dateAcquired: '2024-03-15'
    },
    {
      id: 2,
      targetUrl: '/services/technical-seo',
      sourceDomain: 'moz.com',
      domainRating: 92,
      linkType: 'Resource Link',
      status: 'Pending',
      dateAcquired: 'Scheduled for April'
    },
    {
      id: 3,
      targetUrl: '/case-studies/ecommerce-seo',
      sourceDomain: 'semrush.com',
      domainRating: 89,
      linkType: 'Mention',
      status: 'Live',
      dateAcquired: '2024-02-28'
    },
    {
      id: 4,
      targetUrl: '/blog/local-seo-guide',
      sourceDomain: 'ahrefs.com',
      domainRating: 90,
      linkType: 'Resource Link',
      status: 'Live',
      dateAcquired: '2024-03-10'
    },
    {
      id: 5,
      targetUrl: '/services/content-marketing',
      sourceDomain: 'contentmarketinginstitute.com',
      domainRating: 82,
      linkType: 'Guest Post',
      status: 'Pending',
      dateAcquired: 'Scheduled for April'
    },
  ];
});

export type Backlink = {
  id: number;
  targetUrl: string;
  sourceDomain: string;
  domainRating: number;
  linkType: string;
  status: string;
  dateAcquired: string;
}
