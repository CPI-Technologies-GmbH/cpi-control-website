import type { MetadataRoute } from 'next';

const blogSlugs = [
  'cpi-control-vs-datadog',
  'free-datadog-alternatives',
  'cpi-control-vs-lens',
  'why-we-switched-from-better-stack',
  'kubernetes-monitoring-5-minutes',
  'multi-cluster-kubernetes',
  'self-hosted-status-page',
  'unified-deployment-tracking',
  'kubernetes-live-logs-without-loki',
  'health-monitoring-best-practices',
  'gdpr-compliant-monitoring',
  'push-notifications-without-alert-fatigue',
  'monitoring-for-agencies',
  'saas-startup-monitoring',
  'freelancer-monitoring-guide',
];

const featureSlugs = [
  'kubernetes',
  'status-pages',
  'deployments',
  'live-logs',
  'health-monitoring',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cpi-control.com';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...featureSlugs.map((slug) => ({
      url: `${baseUrl}/features/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];
}
