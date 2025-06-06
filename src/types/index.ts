// Define types for our data
export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type ContentTab = 'briefs' | 'articles';
export type MainTab = 'content' | 'backlinks';

// Brief statuses
export type BriefStatus = 'In Progress' | 'Needs Input' | 'Review Brief' | 'Brief Approved' | 'Needs Review' | 'Approved' | 'Review Brief';

// Article statuses
export type ArticleStatus = 'In Production' | 'Review Draft' | 'Draft Approved' | 'To Be Published' | 'Live';

// Backlink statuses
export type BacklinkStatus = 'Live' | 'Scheduled' | 'Rejected';

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

// Brief type
export interface Brief {
  id: string;
  Title: string;
  Client?: string | string[];
  SEOStrategist?: string;
  DueDate?: string;
  DocumentLink?: string;
  FraseDocumentLink?: string;
  TargetKeywords?: string;
  WordCountTarget?: number;
  Month?: Month;
  Status: BriefStatus;
  ContentWriter?: string;
  ContentEditor?: string;
  Articles?: string[];
  [key: string]: any; // Allow for additional fields from Airtable
}

// Article type
export interface Article {
  id: string;
  Title: string;
  Writer?: string | string[];
  Editor?: string | string[];
  'Content Writer'?: string | string[];
  'Content Editor'?: string | string[];
  Client?: string | string[];
  WordCount?: number;
  'Word Count'?: number;
  DueDate?: string;
  'Due Date'?: string;
  DocumentLink?: string;
  'Document Link'?: string;
  ArticleURL?: string;
  'Article URL'?: string;
  Month?: Month;
  Status: ArticleStatus;
  'Publication Status'?: string;
  Brief?: string[];
  'SEO Specialist'?: string;
  'Content Optimization Score'?: number;
  [key: string]: any; // Allow for additional fields from Airtable
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
