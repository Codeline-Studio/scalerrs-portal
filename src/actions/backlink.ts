'use server';

import { cache } from 'react';
import Airtable from 'airtable';
import { Base, FieldSet, Record } from 'airtable';
import { mockBacklinks } from '@/lib/mock-data/mock-backlinks';

// Define Backlink type based on the Airtable response structure
export interface Backlink {
  id: string;
  targetUrl: string;
  sourceDomain: string;
  domainRating: number;
  linkType: string;
  status: string;
  dateAcquired: string;
  anchorText?: string;
  secondaryAnchorText?: string;
  pageUrl?: string;
  pageTraffic?: number;
  monthlyDomainTraffic?: number;
  cost?: number;
  paymentStatus?: string;
  personResponsible?: string;
  notes?: string;
  month?: string;
}

// Define the exact structure of the Airtable fields based on provided example
interface AirtableBacklinkFields extends FieldSet {
  'Backlink Name'?: string;
  'Client'?: string[];
  'Source Domain'?: string;
  'Target URL'?: string[];
  'Domain Authority/Rating'?: number;
  'Monthly Domain Traffic'?: number;
  'Page URL'?: string;
  'Page Traffic'?: number;
  'Referring Domains to Page'?: number;
  'Link Type'?: string;
  'Status'?: string;
  'Went Live On'?: string;
  'Month'?: string;
  'Anchor Text'?: string;
  'Secondary Anchor Text'?: string;
  'Cost'?: number;
  'Payment Status'?: string;
  'Person Responsible'?: string;
  'Notes'?: string;
}

// Environment variables for Airtable
const apiKey = process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const hasAirtableCredentials = !!(apiKey && baseId);

// Initialize Airtable base connection if credentials exist
let airtableBase: Base | undefined;
if (hasAirtableCredentials) {
  const airtable = new Airtable({ apiKey });
  airtableBase = airtable.base(baseId!);
}

// Type-safe mapping function
const mapRecordToBacklink = (record: Record<AirtableBacklinkFields>): Backlink => ({
  id: record.id,
  targetUrl: record.get('Target URL')?.[0] || record.get('Page URL') || '/unknown',
  sourceDomain: record.get('Source Domain') || '',
  domainRating: record.get('Domain Authority/Rating') || 0,
  linkType: record.get('Link Type') || '',
  status: record.get('Status') || 'Pending',
  dateAcquired: record.get('Went Live On') || '',
  anchorText: record.get('Anchor Text') || '',
  secondaryAnchorText: record.get('Secondary Anchor Text') || '',
  pageUrl: record.get('Page URL') || '',
  pageTraffic: record.get('Page Traffic') || 0,
  monthlyDomainTraffic: record.get('Monthly Domain Traffic') || 0,
  cost: record.get('Cost') || 0,
  paymentStatus: record.get('Payment Status') || '',
  personResponsible: record.get('Person Responsible') || '',
  notes: record.get('Notes') || '',
  month: record.get('Month') || '',
});

// Cache the result to prevent unnecessary API calls
export const getBacklinkData = cache(async (): Promise<Backlink[]> => {
  // If Airtable credentials are not available, return mock data
  if (!hasAirtableCredentials || !airtableBase) {
    console.log('Using mock backlink data (no Airtable credentials)');
    return mockBacklinks;
  }

  // Use mock data if explicitly enabled through env vars
  const shouldUseMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  if (shouldUseMockData) {
    console.log('Using mock backlink data (mock data enabled)');
    return mockBacklinks;
  }

  try {
    console.log('Fetching backlinks from Airtable...');

    // Fetch backlink records from Airtable with proper typing
    // We need to cast the result since Airtable's types aren't perfect
    const records = await airtableBase('Backlinks').select().all();
    const typedRecords = records as unknown as Record<AirtableBacklinkFields>[];

    console.log(`Successfully fetched ${typedRecords.length} backlink records from Airtable`);

    // Map records directly to our Backlink type
    return typedRecords.map(mapRecordToBacklink);
  } catch (error) {
    console.error('Error fetching backlinks from Airtable:', error);
    console.log('Falling back to mock backlink data');
    return mockBacklinks;
  }
});
