import { NewsCollector } from './services/newsCollector';
import * as cron from 'node-cron';

async function main() {
  const collector = new NewsCollector();

  // 毎日午前10時に実行
  cron.schedule('0 10 * * *', async () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    console.log(`\n==========================================`);
    console.log(`${dateStr} のニュース収集を開始します...`);
    console.log(`==========================================`);
    
    try {
      const news = await collector.collectAllNews();
      console.log(`${news.length}件のニュースを取得しました`);
      
      // ここに後ほどOpenAIでの要約処理とSlackへの投稿処理を追加
      
    } catch (error) {
      console.error('ニュース収集中にエラーが発生しました:', error);
    }
  });

  const startTime = new Date().toLocaleString('ja-JP');
  console.log(`[${startTime}] ニュース監視を開始しました（毎日午前10時に実行）`);
}

main().catch(console.error);
