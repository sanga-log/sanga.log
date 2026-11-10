import type { NextConfig } from "next";

// 김캐디 팀블로그에 원문이 있는 글은 원문으로 보낸다.
const TEAM_BLOG_POSTS = ["slack-autobot-skill", "start-claude-skill"];

const nextConfig: NextConfig = {
  async redirects() {
    return TEAM_BLOG_POSTS.map((slug) => ({
      source: `/blog/${slug}`,
      destination: `https://blog.kimcaddie.com/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
