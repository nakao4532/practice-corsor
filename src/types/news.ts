export interface NewsItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  source: string;
  category?: string[];
}

export interface NewsSource {
  name: string;
  url: string;
  type: 'rss' | 'api' | 'scrape';
} 