# 補助金ナビ プロジェクト設計書

## プロジェクト概要
jGrants APIを利用した補助金情報検索サイト。無人運用でSEO最適化とコンテンツ改善を自動化。

## 技術スタック
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **API**: jGrants API (デジタル庁)
- **自動化**: GitHub Actions
- **分析**: Google Analytics 4 (後日設定)

## URL設計

### 基本構造
```
/                           # トップページ（新着・注目案件）
/subsidies/[id]             # 補助金詳細
/search                     # 検索結果一覧
/category/[slug]            # カテゴリ別一覧
/region/[code]              # 地域別一覧
/category/[cat]/region/[reg] # 掛け合わせ一覧
/calendar                   # 締切カレンダー
/about                      # 運営者情報
/privacy                    # プライバシーポリシー
/terms                      # 利用規約
```

### 生成ルール
- 掲載件数3件未満のページは生成しない（薄いコンテンツ対策）
- 募集終了案件もアーカイブとして残す（status='closed'で表示）

## データベーススキーマ

### subsidies テーブル
```sql
CREATE TABLE subsidies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT,
  category TEXT,
  region_code TEXT,
  amount_min BIGINT,
  amount_max BIGINT,
  deadline TIMESTAMPTZ,
  application_start TIMESTAMPTZ,
  target_text TEXT,
  overview TEXT,
  url TEXT,
  status TEXT DEFAULT 'open', -- 'open', 'closed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subsidies_status ON subsidies(status);
CREATE INDEX idx_subsidies_deadline ON subsidies(deadline);
CREATE INDEX idx_subsidies_category ON subsidies(category);
CREATE INDEX idx_subsidies_region ON subsidies(region_code);
CREATE INDEX idx_subsidies_updated ON subsidies(updated_at DESC);
```

### sync_logs テーブル
```sql
CREATE TABLE sync_logs (
  id SERIAL PRIMARY KEY,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  added_count INT DEFAULT 0,
  updated_count INT DEFAULT 0,
  closed_count INT DEFAULT 0,
  total_count INT DEFAULT 0,
  error_message TEXT
);
```

## ETL処理フロー

### scripts/etl/jgrants-sync.ts
1. jGrants API `/subsidies` を呼び出し
2. 取得した案件を DB と比較
   - 新規 → INSERT
   - 既存 → 更新内容があれば UPDATE
   - DB にあるが API レスポンスにない → status='closed' に更新
3. sync_logs に実行ログを記録
4. 差分があれば Vercel Deploy Hook を発火

### 実行タイミング
- 毎日 JST 5:00（UTC 20:00）GitHub Actions で自動実行

## ページ生成戦略

### SSG + ISR
- 詳細ページ: `revalidate: 86400` (24時間)
- 一覧ページ: `revalidate: 3600` (1時間)
- トップページ: `revalidate: 1800` (30分)

### メタデータ最適化
- title: 「{案件名} | 補助金ナビ」
- description: overview の先頭120文字
- JSON-LD: 構造化データ（GovernmentService）
- OGP: og:image は自動生成（Vercel OG Image）

## SEO自動改善フロー

### 週次分析（月曜 JST 6:00）
Google Search Console / GA4 から以下を取得：
1. **CTR低クエリ（表示100回以上、CTR<5%）** → `seo-title` ラベルでIssue起票
2. **11〜20位クエリ** → `seo-rank` ラベルでIssue起票
3. **検索されるがページなしクエリ** → `seo-newpage` ラベルでIssue起票

### 自動改善（Issueトリガー）
`seo-*` ラベル付きIssueが作成されると：
1. claude-code-action が起動
2. title/meta/内部リンクを最適化
3. PRを自動生成
4. `safe-change` ラベルなら CI通過後に自動マージ

### 月次リマインダー（毎月1日 JST 6:00）
未処理の `seo-*` Issue を集計し、対応すべき作業をまとめたIssueを起票

## 環境変数

### Vercel
```
NEXT_PUBLIC_SITE_URL=https://hojokin-navi.vercel.app
NEXT_PUBLIC_GA4_ID=（後日設定）
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### GitHub Secrets
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
VERCEL_DEPLOY_HOOK
SITE_URL
ANTHROPIC_API_KEY（後日設定）
GSC_SERVICE_ACCOUNT_JSON（後日設定）
GA4_PROPERTY_ID（後日設定）
```

## 無人運用の受け入れ基準
1. ETLが募集中案件を全件同期できている
2. 詳細ページのLighthouse SEOスコアが95以上
3. 掲載3件未満の薄いページが存在しない
4. XMLサイトマップが自動更新される
5. 全4ワークフローがdry-runで成功している

## デフォルト決定事項
- サイト名: 「補助金ナビ（仮）」
- デザイン: 白基調・アクセント#2563EB・表示速度優先
- 収益化: 当面なし
- 対象範囲: jGrants掲載分のみ（自治体独自補助金は初期スコープ外）
- 募集終了案件: 削除せず「募集終了」表示で残す
- ドメイン: *.vercel.app で開始（独自ドメイン移行手順をREADMEに記載）
