import { supabase } from '@/lib/supabase';
import type { Subsidy } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 86400; // 24時間

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { data: subsidies } = await supabase
    .from('subsidies')
    .select('id')
    .eq('status', 'open');

  return subsidies?.map((s) => ({ id: s.id })) || [];
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { data: subsidy } = await supabase
    .from('subsidies')
    .select('*')
    .eq('id', id)
    .single();

  if (!subsidy) {
    return {
      title: '補助金が見つかりません',
    };
  }

  return {
    title: `${subsidy.title} | 補助金ナビ`,
    description: subsidy.overview?.slice(0, 120) || subsidy.title,
    openGraph: {
      title: subsidy.title,
      description: subsidy.overview || '',
      type: 'article',
    },
  };
}

export default async function SubsidyDetail({ params }: Props) {
  const { id } = await params;
  const { data: subsidy } = await supabase
    .from('subsidies')
    .select('*')
    .eq('id', id)
    .single();

  if (!subsidy) {
    notFound();
  }

  const typedSubsidy = subsidy as Subsidy;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: typedSubsidy.title,
    description: typedSubsidy.overview || '',
    provider: {
      '@type': 'GovernmentOrganization',
      name: typedSubsidy.organization || 'デジタル庁',
    },
    areaServed: typedSubsidy.region_code || '日本',
    ...(typedSubsidy.url && { url: typedSubsidy.url }),
    ...(typedSubsidy.deadline && {
      validThrough: typedSubsidy.deadline,
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-primary hover:underline">
            ← トップページへ
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {typedSubsidy.status === 'closed' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 font-semibold">
              この補助金の募集は終了しています
            </p>
          </div>
        )}

        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {typedSubsidy.title}
          </h1>

          <dl className="grid grid-cols-1 gap-4 mb-8">
            {typedSubsidy.organization && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">実施機関</dt>
                <dd className="text-gray-900">{typedSubsidy.organization}</dd>
              </div>
            )}

            {typedSubsidy.category && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">カテゴリ</dt>
                <dd className="text-gray-900">{typedSubsidy.category}</dd>
              </div>
            )}

            {typedSubsidy.region_code && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">対象地域</dt>
                <dd className="text-gray-900">{typedSubsidy.region_code}</dd>
              </div>
            )}

            {typedSubsidy.amount_min && typedSubsidy.amount_max && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">補助金額</dt>
                <dd className="text-gray-900">
                  {typedSubsidy.amount_min.toLocaleString()}円 〜{' '}
                  {typedSubsidy.amount_max.toLocaleString()}円
                </dd>
              </div>
            )}

            {typedSubsidy.application_start && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">募集開始</dt>
                <dd className="text-gray-900">
                  {new Date(typedSubsidy.application_start).toLocaleDateString('ja-JP')}
                </dd>
              </div>
            )}

            {typedSubsidy.deadline && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">募集締切</dt>
                <dd className="text-gray-900">
                  {new Date(typedSubsidy.deadline).toLocaleDateString('ja-JP')}
                </dd>
              </div>
            )}
          </dl>

          {typedSubsidy.overview && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">概要</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{typedSubsidy.overview}</p>
            </section>
          )}

          {typedSubsidy.target_text && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">対象・目的</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{typedSubsidy.target_text}</p>
            </section>
          )}

          {typedSubsidy.url && (
            <div className="mt-8 pt-6 border-t">
              <a
                href={typedSubsidy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                詳細・申請はこちら →
              </a>
            </div>
          )}
        </article>

        <footer className="mt-8 text-sm text-gray-500">
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
        </footer>
      </main>
    </div>
  );
}
