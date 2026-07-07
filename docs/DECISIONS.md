# 実装決定ログ

## 2026-07-08

### フェーズ2：環境構築

#### 完了した作業
- ✅ GitHubリポジトリ作成: https://github.com/suhara-gif/hojokin-navi
- ✅ Supabaseプロジェクト作成: grwijlqbububkexglgql (ap-northeast-1)
- ✅ データベーススキーマ適用完了
- ✅ Next.js 15.3.1 プロジェクト初期化
- ✅ Vercel プロジェクト作成: hojokin-navi
- ✅ Vercel 環境変数設定完了
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - NEXT_PUBLIC_SITE_URL
- ✅ GitHub Secrets設定完了
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
  - SITE_URL

#### 保留中の作業
- ⏳ Vercel Deploy Hook作成（Web UIで手動作成が必要）
  1. https://vercel.com/suhara-uptyjps-projects/hojokin-navi/settings/git にアクセス
  2. "Deploy Hooks" セクションで新規作成
  3. Name: "GitHub Actions Daily ETL"
  4. Branch: "main"
  5. 生成されたURLを `gh secret set VERCEL_DEPLOY_HOOK` で設定

- ⏳ Next.js 15.3.1 セキュリティ警告解決
  - 現在のデプロイは動作しているが、Vercelがセキュリティ警告を出している
  - package-lock.json の再生成が必要（`rm -rf node_modules package-lock.json && npm install`）

#### 技術的な決定

**Next.js バージョン**
- 当初 15.3.0 でセットアップ → CVE-2025-66478 脆弱性のため 15.3.1 に更新
- turbopack設定はnext.config.tsから削除（experimental.turbopackは廃止済み）

**Supabase構成**
- Region: ap-northeast-1（東京）
- マイグレーションファイル配置: `supabase/migrations/`
- RLS有効化・匿名読み取り許可

**Vercel構成**
- Team: suhara-uptyjps-projects
- プロジェクトID: prj_WzXBLyKrKgFwjpeLplpijqBDcNTk
- デプロイURL: https://hojokin-navi-164uco1kn-suhara-uptyjps-projects.vercel.app
- 本番URL（予定）: https://hojokin-navi.vercel.app

**ドメイン戦略**
- 初期: *.vercel.app で開始
- 独自ドメイン移行時: Vercel設定で301リダイレクト実装
- README.mdに移行手順を明記

## 次のステップ

### フェーズ3：ページ実装
1. jGrants API実レスポンス確認
2. ETLスクリプト実装 (`scripts/etl/jgrants-sync.ts`)
3. Supabaseクライアント設定
4. ページコンポーネント実装
   - トップページ
   - 詳細ページ
   - 一覧ページ
5. JSON-LD / OGP / サイトマップ
6. GA4タグ埋め込み（NEXT_PUBLIC_GA4_ID使用）
7. 運営者情報・プライバシーポリシー・免責事項ページ
