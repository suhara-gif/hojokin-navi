import Link from 'next/link';

export const metadata = {
  title: '免責事項 | 補助金ナビ',
};

export default function Terms() {
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
          <h1>免責事項</h1>

          <section>
            <h2>当サイトの情報について</h2>
            <p>
              当サイト「補助金ナビ（仮）」で掲載している補助金情報は、
              デジタル庁が提供するjGrants APIから取得したデータを元に作成しています。
            </p>
            <p>
              情報の正確性については万全を期しておりますが、
              当サイトに掲載された情報の完全性・正確性・有用性等について、
              いかなる保証もするものではありません。
            </p>
          </section>

          <section>
            <h2>情報の更新について</h2>
            <p>
              補助金の募集状況・内容は随時変更される可能性があります。
              最新の情報や詳細については、必ず各補助金の公式サイトをご確認ください。
            </p>
          </section>

          <section>
            <h2>リンク先サイトについて</h2>
            <p>
              当サイトから遷移する外部サイトで提供される情報・サービス等について、
              一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2>損害等の責任について</h2>
            <p>
              当サイトに掲載された情報を利用することで発生したトラブルや損失・損害等について、
              当サイト運営者は一切責任を負わないものとします。
            </p>
            <p>
              補助金の申請にあたっては、必ずご自身で公式情報をご確認のうえ、
              自己責任にて行ってください。
            </p>
          </section>

          <section>
            <h2>データ出典</h2>
            <p>
              出典：jGrants（デジタル庁）、
              <a
                href="https://www.digital.go.jp/resources/open_data"
                target="_blank"
                rel="noopener noreferrer"
              >
                公共データ利用規約（PDL1.0）
              </a>
            </p>
            <p>
              本サイトはjGrantsのデータを加工して作成しています。
            </p>
          </section>

          <section>
            <h2>免責事項の変更</h2>
            <p>
              当サイトは、本免責事項の内容を予告なく変更することがあります。
              変更後の免責事項は、本ページに掲載した時点で効力を生じるものとします。
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
