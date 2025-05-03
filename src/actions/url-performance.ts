'use server';

import { cache } from 'react';
import { Record, FieldSet } from 'airtable';
import { fetchAirtableData } from '@/lib/airtable-connection';
import { mockURLData } from '@/lib/mock-data/mock-url-data';

// Define the URL data type based on our application needs
export interface UrlData {
  id: string;
  url: string;
  title: string;
  currentRank: number;
  targetRank: number;
  traffic: number;
  conversion: string;
  status: string;
}

// Define the exact structure of the Airtable fields
interface AirtableUrlFields extends FieldSet {
  'URL Path'?: string;
  'Title'?: string;
  'Current Rank'?: number;
  'Target Rank'?: number;
  'Traffic'?: number;
  'Clicks Last Month'?: number;
  'Conversion Rate'?: number;
  'Status'?: string;
  'Base URL'?: string;
  'Full URL'?: string;
  'Page Type (Main)'?: string;
  'Country'?: string;
  'Client'?: string | string[];
}

// Type-safe mapping function
const mapRecordToUrlData = (record: Record<AirtableUrlFields>): UrlData => ({
  id: record.id,
  url: record.get('URL Path') || '',
  title: record.get('Title') || '',
  currentRank: record.get('Current Rank') || 0,
  targetRank: record.get('Target Rank') || 0,
  traffic: record.get('Traffic') || record.get('Clicks Last Month') || 0,
  conversion: `${record.get('Conversion Rate') || 0}%`,
  status: record.get('Status') || 'Pending'
});

// Cache the result to prevent unnecessary API calls
export const getUrlData = cache(async (): Promise<UrlData[]> => {
  return fetchAirtableData<UrlData, AirtableUrlFields>(
    'URL Performance',
    mockURLData,
    mapRecordToUrlData
  );
});
