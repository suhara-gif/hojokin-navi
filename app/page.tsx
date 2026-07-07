import { supabase } from '@/lib/supabase';
import type { Subsidy } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 1800; // 30分

export default async function Home() {
  const { data: subsidies } = await supabase
    .from('subsidies')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">
            補助金ナビ（仮）
          </h1>
          <p className="text-gray-600 mt-2">
            jGrants補助金情報検索サイト
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">募集中の補助金</h2>

          {!subsidies || subsidies.length === 0 ? (
            <p className="text-gray-500">現在募集中の補助金はありません</p>
          ) : (
            <div className="space-y-4">
              {subsidies.map((subsidy: Subsidy) => (
                <Link
                  key={subsidy.id}
                  href={`/subsidies/${subsidy.id}`}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {subsidy.title}
                  </h3>

                  {subsidy.organization && (
                    <p className="text-sm text-gray-600 mb-2">
                      実施機関: {subsidy.organization}
                    </p>
                  )}

                  {subsidy.overview && (
                    <p className="text-gray-700 line-clamp-2 mb-3">
                      {subsidy.overview}
                    </p>
                  )}

                  <div className="flex gap-4 text-sm text-gray-500">
                    {subsidy.deadline && (
                      <span>締切: {new Date(subsidy.deadline).toLocaleDateString('ja-JP')}</span>
                    )}
                    {subsidy.amount_min && subsidy.amount_max && (
                      <span>
                        補助額: {subsidy.amount_min.toLocaleString()}円 〜{' '}
                        {subsidy.amount_max.toLocaleString()}円
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 pt-8 border-t text-center text-sm text-gray-500">
          <p>
            出典：jGrants（デジタル庁）、
            <a
              href="https://www.digital.go.jp/resources/open_data"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              PDL1.0
            </a>
          </p>
          <p className="mt-2">
            <Link href="/about" className="hover:underline">
              運営者情報
            </Link>
            {' | '}
            <Link href="/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
            {' | '}
            <Link href="/terms" className="hover:underline">
              免責事項
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
