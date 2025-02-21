import { NewsSource } from '../types/news';

export const newsSources: NewsSource[] = [
  {
    name: '薬事ニュース',
    url: 'https://pnb.jiho.jp/pnb/',
    type: 'scrape'
  },
  {
    name: '日経クロステック',
    url: 'https://xtech.nikkei.com/rss/xtech-hlth.rdf',
    type: 'rss'
  },
  {
    name: 'PR TIMES',
    url: 'https://prtimes.jp/index.rdf',
    type: 'rss'
  }
]; 