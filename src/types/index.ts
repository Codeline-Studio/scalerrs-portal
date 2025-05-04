// Define types for our data
// months.ts  (date‑fns version)
import { getMonth } from 'date-fns'
import { Article } from '@/actions/article'

/* -------- Canonical names that match Airtable's single‑select exactly ------ */
export const MONTH = Object.freeze({
  JANUARY: 'January',
  FEBRUARY: 'February',
  MARCH: 'March',
  APRIL: 'April',
  MAY: 'May',
  JUNE: 'June',
  JULY: 'July',
  AUGUST: 'August',
  SEPTEMBER: 'September',
  OCTOBER: 'October',
  NOVEMBER: 'November',
  DECEMBER: 'December',
} as const)

/* ---- Compile‑time union & ordered array (0 = January … 11 = December) ----- */
export type Month = typeof MONTH[keyof typeof MONTH];
export const MONTH_ORDER = Object.values(MONTH) as Month[]

/* ---------------- Current month in Airtable‑ready wording ------------------ */
export const currentMonth = (): Month => MONTH_ORDER[getMonth(new Date())]
export type ContentTab = 'briefs' | 'articles';
export type MainTab = 'content' | 'backlinks';

// User type
export interface User {
  id: string;
  Name: string;
  Email: string;
  Role: string;
  CreatedAt?: string;
  'Last Login'?: string;
  Client?: string[];
  Notifications?: string[];
  Comments?: string[];
  Tasks?: string[];
  Briefs?: string[];
}

// Task type
export interface Task {
  id: string;
  Title: string;
  Name?: string;
  Description?: string;
  Status: string;
  Priority?: string;
  AssignedTo?: string[];
  CreatedAt?: string;
}

// Comment type
export interface Comment {
  id: string;
  Title?: string;
  Comment: string;
  Task?: string[];
  User?: string[];
  CreatedAt?: string;
  'Created Time'?: string;

  [key: string]: any;
}

// Backlink type
export interface Backlink {
  id: string;
  Domain?: string;
  'Source Domain'?: string;
  DomainRating?: number;
  'Domain Authority/Rating'?: number;
  LinkType?: 'Guest Post' | 'Directory' | 'Niche Edit';
  'Link Type'?: 'Guest Post' | 'Directory' | 'Niche Edit';
  TargetPage?: string;
  'Target URL'?: string[];
  Status: BacklinkStatus;
  WentLiveOn?: string;
  'Went Live On'?: string;
  Month?: Month;
  Notes?: string;

  [key: string]: any; // Allow for additional fields from Airtable
}

// KPI Metric type
export interface KPIMetric {
  id: string;
  MetricName: string;
  'Metric Name'?: string;
  CurrentValue: number;
  'Current Value'?: number;
  PreviousValue?: number;
  'Previous Value'?: number;
  ChangePercentage?: number;
  'Delta/Change'?: number;
  Goal?: number;
  TargetValue?: number;
  'Target Value'?: number;
  Trend?: 'up' | 'down';
  Unit?: string;
  Client?: string[];
  Date?: string;
  'KPI Timestamp'?: string;

  [key: string]: any; // Allow for additional fields from Airtable
}

// URL Performance type
export interface URLPerformance {
  id: string;
  URLPath: string;
  PageTitle?: string;
  Clicks?: number;
  Impressions?: number;
  CTR?: number;
  AveragePosition?: number;
  Client?: string[];
  Date?: string;
}

// Keyword Performance type
export interface KeywordPerformance {
  id: string;
  Keyword: string;
  Volume?: number;
  Difficulty?: number;
  CurrentPosition?: number;
  PreviousPosition?: number;
  PositionChange?: number;
  URL?: string;
  Client?: string[];
  Date?: string;
}

// Monthly Projections type
export interface MonthlyProjection {
  id: string;
  Month: string;
  Year: string;
  'Current Trajectory': number;
  'KPI Goal/Target': number;
  'Required Trajectory': number;
  Client?: string[];

  [key: string]: any; // Allow for additional fields from Airtable
}


