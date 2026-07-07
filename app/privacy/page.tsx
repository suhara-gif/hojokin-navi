import Link from 'next/link';

export const metadata = {
  title: 'プライバシーポリシー | 補助金ナビ',
};

export default function Privacy() {
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
        <article className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <h1>プライバシーポリシー</h1>

          <section>
            <h2>個人情報の取得について</h2>
            <p>
              当サイトでは、ユーザーの個人情報を取得することはありません。
              問い合わせフォーム等も設置しておりません。
            </p>
          </section>

          <section>
            <h2>アクセス解析ツールについて</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics 4」を使用しています。
              このGoogle Analytics 4はデータの収集のためにCookieを使用しています。
              このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p>
              この機能はCookieを無効にすることで収集を拒否することができますので、
              お使いのブラウザの設定をご確認ください。
            </p>
            <p>
              詳細は
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Googleアナリティクス利用規約
              </a>
              および
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                Googleのプライバシーポリシー
              </a>
              をご覧ください。
            </p>
          </section>

          <section>
            <h2>免責事項</h2>
            <p>
              当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、
              誤情報が入り込んだり、情報が古くなっている場合があります。
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </section>

          <section>
            <h2>プライバシーポリシーの変更</h2>
            <p>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、
              本ポリシーの内容を適宜見直しその改善に努めます。
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            最終更新日：2026年7月8日
          </p>
        </article>
      </main>
    </div>
  );
}
