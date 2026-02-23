import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blogs');

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      date: data.date ?? '',
      category: data.category ?? '전체',
      tags: data.tags ?? [],
    } as PostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      date: data.date ?? '',
      category: data.category ?? '전체',
      tags: data.tags ?? [],
      content,
    };
  } catch {
    return null;
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return ['전체', ...categories.filter((c) => c !== '전체')];
}
