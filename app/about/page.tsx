import Link from 'next/link';

export const metadata = {
  title: '運営者情報 | 補助金ナビ',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-primary hover:underline">
            ← トップページへ
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6">運営者情報</h1>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">サイト名</h2>
              <p>補助金ナビ（仮）</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">運営者</h2>
              <p>個人運営</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">サイトの目的</h2>
              <p>
                デジタル庁が提供するjGrants APIを活用し、補助金情報を検索しやすい形で提供することを目的としています。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">データ出典</h2>
              <p>
                本サイトで掲載している補助金情報は、デジタル庁が提供するjGrants API（
                <a
                  href="https://developers.digital.go.jp/documents/jgrants/api/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jGrants API仕様書
                </a>
                ）から取得したデータを利用しています。
              </p>
              <p className="mt-2">
                データの利用は、
                <a
                  href="https://www.digital.go.jp/resources/open_data"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  公共データ利用規約（PDL1.0）
                </a>
                に準拠しています。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">免責事項</h2>
              <p>
                本サイトに掲載されている情報の正確性については万全を期しておりますが、
                利用者が本サイトの情報を用いて行う一切の行為について、運営者は責任を負いません。
                詳細は
                <Link href="/terms" className="text-primary hover:underline">
                  免責事項
                </Link>
                をご確認ください。
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
