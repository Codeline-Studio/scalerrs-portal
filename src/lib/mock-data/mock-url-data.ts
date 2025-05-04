// Mock data for URL performance
import { UrlData } from '@/actions/url-performance';

export const mockURLData: UrlData[] = [
  {
    id: 'rec1',
    url: '/blog/seo-strategy-2024',
    title: 'SEO Strategy Guide for 2024',
    currentRank: 8,
    targetRank: 3,
    traffic: 1250,
    conversion: '2.4%',
    status: 'Optimizing'
  },
  {
    id: 'rec2',
    url: '/services/technical-seo',
    title: 'Technical SEO Services',
    currentRank: 12,
    targetRank: 5,
    traffic: 850,
    conversion: '3.1%',
    status: 'Monitoring'
  },
  {
    id: 'rec3',
    url: '/case-studies/ecommerce-seo',
    title: 'E-commerce SEO Case Study',
    currentRank: 6,
    targetRank: 1,
    traffic: 1450,
    conversion: '4.2%',
    status: 'Optimizing'
  },
  {
    id: 'rec4',
    url: '/blog/local-seo-guide',
    title: 'Complete Local SEO Guide',
    currentRank: 15,
    targetRank: 7,
    traffic: 720,
    conversion: '1.8%',
    status: 'Planned'
  },
  {
    id: 'rec5',
    url: '/services/content-marketing',
    title: 'Content Marketing Services',
    currentRank: 9,
    targetRank: 3,
    traffic: 980,
    conversion: '2.9%',
    status: 'Optimizing'
  }
];
