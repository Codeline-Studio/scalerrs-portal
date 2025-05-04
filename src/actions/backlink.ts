'use server'

import { cache } from 'react'
import { Record, FieldSet } from 'airtable'
import { fetchAirtableData } from '@/lib/airtable-connection'
import { TABLES } from '@/lib/airtable-tables'

// ---- Backlink Status ----
const BACKLINK_STATUS = Object.freeze({
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  LIVE: 'Live',
  LOST: 'Lost',
} as const)
export type BacklinkStatus = typeof BACKLINK_STATUS[keyof typeof BACKLINK_STATUS];

// ---- Field constants ----
const BACKLINK_FIELDS = {
  ID: 'id',
  BACKLINK_NAME: 'Backlink Name',
  CLIENT: 'Client',
  SOURCE_DOMAIN: 'Source Domain',
  TARGET_URL: 'Target URL',
  DOMAIN_RATING: 'Domain Authority/Rating',
  MONTHLY_TRAFFIC: 'Monthly Domain Traffic',
  PAGE_URL: 'Page URL',
  PAGE_TRAFFIC: 'Page Traffic',
  REFERRING_DOMAINS: 'Referring Domains to Page',
  LINK_TYPE: 'Link Type',
  STATUS: 'Status',
  DATE_LIVE: 'Went Live On',
  MONTH: 'Month',
  ANCHOR_TEXT: 'Anchor Text',
  SECONDARY_ANCHOR: 'Secondary Anchor Text',
  COST: 'Cost',
  PAYMENT_STATUS: 'Payment Status',
  PERSON_RESPONSIBLE: 'Person Responsible',
  NOTES: 'Notes',
} as const

// ---- Backlink Type ----
export type Backlink = {
  id: string;
  targetUrl: string;
  sourceDomain: string;
  domainRating: number;
  linkType: string;
  status: BacklinkStatus;
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

// ---- Airtable Record Field Type ----
type AirtableBacklinkFields = FieldSet & {
  [BACKLINK_FIELDS.BACKLINK_NAME]?: string;
  [BACKLINK_FIELDS.CLIENT]?: string[];
  [BACKLINK_FIELDS.SOURCE_DOMAIN]?: string;
  [BACKLINK_FIELDS.TARGET_URL]?: string[];
  [BACKLINK_FIELDS.DOMAIN_RATING]?: number;
  [BACKLINK_FIELDS.MONTHLY_TRAFFIC]?: number;
  [BACKLINK_FIELDS.PAGE_URL]?: string;
  [BACKLINK_FIELDS.PAGE_TRAFFIC]?: number;
  [BACKLINK_FIELDS.REFERRING_DOMAINS]?: number;
  [BACKLINK_FIELDS.LINK_TYPE]?: string;
  [BACKLINK_FIELDS.STATUS]?: BacklinkStatus;
  [BACKLINK_FIELDS.DATE_LIVE]?: string;
  [BACKLINK_FIELDS.MONTH]?: string;
  [BACKLINK_FIELDS.ANCHOR_TEXT]?: string;
  [BACKLINK_FIELDS.SECONDARY_ANCHOR]?: string;
  [BACKLINK_FIELDS.COST]?: number;
  [BACKLINK_FIELDS.PAYMENT_STATUS]?: string;
  [BACKLINK_FIELDS.PERSON_RESPONSIBLE]?: string;
  [BACKLINK_FIELDS.NOTES]?: string;
}

// ---- Mapper ----
const mapRecordToBacklink = (
  record: Record<AirtableBacklinkFields>,
): Backlink => ({
  id: record.id,
  targetUrl: record.get(BACKLINK_FIELDS.TARGET_URL)?.[0] ||
    record.get(BACKLINK_FIELDS.PAGE_URL) || '/unknown',
  sourceDomain: record.get(BACKLINK_FIELDS.SOURCE_DOMAIN) || '',
  domainRating: record.get(BACKLINK_FIELDS.DOMAIN_RATING) || 0,
  linkType: record.get(BACKLINK_FIELDS.LINK_TYPE) || '',
  status: (record.get(BACKLINK_FIELDS.STATUS) as BacklinkStatus) ??
    BACKLINK_STATUS.PENDING,
  dateAcquired: record.get(BACKLINK_FIELDS.DATE_LIVE) || '',
  anchorText: record.get(BACKLINK_FIELDS.ANCHOR_TEXT) || '',
  secondaryAnchorText: record.get(BACKLINK_FIELDS.SECONDARY_ANCHOR) || '',
  pageUrl: record.get(BACKLINK_FIELDS.PAGE_URL) || '',
  pageTraffic: record.get(BACKLINK_FIELDS.PAGE_TRAFFIC) || 0,
  monthlyDomainTraffic: record.get(BACKLINK_FIELDS.MONTHLY_TRAFFIC) || 0,
  cost: record.get(BACKLINK_FIELDS.COST) || 0,
  paymentStatus: record.get(BACKLINK_FIELDS.PAYMENT_STATUS) || '',
  personResponsible: record.get(BACKLINK_FIELDS.PERSON_RESPONSIBLE) || '',
  notes: record.get(BACKLINK_FIELDS.NOTES) || '',
  month: record.get(BACKLINK_FIELDS.MONTH) || '',
})

// ---- Table fetcher ----
export const getBacklinkData = cache(async (): Promise<Backlink[]> => {
  return fetchAirtableData<Backlink, AirtableBacklinkFields>(
    TABLES.BACKLINKS,
    mapRecordToBacklink,
  )
})
