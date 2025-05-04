'use server'

import { cache } from 'react'
import { Record, FieldSet } from 'airtable'
import { fetchAirtableData } from '@/lib/airtable-connection'
import { TABLES } from '@/lib/airtable-tables'
import { Month } from '@/types'

// ---- Brief Status ----
const BRIEF_STATUS = Object.freeze({
  IN_PROGRESS: 'In Progress',
  NEEDS_INPUT: 'Needs Input',
  REVIEW_BRIEF: 'Review Brief',
  BRIEF_APPROVED: 'Brief Approved',
  NEEDS_REVIEW: 'Needs Review',
  APPROVED: 'Approved',
} as const)

export type BriefStatus = typeof BRIEF_STATUS[keyof typeof BRIEF_STATUS];

// ---- Field constants ----
const BRIEF_FIELDS = {
  ID: 'id',
  TITLE: 'Title',
  CLIENT: 'Client',
  SEO_STRATEGIST: 'SEO Strategist',
  DUE_DATE: 'Due Date',
  DOCUMENT_LINK: 'Document Link',
  FRASE_DOCUMENT_LINK: 'Frase Document Link',
  TARGET_KEYWORDS: 'Target Keywords',
  WORD_COUNT_TARGET: 'Word Count Target',
  MONTH: 'Month',
  STATUS: 'Status',
  CONTENT_WRITER: 'Content Writer',
  CONTENT_EDITOR: 'Content Editor',
  ARTICLES: 'Articles',
} as const

// ---- Brief Type ----
export type Brief = {
  id: string;
  title: string;
  client?: string | string[];
  seoStrategist?: string;
  dueDate?: string;
  documentLink?: string;
  fraseDocumentLink?: string;
  targetKeywords?: string;
  wordCountTarget?: number;
  month?: Month;
  status: BriefStatus;
  contentWriter?: string;
  contentEditor?: string;
  articles?: string[];
}

// ---- Airtable Record Field Type ----
type AirtableBriefFields = FieldSet & {
  [BRIEF_FIELDS.TITLE]?: string;
  [BRIEF_FIELDS.CLIENT]?: string | string[];
  [BRIEF_FIELDS.SEO_STRATEGIST]?: string;
  [BRIEF_FIELDS.DUE_DATE]?: string;
  [BRIEF_FIELDS.DOCUMENT_LINK]?: string;
  [BRIEF_FIELDS.FRASE_DOCUMENT_LINK]?: string;
  [BRIEF_FIELDS.TARGET_KEYWORDS]?: string;
  [BRIEF_FIELDS.WORD_COUNT_TARGET]?: number;
  [BRIEF_FIELDS.MONTH]?: Month;
  [BRIEF_FIELDS.STATUS]?: BriefStatus;
  [BRIEF_FIELDS.CONTENT_WRITER]?: string;
  [BRIEF_FIELDS.CONTENT_EDITOR]?: string;
  [BRIEF_FIELDS.ARTICLES]?: string[];
}

// ---- Mapper ----
const mapRecordToBrief = (
  record: Record<AirtableBriefFields>,
): Brief => ({
  id: record.id,
  title: record.get(BRIEF_FIELDS.TITLE) || '',
  client: record.get(BRIEF_FIELDS.CLIENT) ?? undefined,
  seoStrategist: record.get(BRIEF_FIELDS.SEO_STRATEGIST) ?? undefined,
  dueDate: record.get(BRIEF_FIELDS.DUE_DATE) ?? undefined,
  documentLink: record.get(BRIEF_FIELDS.DOCUMENT_LINK) ?? undefined,
  fraseDocumentLink: record.get(BRIEF_FIELDS.FRASE_DOCUMENT_LINK) ?? undefined,
  targetKeywords: record.get(BRIEF_FIELDS.TARGET_KEYWORDS) ?? undefined,
  wordCountTarget: record.get(BRIEF_FIELDS.WORD_COUNT_TARGET) ?? 0,
  month: record.get(BRIEF_FIELDS.MONTH) ?? undefined,
  status: (record.get(BRIEF_FIELDS.STATUS) as BriefStatus) ??
    BRIEF_STATUS.IN_PROGRESS,
  contentWriter: record.get(BRIEF_FIELDS.CONTENT_WRITER) ?? undefined,
  contentEditor: record.get(BRIEF_FIELDS.CONTENT_EDITOR) ?? undefined,
  articles: record.get(BRIEF_FIELDS.ARTICLES) ?? [],
})

// ---- Table fetcher ----
export const getAllBriefs = cache(async (): Promise<Brief[]> => {
  return fetchAirtableData<Brief, AirtableBriefFields>(
    TABLES.BRIEFS,
    mapRecordToBrief,
  )
})
