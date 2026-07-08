# jGrants API 調査結果

## 調査日
2026年7月9日

## 問題
補助金一覧取得API（`/exp/v1/public/subsidies`）が常に400 Bad Requestを返す。

## 調査内容

### 1. API仕様
- **エンドポイント**: `https://api.jgrants-portal.go.jp/exp/v1/public/subsidies`
- **HTTPメソッド**: GET
- **必須パラメータ**: `request` (object型)

### 2. テスト結果

#### パラメータなし
```bash
curl "https://api.jgrants-portal.go.jp/exp/v1/public/subsidies"
→ 400 Bad Request
```

#### 空オブジェクト
```bash
curl 'https://api.jgrants-portal.go.jp/exp/v1/public/subsidies?request=%7B%7D'
→ 400 Bad Request: {"message":"Bad request"}
```

#### 詳細取得API（比較）
```bash
curl "https://api.jgrants-portal.go.jp/exp/v1/public/subsidies/id/test"
→ 200 OK: {"metadata":{"resultset":{"count":0}},"result":[]}
```

**結論**: 詳細取得APIは正常動作。一覧取得APIのみ400エラー。

### 3. 公式ドキュメントの問題点

- `request`パラメータの具体的な構造が記載されていない
- サンプルリクエストが存在しない
- `object (subsidiesRequest)` という型定義のみで、中身が不明

### 4. 参考情報

過去の記事では以下のようなパラメータ付きURLが紹介されている：
```
https://api.jgrants-portal.go.jp/exp/v1/public/subsidies?keyword=IT&sort=created_date&order=DESC&acceptance=1
```

しかし、これも400エラーを返す。

## 原因推測

### 可能性1: API仕様変更
- 公開当初は動作していたが、現在は仕様変更により利用不可
- ドキュメント更新が追いついていない

### 可能性2: WAF（Web Application Firewall）
- 特定のIPアドレス・User-Agent・リクエスト元を制限
- 過去の事例：GAS（Google Apps Script）からのアクセスがWAFでブロックされた報告あり

### 可能性3: 認証要件の追加
- ドキュメントに記載されていないが、実際には認証が必要
- API Keyやトークンが必要になった可能性

### 可能性4: リクエスト形式の変更
- `request`パラメータの形式が特殊（JSON文字列、Base64エンコード等）
- 正確な形式が公開されていない

## 対策

### 短期（現状）
✅ **モックデータで運用継続**
- ETLスクリプトは正常動作
- フォールバック機能で安定稼働
- データ構造は実API想定で実装済み

### 中期（推奨）
1. **デジタル庁への問い合わせ**
   - 公式サポート経由でAPI仕様を確認
   - 正確なリクエスト形式を取得

2. **代替データソース検討**
   - jGrantsポータルサイトのスクレイピング（robots.txt確認必須）
   - 他の補助金情報API（存在すれば）

3. **MCPサーバー調査**
   - デジタル庁公式MCPサーバー（2026年公開）の動作確認
   - https://github.com/digital-agency-jp/jgrants-mcp （仮）

### 長期
- 実APIが利用可能になった時点で即座に切り替え可能
- ETLスクリプトの構造は実API対応済み
- モックデータ部分を削除するだけで移行完了

## 参考リンク

- [jGrants API公式ドキュメント](https://developers.digital.go.jp/documents/jgrants/api/)
- [MCP実装例（デジタル庁）](https://digital-gov.note.jp/n/n09dfb9fa4e8e)
- [jGrants公式サイト](https://www.jgrants-portal.go.jp/)

## 次回アクション

- [ ] デジタル庁にAPI利用方法を問い合わせ
- [ ] GitHub上のjGrants API実装例を精査
- [ ] 公式MCPサーバーのリリースを待つ
