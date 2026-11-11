import { getAllPosts } from '@/lib/posts';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_NAME_KO,
  AUTHOR_URL,
  AUTHOR_LINKEDIN_URL,
  AUTHOR_GITHUB_URL,
} from '@/lib/constants';

// 글이 바뀌면 빌드할 때 다시 만들어지므로 요청마다 그릴 필요가 없다
export const dynamic = 'force-static';

export function GET() {
  const postLines = getAllPosts().map(
    (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`,
  );

  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    '## 저자',
    '',
    `${AUTHOR_NAME_KO}(${AUTHOR_NAME})`,
    '',
    `- [이력서](${AUTHOR_URL})`,
    `- [링크드인](${AUTHOR_LINKEDIN_URL})`,
    `- [GitHub](${AUTHOR_GITHUB_URL})`,
    '',
    '## 글',
    '',
    ...postLines,
    '',
    '## 이력서·포트폴리오',
    '',
    `- [이력서](${SITE_URL}/resume)`,
    `- [포트폴리오](${SITE_URL}/portfolio)`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
