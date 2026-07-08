import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hojokin-navi.vercel.app';

  // 補助金詳細ページを取得
  const { data: subsidies } = await supabase
    .from('subsidies')
    .select('id, updated_at')
    .eq('status', 'open');

  const subsidyUrls = subsidies?.map((subsidy) => ({
    url: `${baseUrl}/subsidies/${subsidy.id}`,
    lastModified: new Date(subsidy.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...subsidyUrls,
  ];
}
