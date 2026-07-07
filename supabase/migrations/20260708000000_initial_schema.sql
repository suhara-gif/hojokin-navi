-- 補助金ナビ データベーススキーマ

-- 補助金テーブル
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
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_subsidies_status ON subsidies(status);
CREATE INDEX idx_subsidies_deadline ON subsidies(deadline);
CREATE INDEX idx_subsidies_category ON subsidies(category);
CREATE INDEX idx_subsidies_region ON subsidies(region_code);
CREATE INDEX idx_subsidies_updated ON subsidies(updated_at DESC);

-- 同期ログテーブル
CREATE TABLE sync_logs (
  id SERIAL PRIMARY KEY,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  added_count INT DEFAULT 0,
  updated_count INT DEFAULT 0,
  closed_count INT DEFAULT 0,
  total_count INT DEFAULT 0,
  error_message TEXT
);

-- RLS（Row Level Security）の設定
-- 匿名ユーザーは読み取りのみ可能
ALTER TABLE subsidies ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON subsidies
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON sync_logs
  FOR SELECT USING (true);

-- Service Roleキーでのみ書き込み可能
-- （GitHub Actionsから実行されるETLスクリプトで使用）
