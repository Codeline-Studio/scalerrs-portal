export type TabName = 'urls' | 'keywords' | 'uplift' | 'backlinks' | 'planning';

export interface SearchParams {
  tab?: string;
}

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}
