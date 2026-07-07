# セットアップ手順

このドキュメントは **人間が実行する手順** のみを記載しています。

## 前提条件

以下のアカウント・ツールが必要です：

- GitHub アカウント
- Supabase アカウント
- Vercel アカウント
- Node.js 22+

## 1. リポジトリのクローン

```bash
git clone https://github.com/suhara-gif/hojokin-navi.git
cd hojokin-navi
npm install
```

## 2. Supabase設定

### 2.1 プロジェクト作成（済み）

✅ すでに作成済み: `grwijlqbububkexglgql`

### 2.2 API キーの取得

Supabaseダッシュボード → Settings → API

- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon public
- `SUPABASE_SERVICE_ROLE_KEY`: service_role (秘密鍵)

## 3. Vercel設定

### 3.1 プロジェクト作成（済み）

✅ すでに作成済み: `hojokin-navi`

### 3.2 環境変数の設定（済み）

✅ 以下の環境変数はすでに設定済み：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

### 3.3 Deploy Hook の作成 ⚠️ **要対応**

1. https://vercel.com/suhara-uptyjps-projects/hojokin-navi/settings/git にアクセス
2. 「Deploy Hooks」セクションで「Create Hook」をクリック
3. 以下を入力：
   - Name: `GitHub Actions Daily ETL`
   - Branch: `main`
4. 「Create Hook」をクリック
5. 生成されたURLをコピー
6. GitHubリポジトリのSettings → Secrets → Actions で以下を実行：

```bash
! gh secret set VERCEL_DEPLOY_HOOK
# プロンプトでURLを貼り付け
```

## 4. GitHub Token の更新 ⚠️ **要対応**

現在のトークンには `workflow` スコープがありません。

1. https://github.com/settings/tokens/new?description=claude-code-hojokin-navi&scopes=repo,workflow,write:packages,read:org にアクセス
2. トークンを生成
3. 以下のコマンドで認証：

```bash
! gh auth login --with-token
# プロンプトでトークンを貼り付け
```

4. ワークフローファイルをプッシュ：

```bash
git push
```

## 5. ローカル開発

```bash
# 環境変数ファイルを作成
cp .env.local.example .env.local
# .env.local を編集してAPIキーを設定

# 開発サーバー起動
npm run dev
```

http://localhost:3000 でアクセス

## 6. ETLの手動実行

```bash
npm run etl
```

初回実行でモックデータ2件が追加されます。

## 7. デプロイ

```bash
# Vercelに手動デプロイ
vercel --prod
```

GitHubにpushすると自動デプロイされます。

## 8. 無人運用の確認

### Daily ETL（毎日JST 5:00）

- `.github/workflows/daily-etl.yml` が自動実行
- jGrants APIからデータ取得 → Supabase更新 → Vercel再ビルド

### 動作確認

1. GitHub Actions タブで「Daily ETL」ワークフローを確認
2. 「Run workflow」で手動実行してテスト
3. 成功すれば自動運用開始

## トラブルシューティング

### Next.js脆弱性警告

```bash
rm -rf node_modules package-lock.json
npm install
```

### Vercel Deploy Hook が動かない

- GitHub Secrets に `VERCEL_DEPLOY_HOOK` が設定されているか確認
- Vercel設定画面でDeploy Hookが有効か確認

### ETLが失敗する

- jGrants APIが400エラーを返す場合、モックデータで動作します
- Supabase接続情報が正しいか確認

## 独自ドメイン移行手順

1. Vercel設定画面で独自ドメインを追加
2. DNS設定（CNAMEレコード）
3. `NEXT_PUBLIC_SITE_URL` を更新
4. Vercelで `*.vercel.app` → 独自ドメイン の301リダイレクトを設定

## 今後の拡張

- Google Search Console連携（週次SEO分析）
- Google Analytics 4連携
- 自動改善PR生成（ANTHROPIC_API_KEY設定後）
