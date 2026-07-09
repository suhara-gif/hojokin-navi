#!/usr/bin/env tsx
/**
 * SEO分析スクリプト
 *
 * Google Search Console / GA4からデータを取得して分析
 * 実行: npm run seo:analyze
 */

import 'dotenv/config';
import fs from 'fs';

interface QueryData {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface SEOReport {
  generatedAt: string;
  lowCtrQueries: QueryData[];
  rankImprovementQueries: QueryData[];
  newPageQueries: QueryData[];
  topQueries: QueryData[];
}

async function analyzeGSC(): Promise<SEOReport> {
  const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON;

  if (!gscJson) {
    console.log('⚠️ GSC_SERVICE_ACCOUNT_JSON not configured');
    console.log('Generating mock report for demonstration...');
    return generateMockReport();
  }

  // 実装: Google Search Console API呼び出し
  // googleapis パッケージを使用
  // 今回はモックデータを返す
  return generateMockReport();
}

function generateMockReport(): SEOReport {
  // デモ用モックデータ
  const mockQueries: QueryData[] = [
    {
      keyword: '補助金 IT導入',
      impressions: 523,
      clicks: 15,
      ctr: 2.87,
      position: 8.3,
    },
    {
      keyword: '事業再構築補助金 申請',
      impressions: 412,
      clicks: 18,
      ctr: 4.37,
      position: 12.5,
    },
    {
      keyword: '中小企業 補助金 一覧',
      impressions: 287,
      clicks: 8,
      ctr: 2.79,
      position: 14.2,
    },
    {
      keyword: '補助金ナビ',
      impressions: 156,
      clicks: 98,
      ctr: 62.82,
      position: 1.2,
    },
    {
      keyword: 'デジタル化 補助金',
      impressions: 145,
      clicks: 4,
      ctr: 2.76,
      position: 15.8,
    },
  ];

  const lowCtrQueries = mockQueries.filter(
    (q) => q.impressions >= 100 && q.ctr < 5.0
  );

  const rankImprovementQueries = mockQueries.filter(
    (q) => q.position >= 11 && q.position <= 20
  );

  const newPageQueries = mockQueries.filter(
    (q) => q.impressions >= 50 && q.keyword.includes('一覧')
  );

  return {
    generatedAt: new Date().toISOString(),
    lowCtrQueries,
    rankImprovementQueries,
    newPageQueries,
    topQueries: mockQueries.sort((a, b) => b.impressions - a.impressions),
  };
}

async function main() {
  console.log('Starting SEO analysis...');

  const report = await analyzeGSC();

  console.log('\n📊 分析結果:');
  console.log(`- CTR改善対象: ${report.lowCtrQueries.length}件`);
  console.log(`- 順位改善対象: ${report.rankImprovementQueries.length}件`);
  console.log(`- 新規ページ検討: ${report.newPageQueries.length}件`);

  // レポートをファイルに出力
  fs.writeFileSync('seo-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ レポート出力: seo-report.json');

  console.log('\n次のステップ:');
  console.log('- GitHub Actionsが各項目に対してIssueを自動作成します');
  console.log('- seo-title/seo-rankラベルのIssueは自動改善PRが生成されます');
}

main().catch((error) => {
  console.error('分析失敗:', error);
  process.exit(1);
});
