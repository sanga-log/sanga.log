import Image from "next/image";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Resume",
  description: "이상아 이력서. 기술영업 7년을 거쳐 개발자가 된 김캐디 Product Engineer. 고객 문제 정의부터 구현, 출시 후 지표 확인까지 맡습니다.",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    title: "Resume",
    description: "이상아 이력서. 기술영업 7년을 거쳐 개발자가 된 김캐디 Product Engineer. 고객 문제 정의부터 구현, 출시 후 지표 확인까지 맡습니다.",
    url: `${SITE_URL}/resume`,
  },
};

type Accent = "teal" | "blue" | "neutral";

const ACCENTS: Record<Accent, { divider: string; badge: string }> = {
  teal: {
    divider: "text-[#3fc3b0]",
    badge: "bg-[rgba(63,195,176,0.12)] text-[#2d9485]",
  },
  blue: {
    divider: "text-[#457ff3]",
    badge: "bg-[rgba(0,121,255,0.08)] text-[#0079ff]",
  },
  // 개별/개인 항목용 — 회사 브랜드색을 빌리지 않는 중립 배지 (태그 pill과 동일 계열)
  neutral: {
    divider: "text-[#45536e]",
    badge: "bg-[#eff4fc] text-[#45536e]",
  },
};

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-[#1e1e1e]">{children}</strong>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#eff4fc] px-3 py-1 text-xs font-medium text-[#45536e]">
      {children}
    </span>
  );
}

const CORE_STRENGTHS = [
  {
    label: "고객 요구 → 기능 기준",
    evidence:
      "선착순 쿠폰 마감 기준을 영업과 비교해 다운로드에서 실사용으로 전환, 출시 후 받은 쿠폰의 32.8%만 쓰여 전제 확인",
  },
  {
    label: "매장별 설정",
    evidence:
      "무인 매장 PC 앱 설정을 서버 자동 수신으로 전환, 매장 추가마다 하던 JSON 수정 제거",
  },
  {
    label: "현장 팀 셀프서비스",
    evidence:
      "주차장 로그인 설정을 AI 스킬로 영업팀에 넘겨 개발자 수정 13건 → 0건 (공유 후 12주)",
  },
] as const;

function Dot() {
  return (
    <span className="mt-[0.6em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7bfd9]" />
  );
}

function BlogBadge({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent: Accent;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold underline decoration-from-font underline-offset-2 transition-opacity hover:opacity-70 ${ACCENTS[accent].badge}`}
    >
      {label}
    </a>
  );
}

function CompanyIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      className="size-12 shrink-0 rounded-lg sm:size-14"
    />
  );
}

function Project({
  name,
  period,
  description,
  tags,
  items,
  accent,
  first = false,
  links,
}: {
  name: string;
  period?: string;
  description: string;
  tags: string[];
  items: React.ReactNode[];
  accent: Accent;
  first?: boolean;
  links?: { label: string; href: string }[];
}) {
  return (
    <div className={first ? "" : "mt-12"}>
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-lg font-bold tracking-tight text-[#1e1e1e] sm:text-xl">
          {name}
        </p>
        {period && (
          <span className="shrink-0 text-xs font-medium text-[#8692ab]">
            {period}
          </span>
        )}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-[#7f8da9]">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-[1.8] text-[#45536d]"
          >
            <Dot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {links && links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 pl-6">
          {links.map((l) => (
            <BlogBadge
              key={l.href}
              href={l.href}
              label={l.label}
              accent={accent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyHeader({
  logo,
  name,
  period,
  description,
}: {
  logo?: { src: string; alt: string };
  name: string;
  period: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        {logo && <CompanyIcon src={logo.src} alt={logo.alt} />}
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-[#1e1e1e] sm:text-3xl">
            {name}
          </p>
          <span className="shrink-0 text-xs font-medium text-[#8692ab]">
            {period}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#7f8da9]">
        {description}
      </p>
    </div>
  );
}

function ProjectDivider({ accent }: { accent: Accent }) {
  return (
    <div className="mb-8 border-b border-[#9cbfe2] pb-2">
      <span
        className={`text-base font-extrabold tracking-tight ${ACCENTS[accent].divider}`}
      >
        Project
      </span>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {/* ── Hero ── */}
      <section className="mb-20">
        <h1 className="text-6xl font-black tracking-tight text-[#1e1e1e] sm:text-7xl">
          이상아
        </h1>
        <p className="mt-7 break-keep text-base leading-[1.7] text-[#6b7790] sm:text-lg">
          플랜트 전동기 사양서를 검토하던 기술영업 7년을 거쳐 개발자가
          됐습니다. 프론트엔드 4년차이고, 지금은 김캐디 Product Engineer로
          1,000개 넘는 매장이 사용하는 B2B SaaS, 무인 매장 데스크톱 앱, 해외
          예약 웹을 만듭니다.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {CORE_STRENGTHS.map(({ label, evidence }) => (
            <li
              key={label}
              className="flex items-start gap-3 break-keep text-sm leading-[1.8] text-[#45536d] sm:text-base"
            >
              <Dot />
              <span>
                <B>{label}</B>: {evidence}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-4 text-base font-medium">
          <a
            href="https://www.linkedin.com/in/sanga-log"
            target="_blank"
            rel="noreferrer"
            className="text-[#1a1a1a] underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70"
          >
            LinkedIn
          </a>
          <span className="h-3.5 w-px bg-[#c2c9d6]" />
          <a
            href="mailto:comt.mix@gmail.com"
            className="text-[#1a1a1a] underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70"
          >
            Email
          </a>
          <span className="h-3.5 w-px bg-[#c2c9d6]" />
          <a
            href="https://github.com/sanga-log"
            target="_blank"
            rel="noreferrer"
            className="text-[#1a1a1a] underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70"
          >
            Github
          </a>
        </div>
      </section>

      {/* ── Work Experience ── */}
      <section className="mb-20">
        <h2 className="mb-12 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0e0e0e] sm:text-5xl">
          Work
          <br />
          Experience
        </h2>

        <div className="flex flex-col gap-20">
          {/* ════ 김캐디 ════ */}
          <div>
            <CompanyHeader
              logo={{ src: "/kimcaddie-logo.png", alt: "김캐디 로고" }}
              name="주식회사 김캐디"
              period="2025.06 — 현재"
              description="실내 골프 마켓플레이스. 무인 매장 170+개 운영, 12,000여 골프 시설 예약 지원, 누적 200만+ 다운로드. Product Engineer (2026.07 — 현재) · Frontend Engineer (2025.06 — 2026.07)"
            />
            <ProjectDivider accent="teal" />

            <Project
              first
              accent="teal"
              name="광고 구독 — 김캐디 사장님 광고 상품 풀스택 구축"
              period="2026.07 — 현재"
              description="매장 사장님이 영업 담당자를 거치지 않고 마커 광고·리스팅 광고를 월 구독으로 신청하고 쿠폰까지 운영하는 상품입니다. 테이블 설계부터 화면, API, 결제 결과 처리, 배치, 어드민까지 7개 레포를 구현하고, 출시 후 운영까지 맡고 있습니다. 사장님이 직접 신청한 매장의 46%는 이전 광고 결제 이력이 없던 매장입니다."
              tags={[
                "React",
                "TypeScript",
                "Kotlin",
                "Spring",
                "Django",
                "MySQL",
              ]}
              items={[
                <>
                  기존 쿠폰·주문·결제 테이블을 참조하고 회차 연결 테이블만 추가해
                  신규 테이블 6개로 설계 (백엔드 리뷰 반영)
                </>,
                <>
                  기존 PG·SQS 결제 흐름에 구독을 연결하고, 결과 전까지{" "}
                  <B>결제 대기(PENDING) 상태</B>와 10초 폴링으로 처리 (실측
                  97%가 10초 안에 확정)
                </>,
                <>
                  받아 두고 안 쓰는 쿠폰으로 선착순이 일찍 마감되던 기준을,
                  영업과 비교 후 <B>실사용 기준·받기 한도 4배</B>로 전환 (출시 후
                  받은 쿠폰의 32.8%만 쓰여 전제 확인)
                </>,
                <>
                  손님 앱 배포 없이 서버에서 재해석해 사장님 화면엔 실사용 수량만
                  표시
                </>,
                <>
                  &ldquo;두 달 무상&rdquo; 영업 합의를 결제 중단 대신{" "}
                  <B>0원 결제</B>로 처리해 갱신·쿠폰 유지 (PG 호출 없이 성공
                  콜백이 도는 지점 선택)
                </>,
                <>
                  출시 후 12주 <B>유료 갱신 성공률 96.6%</B>, 1차 결제 실패 건의
                  40%는 재시도로 회복
                </>,
                <>
                  결제·쿠폰 데이터를 매일 대조해 에러 없이 옛 시스템에서 돌던
                  매장을 발견, 전수 조회로 후보 7곳을 추려 매장별 처리
                </>,
              ]}
              links={[
                {
                  label: "포트폴리오: 광고 구독",
                  href: "https://sangalog.com/portfolio/ad-subscribe",
                },
                {
                  label: "프론트 개발자의 첫 백엔드 1편",
                  href: "https://sangalog.com/blog/frontend-first-backend-1",
                },
                {
                  label: "프론트 개발자의 첫 백엔드 2편",
                  href: "https://sangalog.com/blog/frontend-first-backend-2",
                },
              ]}
            />

            <Project
              accent="teal"
              name="Kaddie Web — 해외 실내 골프 예약 B2C 웹 서비스"
              period="2025.09 — 현재"
              description="김캐디의 해외 스크린골프·연습장 예약 웹입니다. 회사 최초 해외 매출을 만든 서비스로, 태국·필리핀·미국 매장에서 운영 중입니다. 회원가입·로그인부터 예약, 회원권 구매·취소, 예약 내역까지 고객 화면 전반을 개발했습니다."
              tags={["React", "TypeScript", "Recoil", "styled-components"]}
              items={[
                <>
                  운영시간·게임 소요시간·룸별 기예약·현재 이전 시간,{" "}
                  <B>네 조건을 통과한 슬롯만 활성화</B>해 운영 룰과 어긋난 예약을
                  슬롯 선택 시점에 차단 (동시성 충돌은 백엔드 최종 검증)
                </>,
                <>
                  회원권 결제 결과가 최대 5초 안에 온다는 것을 백엔드와 확인해
                  WebSocket 대신 1초 간격 5회 폴링으로 설계,{" "}
                  <B>대기 중 결제 버튼 비활성화로 중복 청구 차단</B>
                </>,
                <>
                  Google Sheets 번역 변경분만 빌드 시 감지해 6개 언어 파일에
                  반영하는 파이프라인 구축, 빠진 번역은 기본 언어로 대체 (번역
                  CMS는 규모 대비 비용으로 제외)
                </>,
                <>
                  Sheets 인증 키는{" "}
                  <B>AWS Secrets Manager에서 빌드 시점에만 주입하고 종료 직후 삭제</B>
                </>,
              ]}
              links={[
                {
                  label: "포트폴리오: Kaddie Web",
                  href: "https://sangalog.com/portfolio/kaddie-web",
                },
              ]}
            />

            <Project
              accent="teal"
              name="AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱"
              period="2025.07 — 현재"
              description="무인 스크린골프 매장에서 고객이 직접 실시간으로 스윙을 분석·코칭받는 Electron 데스크톱 앱입니다. 입사 직후 프로토타입을 이어받아 프론트엔드를 혼자 맡아 핵심 기능부터 운영까지 담당했습니다."
              tags={[
                "React",
                "TypeScript",
                "Electron",
                "Recoil",
                "WebSocket",
                "ECharts",
                "AWS",
                "i18next",
              ]}
              items={[
                <>
                  매장 추가마다 JSON 수정과 현장 방문이 반복되던 설정을, 매장별로는
                  시공 시 등록하는{" "}
                  <B>MAC Address만 남기고 나머지는 서버에서 자동 수신</B>하도록
                  전환
                </>,
                <>
                  S3 자동 업로드와 Silent 설치 파이프라인으로{" "}
                  <B>업데이트 때 매장 방문 제거</B> (5개 테스트 매장 운영 중)
                </>,
                <>
                  <B>main bundle 압축 760 KB → 592 KB (22%↓)</B>: ECharts
                  import를 한 파일로 모으고 쓰는 모듈만 등록
                </>,
                <>
                  Electron 앱의 IPC를 <code>contextBridge</code> 최소 권한 API로
                  재구성 (
                  <code>ipcRenderer</code> 호출 23곳 일괄 전환)
                </>,
                <>
                  IPC 핸들러를 도메인별 모듈로 나눠{" "}
                  <B>신규 채널 추가 위치 6곳 → 1곳</B>
                </>,
                <>
                  STOMP 재연결 후 응답이 끊기는 장애를 진단, 클라이언트가 캐싱한
                  최초 세션 ID를 서버가 폐기하고 있어{" "}
                  <B>서버 발급 ID만 쓰도록</B> 바꿔 재발 차단
                </>,
                <>
                  일본 1호점 다국어에서 UI 번역만으로는 AI 답변이 한국어로 나와,{" "}
                  <code>languageTypeCd</code>를 모든 서버 요청에 실어{" "}
                  <B>AI 응답·TTS까지 언어 전환</B>
                </>,
              ]}
              links={[
                {
                  label: "포트폴리오: AI Coach",
                  href: "https://sangalog.com/portfolio/ai-coach",
                },
              ]}
            />

            <Project
              accent="teal"
              name="김캐디 사장님 — 스크린골프 매장 B2B SaaS"
              period="2025.07 — 현재"
              description="골프 매장 사장님을 위한 B2B SaaS입니다. PC와 모바일 프론트엔드를 담당하고 있고, 국내 1,000개 넘는 매장이 사용하고 있습니다."
              tags={[
                "React",
                "TypeScript",
                "Electron",
                "Recoil",
                "MUI 5",
                "Socket.IO",
                "React Hook Form",
                "Zod",
              ]}
              items={[
                <>
                  사장님 웹 nginx에 gzip·정적 파일 장기 캐시 적용,{" "}
                  <B>ALB 일평균 전송량 91%↓, 요청 수 40%↓</B> (배포 전후
                  CloudWatch 비교)
                </>,
                <>
                  운영팀이 월초 심야에 대기하며 직접 바꾸던 가격 변경에 지정일
                  예약 반영 구현, 예약 중 즉시 변경이 막히던 충돌은{" "}
                  <B>&ldquo;즉시는 항상 제출, 새 예약만 차단&rdquo; 규칙</B>으로
                  당일 정리
                </>,
                <>
                  숫자 코드와 글자로 섞여 있던 요금 분류를{" "}
                  <B>요일 상수로 바꾸자고 백엔드에 제안</B>, 프론트는 옛
                  데이터를 새 분류로 읽는 폴백 매핑 구현
                </>,
                <>
                  최종 제출에 몰려 있던 검증을{" "}
                  <B>&ldquo;가장 먼저 알 수 있는 시점에서 차단&rdquo;</B>으로
                  재배치: 검수 중이면 진입 즉시 차단, 변경 없는 제출은{" "}
                  <code>ref</code> 스냅샷 비교로 서버 호출 생략
                </>,
                <>
                  외부 폼(JotForm)으로는 UI·검증을 바꿀 수 없던 매장 양도양수
                  신청을 자체 페이지로 이전, zod <code>superRefine</code> 한
                  벌로 양도인·양수인 분기와 <B>단계 이동·최종 제출 이중 검증</B>
                </>,
              ]}
            />

            <Project
              accent="teal"
              name="전사 업무 자동화 · AI 워크플로우"
              description="현장에서 반복되던 작업을 자동화로 옮기고, 동료가 그대로 가져다 쓸 수 있게 사내 가이드와 블로그로 공유했습니다."
              tags={[]}
              items={[
                <>
                  <span className="block">
                    SVG 도면 변환 자동화: 매장 도면 room_id 매핑 수작업을 Claude
                    스킬로 옮겨 디자이너가 개발자 없이 직접 변환
                  </span>
                  <span className="mt-2 block">
                    <BlogBadge
                      href="https://blog.kimcaddie.com/start-claude-skill"
                      label="SVG 도면 변환 자동화"
                      accent="teal"
                    />
                  </span>
                </>,
                <>
                  주차 매장 설정의 <B>개발자 수정 13건 → 0건</B>, 새로 세팅한
                  7개 매장을 영업팀이 개발자 없이 완료 (공유 후 12주, 직전
                  3개월 대비·어드민 수정 이력 기준)
                </>,
                <>
                  주차장마다 다른 로그인 화면용 스크립트를 개발자 요청 대신 Claude
                  스킬로 생성, 폼을 미리 못 읽는 사이트는 실행 시점에 탐지 (동료
                  프롬프트 확장)
                </>,
              ]}
            />
          </div>

          {/* ════ 스마트스코어 ════ */}
          <div>
            <CompanyHeader
              logo={{ src: "/smartscore-logo.png", alt: "스마트스코어 로고" }}
              name="주식회사 스마트스코어"
              period="2023.04 — 2025.06"
              description="골프 O2O 플랫폼. 국내 골프장 70% 제휴, 누적 회원 400만+. Frontend Engineer"
            />
            <ProjectDivider accent="blue" />

            <Project
              first
              accent="blue"
              name="모바일 네트워크 광고 시스템"
              period="2024.12 — 2025.06"
              description="사내 처음으로 앱에 모바일 네트워크 광고를 도입한 프로젝트입니다. 사내 다른 개발팀도 광고 위치 번호 하나로 광고를 호출할 수 있는 공통 모듈을 설계했습니다."
              tags={["Vue2", "Webpack"]}
              items={[
                <>
                  load·open 동시 호출로 다른 페이지에서 광고가 뜨던 race를{" "}
                  <B>
                    <code>preload</code> / <code>load</code> / <code>open</code>{" "}
                    3단계 분리
                  </B>
                  로 해결 (<code>RepeatableLoad</code>로 닫힌 뒤 자동 재load)
                </>,
                <>
                  4가지 광고 타입을 처리하는 <B>공통 Mixin 모듈 설계</B>,{" "}
                  사내 다른 개발팀도 <code>idx</code> 한 줄로 광고 호출
                </>,
                <>
                  전면 광고 로딩(4~10초)·재생(5초) 중 추가 클릭으로 포인트만
                  차감되던 문제를,{" "}
                  <B>광고 호출 시 카운팅 플래그를 잠그고 닫힘 콜백에서 푸는 가드</B>
                  로 차단
                </>,
              ]}
              links={[
                {
                  label: "포트폴리오: 모바일 광고",
                  href: "https://sangalog.com/portfolio/mobile-ads",
                },
              ]}
            />

            <Project
              accent="blue"
              name="클럽 페이지 — 골프장 운영 데이터 대시보드"
              period="2024.03 — 2025.06"
              description="골프장 운영자가 내장객 분석과 매장 운영 지표를 보는 대시보드입니다."
              tags={["Vue3", "Pinia", "Highcharts", "Vite"]}
              items={[
                <>
                  차트 8개 동시 호출로 초기 로드가 30초까지 걸리던 병목을 진단,
                  백엔드와 병목 API 분리·캐싱 전략을 협의해 응답 지연 제거
                </>,
                <>
                  <B>TBT 3,180ms → 320ms (90%↓)</B>: Intersection Observer로
                  화면에 보이는 차트만 호출
                </>,
              ]}
              links={[
                {
                  label: "Intersection Observer 차트 최적화",
                  href: "https://sangalog.com/blog/intersection-observer",
                },
              ]}
            />

            <Project
              accent="blue"
              name="국내외 공식 웹사이트"
              period="2023.08 — 2025.06"
              description="스마트스코어 국내·해외 공식 웹사이트를 혼자 개발했습니다. 6개국 다국어를 지원합니다."
              tags={["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"]}
              items={[
                <>
                  글로벌 공식 웹사이트(6개국 다국어) 단독 구축 후 국내 전면
                  개편까지 담당, 도메인 이전·성능·SEO·폼 검증 재설계
                </>,
                <>
                  <B>LCP 6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0: 이미지 WebP
                  전환과 preload·fetchpriority, 이미지 CDN 없이 코드 변경만으로
                </>,
                <>
                  도메인 이전 시 색인 초기화에 대비해
                  사이트맵·robots.txt·Schema.org·Unhead 메타데이터를 이전과 동시
                  적용,{" "}
                  <B>Lighthouse SEO 83 → 92</B>
                </>,
                <>
                  풀 폼 라이브러리 대신 <B>검증 로직만 Zod로 분리</B>, 흩어진
                  정규식을 단일 스키마로 모으고 <code>isSubmitted</code>로 제출
                  후부터 실시간 검증
                </>,
              ]}
              links={[
                {
                  label: "포트폴리오: 공식 웹사이트 개편",
                  href: "https://sangalog.com/portfolio/smartscore-web",
                },
                {
                  label: "Lighthouse 성능 최적화 (LCP·CLS)",
                  href: "https://sangalog.com/blog/performance-optimization-lighthouse",
                },
                {
                  label: "SPA SEO 최적화",
                  href: "https://sangalog.com/blog/seo-optimization",
                },
                {
                  label: "Vue + Zod 폼 검증",
                  href: "https://sangalog.com/blog/vue-zod-validation",
                },
              ]}
            />
          </div>

          {/* ════ 효성강전 ════ */}
          <div>
            <CompanyHeader
              name="효성강전(주)"
              period="2014.08 — 2021.12"
              description="효성중공업 전동기·감속기 공식 특약점. Technical Sales Manager"
            />
            <ProjectDivider accent="neutral" />
            <Project
              first
              accent="neutral"
              name="전동기·감속기 기술영업"
              period="2014.08 — 2021.12"
              description="롯데케미칼, 한화파워(구 한화파워시스템), 광신기계공업, 영풍정밀 등 석유화학 플랜트 및 펌프·압축기 제조사의 주 거래처를 전담해 플랜트 증설·유지보수·해외 수출 프로젝트에 저압·고압 전동기와 감속기를 공급했습니다."
              tags={[]}
              items={[
                <>
                  고객사 플랜트 기술사양서에서 취부방식·보호등급·주위온도,
                  효율·방폭·선급 인증 등 <B>요구 사양을 정리</B>해 견적·입찰
                  담당, 본사와 단가·납기 협상
                </>,
                <>
                  발주 전 고객 요구와 본사 설계 스펙을 대조하고, 설계상 출력이
                  부족하면 고객사와 재협의해 사양을 확정, 제작 단계
                  재작업(Rework) 위험 감소
                </>,
                <>
                  해외 건(우즈베키스탄 CNG 설비 등)은 영문 사양서로 납품국
                  효율등급을 확인하고, 방폭 인증(<B>ATEX·TR-CU·IECEx</B>)은
                  보유분과 대조해 없는 인증 비용을 견적에 반영
                </>,
                <>
                  제작 일정을 주기적으로 확인하고, 파업·자재 수급 지연 때는 자재
                  업체에 직접 연락해 일정 차질을 줄임. 담당 거래처는 이탈 없이
                  수년간 거래가 이어짐
                </>,
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section>
        <h2 className="mb-12 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0e0e0e] sm:text-5xl">
          Activities
        </h2>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1e1e1e]">
              특허 등록 공동 발명자
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              AI 골프 레슨 방법 및 컴퓨팅 장치 (등록번호 10-2952712, 2026.04.17
              등록, 권리자 주식회사 김캐디). AI Coach 앱 프론트엔드 개발로 기여
            </p>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1e1e1e]">
              AWS Certified Cloud Practitioner
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              2026.04 취득
            </p>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1e1e1e]">
              기술 블로그 · 포트폴리오 운영
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              Next.js로 직접 만든 개인 사이트입니다. 프로젝트에서 마주친 문제와
              결정 과정을 글로 정리하고, 포트폴리오를 함께 운영합니다.
            </p>
            <div className="mt-3">
              <BlogBadge
                href="https://sangalog.com/"
                label="sangalog.com"
                accent="neutral"
              />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1e1e1e]">
              MDN 공식문서 한글 번역 기여
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              MDN Web Docs 한국어 번역 프로젝트 참여
            </p>
            <div className="mt-3">
              <BlogBadge
                href="https://github.com/mdn/translated-content/pull/18975"
                label="PR #18975 보기"
                accent="neutral"
              />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1e1e1e]">
              바닐라코딩 웹 개발 부트캠프
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              Prep / Bootcamp 과정, 2022.03 — 2022.12
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
