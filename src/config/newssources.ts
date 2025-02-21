import { NewsSource } from '../types/news';

export const newsSources: NewsSource[] = [
  {
    name: '薬事ニュース',
    url: 'https://pnb.jiho.jp/pnb/feed',
    type: 'rss'
  },
  {
    name: '日経新聞',
    url: 'https://www.nikkei.com/technology/healthcare.rss',
    type: 'rss'
  },
  {
    name: 'PR TIMES',
    url: 'https://prtimes.jp/main/html/rd/p/company_id.xml',
    type: 'rss'
  }
]; 