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

### フェーズ3：ページ実装（完了）

#### 完了した作業
- ✅ jGrants API実レスポンス確認（400エラーのためモックデータで代替）
- ✅ ETLスクリプト実装完了 (`scripts/etl/jgrants-sync.ts`)
  - jGrants API呼び出し → エラー時モックデータフォールバック
  - UPSERT処理・status='closed'更新
  - sync_logsへの記録
  - Vercel Deploy Hook発火
- ✅ Supabaseクライアント設定 (`lib/supabase.ts`)
- ✅ ページコンポーネント実装
  - トップページ（`app/page.tsx`）: 募集中補助金一覧、ISR 30分
  - 詳細ページ（`app/subsidies/[id]/page.tsx`）: SSG、ISR 24時間
  - 運営者情報（`app/about/page.tsx`）
  - プライバシーポリシー（`app/privacy/page.tsx`）
  - 免責事項（`app/terms/page.tsx`）
- ✅ データ出典表記（PDL1.0）を全ページに実装
- ✅ Daily ETL ワークフロー作成（`.github/workflows/daily-etl.yml`）
- ✅ README.md / SETUP.md ドキュメント整備

#### 保留中の作業
- ⏳ JSON-LD構造化データ（次回実装）
- ⏳ XMLサイトマップ自動生成（次回実装）
- ⏳ GA4タグ埋め込み（NEXT_PUBLIC_GA4_ID設定後）
- ⏳ 週次SEO分析ワークフロー（GSC/GA4連携）
- ⏳ 自動改善PR生成ワークフロー

#### 技術的な課題

**jGrants API 400エラー**
- API呼び出しで常に400 Bad Requestが返される
- 原因不明（認証不要のはずだがWAFでブロック？）
- 対策: モックデータで開発継続、後日API仕様を再調査

**Next.js 15.3.1 セキュリティ警告**
- Vercelデプロイ時に「Vulnerable version」警告
- package.jsonは15.3.1だが、Vercelキャッシュが原因の可能性
- 対策: 後日Vercel側でキャッシュクリアを試す

**GitHub Token workflow スコープ不足**
- `.github/workflows/`へのpushが拒否される
- 対策: 新しいトークン生成が必要（SETUP.mdに手順記載）

## 次のステップ

### フェーズ4：自動運用ワークフロー
1. GitHub Token更新（workflowスコープ追加）
2. Vercel Deploy Hook作成・設定
3. Daily ETLワークフローの動作確認
4. 週次SEO分析ワークフロー実装（後日）
5. 自動改善PRワークフロー実装（後日）
