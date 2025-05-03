'use server';

import { cache } from 'react';
import { Record, FieldSet } from 'airtable';
import { fetchAirtableData } from '@/lib/airtable-connection';
import { mockKeywordData } from '@/lib/mock-data/mock-keyword-data'; // Updated import path to use mockKeywordData

export interface KeywordData {
  id: string | number;
  keyword: string;
  volume: number;
  difficulty: number;
  currentRank: number;
  targetRank: number;
  targetPage: string;
  status: string;
}

// Define the exact structure of the Airtable fields
interface AirtableKeywordFields extends FieldSet {
  Keyword?: string;
  Client?: string[];
  'Target Page'?: string[] | string;
  'Search Volume'?: number;
  Difficulty?: number;
  'Current Rank'?: number;
  'Target Rank'?: number;
  Status?: string;
}

// Define structure for URL Performance data
interface UrlPageData {
  id: string;
  urlPath?: string;
}

interface UrlPageField extends FieldSet {
  'URL Path'?: string;
}

// Cache the URL Performance data to avoid repeated API calls
export const getUrlPerformanceData = cache(
  async (): Promise<Map<string, string>> => {
    const urlPageMap = new Map<string, string>();

    try {
      const urlData = await fetchAirtableData<UrlPageData, UrlPageField>(
        'URL Performance',
        [],
        (rec: Record<UrlPageField>): UrlPageData => {
          return {
            id: rec.id,
            urlPath: rec.get('URL Path') || '',
          };
        }
      );

      urlData.forEach((item) => {
        if (item.urlPath) {
          urlPageMap.set(item.id, item.urlPath);
        }
      });

      console.log(`Cached ${urlPageMap.size} URL paths for quick lookup`);
    } catch (error) {
      console.error('Error fetching URL Performance data:', error);
    }

    return urlPageMap;
  }
);

// Type-safe mapping function that uses the pre-fetched URL data
const mapRecordToKeywordData = (
  record: Record<AirtableKeywordFields>,
  urlPathMap: Map<string, string>
): KeywordData => {
  // Handle the Target Page field which might be an array of record IDs
  let targetPage = '';
  let urlPath = '';

  const targetPageValue = record.get('Target Page');
  if (Array.isArray(targetPageValue) && targetPageValue.length > 0) {
    targetPage = targetPageValue[0];
    // Look up the URL path from our pre-fetched map
    urlPath = urlPathMap.get(targetPage) || '';
  } else if (typeof targetPageValue === 'string') {
    targetPage = targetPageValue;
    // Look up the URL path from our pre-fetched map
    urlPath = urlPathMap.get(targetPage) || '';
  }

  return {
    id: record.id,
    keyword: record.get('Keyword') || '',
    volume: record.get('Search Volume') || 0,
    difficulty: record.get('Difficulty') || 0,
    currentRank: record.get('Current Rank') || 0,
    targetRank: record.get('Target Rank') || 0,
    targetPage: urlPath,
    status: record.get('Status') || '',
  };
};

// Cache the result to prevent unnecessary API calls
export const getKeywordData = cache(async (): Promise<KeywordData[]> => {
  // First, fetch all URL Performance data once
  const urlPathMap = await getUrlPerformanceData();

  return fetchAirtableData<KeywordData, AirtableKeywordFields>(
    'Keyword Performance',
    mockKeywordData,
    (record) => mapRecordToKeywordData(record, urlPathMap)
  );
});
