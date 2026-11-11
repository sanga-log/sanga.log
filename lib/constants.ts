export const SITE_URL = "https://sangalog.com";
export const SITE_NAME = "sanga-log";
export const SITE_DESCRIPTION =
  "기술영업 7년을 거쳐 개발자가 된 이상아의 기술 블로그. 만든 기능이 출시 뒤 어떻게 돌아가는지, 무엇을 왜 정했는지 적습니다.";
export const AUTHOR_NAME = "Lee Sang-a";
export const AUTHOR_NAME_KO = "이상아";
export const AUTHOR_URL = `${SITE_URL}/resume`;
export const AUTHOR_LINKEDIN_URL = "https://www.linkedin.com/in/sanga-log";
export const AUTHOR_GITHUB_URL = "https://github.com/sanga-log";
export const AUTHOR_SAME_AS = [AUTHOR_LINKEDIN_URL, AUTHOR_GITHUB_URL];
export const SITE_LOCALE = "ko_KR";
export const OG_IMAGE_PATH = "/og-image.png";

// 글·사이트 JSON-LD에서 함께 쓰는 저자 정보
export const AUTHOR_JSON_LD = {
  "@type": "Person",
  name: AUTHOR_NAME_KO,
  alternateName: AUTHOR_NAME,
  url: AUTHOR_URL,
  sameAs: AUTHOR_SAME_AS,
};
