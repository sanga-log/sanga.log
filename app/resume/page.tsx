import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume — 산가리의 테크블로그',
  description: '프론트엔드 개발자 산가리의 이력서',
};

const skills = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'],
  'Styling': ['Tailwind CSS', 'Styled-components', 'Sass/SCSS'],
  'State': ['Zustand', 'React Query', 'Redux Toolkit', 'Jotai'],
  'Tools': ['Git', 'Webpack', 'Vite', 'Figma', 'Storybook'],
};

const experiences = [
  {
    company: '(주) 테크스타트',
    role: '프론트엔드 개발자',
    period: '2023.03 — 현재',
    description: [
      'Next.js 기반 B2B SaaS 플랫폼 프론트엔드 개발 주도',
      'React Query 도입으로 서버 상태 관리 효율화, 불필요한 API 호출 40% 감소',
      'Lighthouse 성능 점수 52 → 94점으로 개선 (Core Web Vitals 최적화)',
      'Storybook 도입 및 공통 컴포넌트 라이브러리 구축 (50여 개 컴포넌트)',
      '디자인 시스템 구축 및 Design Tokens 기반 테마 시스템 설계',
    ],
  },
  {
    company: '(주) 웹에이전시',
    role: '웹 퍼블리셔 / 프론트엔드',
    period: '2021.06 — 2023.02',
    description: [
      '반응형 웹사이트 30여 개 퍼블리싱 및 유지보수',
      'React + TypeScript 전환 작업 진행, 컴포넌트 재사용율 65% 향상',
      'Vanilla JS로 인터랙티브 랜딩 페이지 다수 구현 (GSAP, CSS Animation)',
      'SEO 최적화 및 웹 접근성(WAI-ARIA) 개선 작업',
    ],
  },
];

const education = [
  {
    school: '한국대학교',
    major: '컴퓨터공학과',
    period: '2017 — 2021',
  },
];

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* 헤더 */}
      <section className="border-b border-black pb-12 mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-6">RESUME</h1>
        <div className="flex flex-col gap-1.5">
          <p className="text-2xl font-black">산가리 (Sangari)</p>
          <p className="text-base text-gray-500 font-medium">Frontend Developer</p>
          <div className="flex gap-4 mt-3 text-sm text-gray-500">
            <a href="mailto:hello@sangari.dev" className="hover:text-black transition-colors">
              hello@sangari.dev
            </a>
            <a href="https://github.com/sangari" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              github.com/sangari
            </a>
          </div>
        </div>
      </section>

      {/* 소개 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-5 text-gray-400">About</h2>
        <p className="text-base leading-relaxed text-gray-700">
          사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
          컴포넌트 설계와 성능 최적화에 관심이 많으며, 팀과 함께 좋은 제품을 만드는 과정을 즐깁니다.
          기술 블로그 운영을 통해 학습한 내용을 정리하고 커뮤니티에 기여하고 있습니다.
        </p>
      </section>

      {/* 경력 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Experience</h2>
        <div className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <div key={exp.company} className="border-l-2 border-black pl-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <p className="font-black text-lg">{exp.company}</p>
                  <p className="text-sm font-medium text-gray-500">{exp.role}</p>
                </div>
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
                  {exp.period}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm leading-relaxed text-gray-600 flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-black shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 스킬 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-bold border border-black px-3 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 학력 */}
      <section>
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((edu) => (
            <div key={edu.school} className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <div>
                <p className="font-black">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.major}</p>
              </div>
              <span className="text-xs font-bold text-gray-400">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
