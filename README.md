# 補助金ナビ（仮）

jGrants APIを利用した補助金情報検索サイト。無人運用でSEO最適化とコンテンツ改善を自動化。

## 🚀 本番URL

- Production: https://hojokin-navi.vercel.app （予定）
- GitHub: https://github.com/suhara-gif/hojokin-navi

## 📋 機能

- **補助金検索**: jGrants APIから取得した補助金情報を検索
- **自動同期**: 毎日JST 5:00に最新データを取得
- **SSG + ISR**: 高速な静的生成とインクリメンタル再検証
- **SEO最適化**: 構造化データ、OGP対応
- **無人運用**: GitHub Actionsで完全自動化

## 🛠 技術スタック

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **API**: jGrants API (デジタル庁)
- **自動化**: GitHub Actions

## 📦 セットアップ

詳細は [SETUP.md](./SETUP.md) を参照。

### 必要な環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://hojokin-navi.vercel.app
VERCEL_DEPLOY_HOOK=your_deploy_hook_url
```

## 🔄 ETL処理

```bash
npm run etl
```

jGrants APIからデータを取得してSupabaseに同期。
GitHub Actionsで毎日自動実行。

## 📝 ライセンス・出典

本サイトで掲載している補助金情報は、デジタル庁が提供するjGrants APIから取得したデータを利用しています。

- データ出典: jGrants（デジタル庁）
- 利用規約: [公共データ利用規約（PDL1.0）](https://www.digital.go.jp/resources/open_data)

## 🔐 セキュリティ

- API キーは環境変数で管理
- Supabase RLS（Row Level Security）有効化
- GitHub Secrets で機密情報を保護

## 🚧 今後の予定

- [ ] 週次SEO分析レポート（GSC/GA4連携）
- [ ] 自動改善PR生成（claude-code-action）
- [ ] カテゴリ別・地域別一覧ページ
- [ ] 締切カレンダー表示
- [ ] 独自ドメイン移行

## 📞 問い合わせ

GitHub Issues: https://github.com/suhara-gif/hojokin-navi/issues
