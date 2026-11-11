import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  AUTHOR_JSON_LD,
  OG_IMAGE,
  OG_IMAGE_PATH,
} from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    google: 'oRxru0yydOCAn2sTWqwv3KZT78of4QPrGX82LY8q4lY',
    other: {
      'naver-site-verification': '4f6e83d42fb167912096f858b07f5bd127858f8f',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen bg-white">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: 'ko-KR',
            author: AUTHOR_JSON_LD,
          }}
        />
        <Header />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
