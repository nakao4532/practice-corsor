import Parser from 'rss-parser';
import axios from 'axios';
import { NewsItem, NewsSource } from '../types/news';
import { newsSources } from '../config/newssources';

export class NewsCollector {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['category', 'categories'],
        ],
      },
    });
  }

  private isHealthcareRelated(item: any): boolean {
    const keywords = [
      '薬局', 'ドラッグストア', '薬機法', '医療', '調剤',
      '厚生労働省', '医薬品', '処方箋', '薬剤師'
    ];

    const text = `${item.title} ${item.description || ''}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
  }

  async collectFromRSS(source: NewsSource): Promise<NewsItem[]> {
    try {
      const feed = await this.parser.parseURL(source.url);
      const items: NewsItem[] = feed.items
        .filter(item => this.isHealthcareRelated(item))
        .map(item => ({
          title: item.title || '',
          link: item.link || '',
          description: item.description,
          pubDate: item.pubDate,
          source: source.name,
          category: item.categories || []
        }));

      return items;
    } catch (error) {
      console.error(`Error collecting news from ${source.name}:`, error);
      return [];
    }
  }

  private async collectFromScrape(source: NewsSource): Promise<NewsItem[]> {
    try {
      const response = await axios.get(source.url);
      // ここでスクレイピングのロジックを実装
      // cheerio等のライブラリを使用することを推奨
      console.log(`${source.name}のスクレイピングは未実装です`);
      return [];
    } catch (error) {
      console.error(`Error scraping from ${source.name}:`, error);
      return [];
    }
  }

  async collectAllNews(): Promise<NewsItem[]> {
    const allNews: NewsItem[] = [];
    
    for (const source of newsSources) {
      try {
        let news: NewsItem[] = [];
        if (source.type === 'rss') {
          news = await this.collectFromRSS(source);
        } else if (source.type === 'scrape') {
          news = await this.collectFromScrape(source);
        }
        console.log(`${source.name}から${news.length}件のニュースを取得しました`);
        allNews.push(...news);
      } catch (error) {
        console.error(`Error collecting news from ${source.name}:`, error);
      }
    }

    return allNews;
  }
} 