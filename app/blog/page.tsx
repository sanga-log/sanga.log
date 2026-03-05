import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { SITE_URL } from '@/lib/constants';
import { redis } from '@/lib/redis';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata: Metadata = {
  title: 'Blog',
  description: '프론트엔드 개발, 기술 아티클, 회고를 기록합니다.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog',
    description: '프론트엔드 개발, 기술 아티클, 회고를 기록합니다.',
    url: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const currentCategory = category || '전체';

  const filteredPosts =
    currentCategory === '전체'
      ? allPosts
      : allPosts.filter((p) => p.category === currentCategory);

  const viewCounts: Record<string, number> = {};
  if (filteredPosts.length > 0) {
    const keys = filteredPosts.map((p) => `views:post:${p.slug}`);
    const counts = await redis.mget<(number | null)[]>(...keys);
    filteredPosts.forEach((p, i) => {
      viewCounts[p.slug] = counts[i] ?? 0;
    });
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* 카테고리 헤딩 */}
      <section className="pt-16 pb-12">
        <h1 className="text-6xl font-black leading-none tracking-tighter">
          {currentCategory === '전체' ? (
            <>
              <span className="block">Blogs</span>
            </>
          ) : (
            <span className="block">{currentCategory}</span>
          )}
        </h1>
      </section>

      {/* 카테고리 필터 */}
      <div className="flex gap-6 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === '전체' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
            className={`text-xs font-bold tracking-widest whitespace-nowrap transition-opacity ${currentCategory === cat ? 'opacity-100' : 'opacity-30 hover:opacity-60'
              }`}
          >
            {cat.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* 구분선 */}
      <div className="border-t border-black mb-2" />

      {/* 포스트 리스트 */}
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.slug} className="border-b border-black">
            <Link href={`/blog/${post.slug}`} className="group block py-12">
              <h2 className="text-3xl font-black leading-tight tracking-tight mb-3 group-hover:opacity-50 transition-opacity">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 max-w-3xl mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  {post.category}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs font-bold tracking-widest text-gray-400">
                  {format(new Date(post.date), 'yyyy. MM. dd', { locale: ko })}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs font-bold tracking-widest text-gray-400">
                  {(viewCounts[post.slug] ?? 0).toLocaleString()} views
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filteredPosts.length === 0 && (
        <p className="py-20 text-center text-gray-400 text-sm">
          아직 포스트가 없습니다.
        </p>
      )}
    </div>
  );
}
