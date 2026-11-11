import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE, OG_IMAGE_PATH } from '@/lib/constants';

interface PageMetadataParams {
  title: string;
  description: string;
  path: `/${string}`;
}

// openGraph·twitter는 루트 설정과 합쳐지지 않고 통째로 덮어쓰므로, 페이지마다 이미지까지 함께 넣는다
export function createPageMetadata({ title, description, path }: PageMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
