import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import {
  SectionLabel,
  B,
  Tag,
  BulletList,
  Decision,
  Diagram,
  FlowStep,
  FlowArrow,
  FlowAside,
} from "../_components";

export const metadata: Metadata = {
  title: "국내 공식 웹사이트 개편 — Portfolio",
  description:
    "스마트스코어 국내 공식 웹사이트 전면 개편. LCP 6.6s→0.9s, 도메인 이전 SEO, Zod 폼 검증을 혼자 맡은 기록. 의사결정, 트레이드오프, 회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/smartscore-web` },
  openGraph: {
    title: "국내 공식 웹사이트 개편 — Portfolio",
    description:
      "스마트스코어 국내 공식 웹사이트 전면 개편. LCP 6.6s→0.9s, 도메인 이전 SEO, Zod 폼 검증을 혼자 맡은 기록. 의사결정, 트레이드오프, 회고.",
    url: `${SITE_URL}/portfolio/smartscore-web`,
  },
};

export default function SmartsocreWebPortfolioPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        <span>Portfolio</span>
      </Link>

      <section className="border-b border-black pb-12 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
          국내 공식 웹사이트 개편
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 mt-4 mb-5">
          골프 O2O 플랫폼 공식 웹사이트의 프론트엔드를 혼자 전면 개편했습니다.
          도메인 이전, 성능, SEO, 폼 검증을 다시 설계했습니다.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionLabel>풀어야 했던 문제</SectionLabel>
        <BulletList
          items={[
            "배포 직후 측정한 첫 화면 로딩(LCP)이 6.6초, 레이아웃 밀림(CLS)이 0.737이었습니다.",
            "도메인을 옮기면 기존 검색 색인이 새 도메인으로 바로 이어지지 않아 노출이 떨어질 수 있었습니다.",
            "글로벌 사이트에서는 폼 검증이 필드마다 흩어져 있어 기획이 바뀔 때마다 고치기 어려웠습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>내 역할과 협업</SectionLabel>
        <BulletList
          items={[
            "직접 한 일: 프론트엔드 전체(화면, 다국어, 성능, SEO, 폼 검증, 도메인 이전 세팅)",
            "직접 하지 않은 일: 디자인, 문안, 번역 텍스트",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 성과</SectionLabel>
        <BulletList
          items={[
            <>
              LCP <B>6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0. 이미지 CDN 없이
              코드 변경만으로 얻은 수치입니다
            </>,
            <>
              Lighthouse SEO <B>83 → 92점</B>. 도메인 이전과 동시에 SEO 세팅을
              끝내 색인 공백을 줄였습니다
            </>,
            "프론트엔드를 혼자 맡아 도메인 이전, 다국어, 성능, SEO, 폼 검증을 전면 개편",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 의사결정</SectionLabel>

        <Decision
          number={1}
          title="LCP 6.6s → 0.9s — 이미지 포맷 전환 + 로딩 우선순위 조정"
          body={
            <>
              배포 직후 Lighthouse로 재 보니 LCP가 6.6s, CLS가 0.737이었습니다.
              원인을 따라가 보니 히어로 이미지가 JPEG로 서빙되고 있었고,{" "}
              <code>fetchpriority</code>나 <code>preload</code> 없이 일반 이미지
              로딩 순서를 그대로 따르고 있었습니다. 이미지 CDN은 비용·운영 부담이
              있고 lazy loading만으로는 LCP가 나아지지 않아, <B>WebP 전환 +
              preload + fetchpriority=&quot;high&quot; 조합</B>을 골랐습니다.
              코드만 바꿔서 가장 크게 줄일 수 있는 방향이었습니다. CLS는
              이미지에 width/height를 명시해 레이아웃이 밀리지 않게 잡았습니다.
            </>
          }
          diagram={
            <Diagram
              title="히어로 이미지 로딩 최적화"
              caption="JPEG → WebP 전환 + preload + fetchpriority 조합으로 브라우저가 히어로 이미지를 첫 번째 우선순위로 처리하도록 유도."
            >
              <FlowStep>
                <B>Before</B>: JPEG 히어로 이미지, 우선순위 없음
                <FlowAside>LCP 6.6s / CLS 0.737</FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>WebP 전환 — 파일 크기 감소</FlowStep>
              <FlowArrow />
              <FlowStep>
                <code>{"<link rel='preload'>"}</code> +{" "}
                <code>fetchpriority=&quot;high&quot;</code>
                <FlowAside>
                  브라우저가 히어로 이미지를 첫 번째 자원으로 처리
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                <B>After</B>: LCP 0.9s / CLS 0
              </FlowStep>
            </Diagram>
          }
          result={[
            <>
              LCP <B>6.6s → 0.9s (86%↓)</B>, CLS <B>0.737 → 0</B>
            </>,
            "이미지 CDN 없이 코드 변경만으로 달성",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/performance-optimization-lighthouse"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Lighthouse 성능 최적화 (LCP·CLS)
              </a>
            </>,
          ]}
          retrospective={
            <>
              LCP는 이미지 크기보다 로딩 순서가 먼저였습니다. fetchpriority 한
              줄이 CDN 도입보다 더 크게 줄였습니다. 처음엔 원인 분석 없이
              CDN부터 떠올렸는데, 병목을 먼저 측정하고 접근했다면 더 빨리 풀 수
              있었을 것 같습니다.
            </>
          }
        />

        <Decision
          number={2}
          title="도메인 이전 — 검색 색인 리셋에 대비해 SEO를 이전과 동시에 세팅"
          body={
            <>
              도메인을 옮기면 기존 색인이 새 도메인으로 곧장 이어지지 않아 검색
              노출이 떨어질 수 있다는 걸 미리 알고 있었습니다. 단순히 301
              리다이렉트만 걸면, 크롤러가 새 도메인을 처음부터 다시 색인하는 동안
              노출이 급감할 수 있습니다. 그래서 이전과 동시에 SEO 세팅을 끝내기로
              하고,{" "}
              <B>
                사이트맵·robots.txt 재구성 + Schema.org 구조화 데이터 + Unhead
                기반 라우터 레벨 메타데이터 통합 관리
              </B>
              를 한꺼번에 처리했습니다. 크롤러가 새 도메인에서 필요한 신호를
              곧바로 다 찾을 수 있게 미리 깔아 둔 셈입니다.
            </>
          }
          result={[
            <>
              Lighthouse SEO <B>83 → 92점</B>
            </>,
            "도메인 이전과 SEO 세팅을 동시 완료해 색인 공백 최소화",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/seo-optimization"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                SPA SEO 최적화
              </a>
            </>,
          ]}
          retrospective={
            <>
              이전 후 색인 변화를 Search Console로 추적하는 모니터링 주기를
              명확히 잡아 두지 못했습니다. 이전 직후 2주 정도는 주 단위로 색인
              상태를 확인하는 체크리스트를 만들었어야 했습니다.
            </>
          }
        />

        <Decision
          number={3}
          title="폼 검증 — 풀 라이브러리 대신 Zod만 도입"
          body={
            <>
              글로벌 홈페이지를 처음 만들 때는 폼 검증 로직이 필드마다 흩어져
              있어, 기획이 바뀔 때마다 손대기가 어려웠습니다. 그래서 이번엔
              처음부터 <B>검증 로직을 한 곳으로 모으는 구조</B>를 잡기로 했습니다.
              vee-validate·vuelidate 같은 풀 폼 라이브러리도 검토했지만, 폼
              규모가 작고 상태 관리도 Vue 기본으로 충분해{" "}
              <B>검증 로직만 Zod로 떼어내는</B> 쪽을 택했습니다. 정규표현식을
              단일 스키마로 모으고, <code>isSubmitted</code> 상태로 첫 진입
              에러는 숨기다가 제출을 시도한 뒤부터 실시간 검증이 동작하도록 UX를
              직접 구현했습니다. 트레이드오프는 UX 패턴을 직접 짜야 한다는 점인데,
              폼이 복잡해지면 풀 라이브러리로 가는 편이 더 빠를 수 있습니다.
            </>
          }
          result={[
            "필드별 정규표현식을 단일 Zod 스키마로 모음",
            "첫 진입 에러 숨김 + 제출 후 실시간 검증 UX 직접 구현",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/vue-zod-validation"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Vue + Zod 폼 검증
              </a>
            </>,
          ]}
          retrospective={
            <>
              폼 복잡도가 올라갈 여지가 있을 때는 처음부터 react-hook-form이나
              vee-validate 같은 라이브러리를 쓰는 게 낫겠다 싶습니다. 단순한
              폼에서 Zod만 쓴 건 좋은 선택이었지만, 멀티스텝이나 동적 필드가
              붙었다면 직접 짠 UX 패턴의 유지보수 비용이 라이브러리 학습 비용을
              넘어섰을 것 같습니다.
            </>
          }
        />
      </section>

    </div>
  );
}
