import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "프로젝트별로 풀어야 했던 문제, 내 역할, 의사결정과 그 이유, 결과, 회고를 기록.",
  path: "/portfolio",
});

interface Project {
  slug: string;
  name: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
  image?: string;
  video?: string;
}

const projects: Project[] = [
  {
    slug: "ad-subscribe",
    name: "Ad Subscribe — 김캐디 사장님 광고 구독 풀스택 구축",
    company: "김캐디",
    period: "2026.07 — 현재",
    summary:
      "매장 사장님이 광고를 월 구독으로 신청하고 쿠폰까지 운영하는 상품입니다. 테이블 설계부터 화면, API, 결제 결과 처리, 배치, 어드민까지 7개 레포를 직접 구현하고 출시 뒤 운영까지 맡았습니다. 출시 후 12주 유료 갱신 성공률은 96.6%입니다.",
    tags: ["React", "TypeScript", "Kotlin", "Spring", "Django", "MySQL"],
    video: "/videos/ad-subscribe.mp4",
  },
  {
    slug: "kaddie-web",
    name: "Kaddie Web — 해외 실내 골프 예약 B2C 웹 서비스",
    company: "김캐디",
    period: "2025.09 — 현재",
    summary:
      "해외 스크린골프·연습장을 예약하는 B2C 웹입니다. 회사의 첫 해외 매출을 만든 서비스로, 회원가입부터 예약·회원권 구매·예약 내역까지 고객 화면 전반을 개발하고 6개 언어 번역 빌드 파이프라인을 만들었습니다.",
    tags: ["React", "TypeScript", "Recoil", "styled-components"],
    video: "/videos/kaddie.mp4",
  },
  {
    slug: "ai-coach",
    name: "AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱",
    company: "김캐디",
    period: "2025.07 — 현재",
    summary:
      "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 앱입니다. 프로토타입을 이어받아 프론트엔드를 혼자 맡았고, 상용화를 위한 시뮬레이터 업체 데모와 매장 설치 테스트에 직접 나갔습니다.",
    tags: [
      "React",
      "TypeScript",
      "Electron",
      "Recoil",
      "WebSocket",
      "ECharts",
      "i18next",
    ],
    video: "/videos/ai-coach.mp4",
  },
  {
    slug: "smartscore-web",
    name: "SmartScore Web — 국내 1위 골프 O2O 플랫폼 공식 웹사이트 개편",
    company: "스마트스코어",
    period: "2025.02 — 2025.06",
    summary:
      "골프 O2O 플랫폼의 공식 웹사이트를 프론트엔드 혼자 전면 개편했습니다. LCP 6.6s→0.9s, 도메인 이전 SEO, Zod 폼 검증까지 맡았습니다.",
    tags: ["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"],
    video: "/videos/smartscore-web.mp4",
  },
  {
    slug: "mobile-ads",
    name: "Mobile Ads — 사내 최초 모바일 네트워크 광고 시스템",
    company: "스마트스코어",
    period: "2024.12 — 2025.06",
    summary:
      "사내 처음으로 모바일 네트워크 광고를 도입했습니다. 4가지 광고 타입을 한 번에 처리하는 공통 Mixin을 설계해, 사내 다른 개발팀도 광고 위치 번호(idx) 하나로 광고를 호출할 수 있게 만들었습니다.",
    tags: ["Vue2", "Webpack"],
    video: "/videos/mobile-ads.mp4",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
      {children}
    </span>
  );
}

function ProjectMedia({
  image,
  video,
  alt,
}: {
  image?: string;
  video?: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[4/3] bg-gray-50 border border-gray-200 overflow-hidden">
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest uppercase text-gray-300">
            Image
          </span>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* 헤딩 */}
      <section className="pt-16 pb-12">
        <h1 className="text-6xl font-black leading-none tracking-tighter">
          <span className="block">Portfolio</span>
        </h1>
      </section>

      {/* 구분선 */}
      <div className="border-t border-black" />

      {/* 프로젝트 리스트 */}
      <ul>
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-black py-14">
            <div className="grid md:grid-cols-[5fr_6fr] gap-8 md:gap-12 items-start">
              {/* 미디어 */}
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.name}
              />

              {/* 텍스트 */}
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-700 mb-3">
                  {project.company} · {project.period}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-3">
                  {project.name}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600 mb-5">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 mt-6 text-xs font-black tracking-widest uppercase text-gray-400 hover:text-black transition-colors w-fit"
                >
                  <span>자세히 보기</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
