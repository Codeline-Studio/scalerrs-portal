'use server';

import { cache } from 'react';
import { Record, FieldSet } from 'airtable';
import { fetchAirtableData } from '@/lib/airtable-connection';
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
  Client?: string[];
  'Source Domain'?: string;
  'Target URL'?: string[];
  'Domain Authority/Rating'?: number;
  'Monthly Domain Traffic'?: number;
  'Page URL'?: string;
  'Page Traffic'?: number;
  'Referring Domains to Page'?: number;
  'Link Type'?: string;
  Status?: string;
  'Went Live On'?: string;
  Month?: string;
  'Anchor Text'?: string;
  'Secondary Anchor Text'?: string;
  Cost?: number;
  'Payment Status'?: string;
  'Person Responsible'?: string;
  Notes?: string;
}

// Type-safe mapping function
const mapRecordToBacklink = (
  record: Record<AirtableBacklinkFields>
): Backlink => ({
  id: record.id,
  targetUrl:
    record.get('Target URL')?.[0] || record.get('Page URL') || '/unknown',
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
  return fetchAirtableData<Backlink, AirtableBacklinkFields>(
    'Backlinks',
    mockBacklinks,
    mapRecordToBacklink
  );
});
