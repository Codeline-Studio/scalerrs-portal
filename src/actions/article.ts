import { cache } from 'react'
import { Record, FieldSet } from 'airtable'
import { fetchAirtableData } from '@/lib/airtable-connection'
import { TABLES } from '@/lib/airtable-tables'
import { Month } from '@/types'

// ---- Article Statuses ----
export const ARTICLE_STATUS = Object.freeze({
  IN_PRODUCTION: 'In Production',
  REVIEW_DRAFT: 'Review Draft',
  DRAFT_APPROVED: 'Draft Approved',
  TO_BE_PUBLISHED: 'To Be Published',
  LIVE: 'Live',
} as const)
export type ArticleStatus = typeof ARTICLE_STATUS[keyof typeof ARTICLE_STATUS];

// ---- Field constants ----
export const ARTICLE_FIELDS = {
  ID: 'id',
  TITLE: 'Title',
  WRITER: 'Content Writer',
  EDITOR: 'Content Editor',
  CLIENT: 'Client',
  WORD_COUNT: 'Word Count',
  DUE_DATE: 'Due Date',
  DOCUMENT_LINK: 'Document Link',
  ARTICLE_URL: 'Article URL',
  MONTH: 'Month',
  STATUS: 'Status',
  PUBLICATION_STATUS: 'Publication Status',
  BRIEF: 'Brief',
  SEO_SPECIALIST: 'SEO Specialist',
  CONTENT_OPTIMIZATION_SCORE: 'Content Optimization Score',
} as const

// ---- Article Type ----
export type Article = {
  [ARTICLE_FIELDS.ID]: string;
  [ARTICLE_FIELDS.TITLE]: string;
  [ARTICLE_FIELDS.WRITER]?: string | string[];
  [ARTICLE_FIELDS.EDITOR]?: string | string[];
  [ARTICLE_FIELDS.CLIENT]?: string | string[];
  [ARTICLE_FIELDS.WORD_COUNT]?: number;
  [ARTICLE_FIELDS.DUE_DATE]?: string;
  [ARTICLE_FIELDS.DOCUMENT_LINK]?: string;
  [ARTICLE_FIELDS.ARTICLE_URL]?: string;
  [ARTICLE_FIELDS.MONTH]?: Month;
  [ARTICLE_FIELDS.STATUS]: ArticleStatus;
  [ARTICLE_FIELDS.PUBLICATION_STATUS]?: string;
  [ARTICLE_FIELDS.BRIEF]?: string[];
  [ARTICLE_FIELDS.SEO_SPECIALIST]?: string;
  [ARTICLE_FIELDS.CONTENT_OPTIMIZATION_SCORE]?: number;
}

// ---- Airtable Record Field Type ----
type AirtableArticleFields = FieldSet & {
  [ARTICLE_FIELDS.TITLE]?: string;
  [ARTICLE_FIELDS.WRITER]?: string | string[];
  [ARTICLE_FIELDS.EDITOR]?: string | string[];
  [ARTICLE_FIELDS.CLIENT]?: string | string[];
  [ARTICLE_FIELDS.WORD_COUNT]?: number;
  [ARTICLE_FIELDS.DUE_DATE]?: string;
  [ARTICLE_FIELDS.DOCUMENT_LINK]?: string;
  [ARTICLE_FIELDS.ARTICLE_URL]?: string;
  [ARTICLE_FIELDS.MONTH]?: Month;
  [ARTICLE_FIELDS.STATUS]?: ArticleStatus;
  [ARTICLE_FIELDS.PUBLICATION_STATUS]?: string;
  [ARTICLE_FIELDS.BRIEF]?: string[];
  [ARTICLE_FIELDS.SEO_SPECIALIST]?: string;
  [ARTICLE_FIELDS.CONTENT_OPTIMIZATION_SCORE]?: number;
}

// ---- Mapper ----
export const mapRecordToArticle = (
  record: Record<AirtableArticleFields>,
): any => ({
  id: record.id,
  title: record.get(ARTICLE_FIELDS.TITLE) || '',
  contentWriter: record.get(ARTICLE_FIELDS.WRITER) ?? undefined,
  contentEditor: record.get(ARTICLE_FIELDS.EDITOR) ?? undefined,
  client: record.get(ARTICLE_FIELDS.CLIENT) ?? undefined,
  wordCount: record.get(ARTICLE_FIELDS.WORD_COUNT) ?? 0,
  dueDate: record.get(ARTICLE_FIELDS.DUE_DATE) ?? '',
  documentLink: record.get(ARTICLE_FIELDS.DOCUMENT_LINK) ?? '',
  articleUrl: record.get(ARTICLE_FIELDS.ARTICLE_URL) ?? '',
  month: (record.get(ARTICLE_FIELDS.MONTH) as Month) ?? undefined,
  status: (record.get(ARTICLE_FIELDS.STATUS) as ArticleStatus) ??
    ARTICLE_STATUS.IN_PRODUCTION,
  publicationStatus: record.get(ARTICLE_FIELDS.PUBLICATION_STATUS) ?? undefined,
  brief: record.get(ARTICLE_FIELDS.BRIEF) ?? [],
  seoSpecialist: record.get(ARTICLE_FIELDS.SEO_SPECIALIST) ?? '',
  contentOptimizationScore: record.get(
    ARTICLE_FIELDS.CONTENT_OPTIMIZATION_SCORE) ?? 0,
})

// ---- Table fetcher ----
export const getAllArticles = cache(async (): Promise<Article[]> => {
  return fetchAirtableData<Article, AirtableArticleFields>(
    TABLES.ARTICLES,
    mapRecordToArticle,
  )
})
