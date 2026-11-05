import Image from "next/image";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Resume",
  description: "프론트엔드 개발자 이상아의 이력서입니다.",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    title: "Resume",
    description: "프론트엔드 개발자 이상아의 이력서입니다.",
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
  logo: { src: string; alt: string };
  name: string;
  period: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <CompanyIcon src={logo.src} alt={logo.alt} />
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

const STRENGTHS = [
  {
    title: "고객 문제를 정책과 기능으로",
    proof:
      "선착순 쿠폰 조기 마감 문제를 영업과 함께 검토해 실사용 기준으로 전환",
  },
  {
    title: "기획부터 출시 후 운영까지",
    proof:
      "광고 구독을 테이블 설계부터 결제·화면·운영까지 7개 레포에서 구현, 출시 후 유료 갱신 성공률 96.6%",
  },
  {
    title: "데이터와 AI로 검증",
    proof:
      "SQL·로그로 원인을 좁히고, 에이전트 결론은 코드·데이터로 확인하는 규칙을 운영",
  },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {/* ── Hero ── */}
      <section className="mb-20">
        <h1 className="text-6xl font-black tracking-tight text-[#1e1e1e] sm:text-7xl">
          이상아
        </h1>
        <p className="mt-7 text-base leading-[1.7] text-[#6b7790] sm:text-lg">
          기술영업 7년을 거쳐 개발자가 됐고, 고객의 요구를 제품으로 바꾸는 일을
          합니다. 900개 매장이 쓰는 B2B SaaS와 무인 매장 Electron 앱에서 문제를
          정의하고, 정책을 정하고, 화면부터 서버·결제까지 구현한 뒤, 출시 후
          데이터로 결과를 확인합니다. AI 에이전트로 조사·구현·검증 흐름을
          설계해 일하되, 결정과 최종 검증은 직접 합니다.
        </p>
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
        <ul className="mt-10 flex flex-col gap-4 border-t border-[#d9dfe9] pt-8">
          {STRENGTHS.map((s) => (
            <li key={s.title} className="text-sm leading-[1.8]">
              <span className="block font-bold text-[#1e1e1e]">{s.title}</span>
              <span className="block text-[#45536d]">{s.proof}</span>
            </li>
          ))}
        </ul>
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
              description="국내 최대 실내 골프 마켓플레이스 — 무인 매장 170개+ 운영 · 12,000여 골프 시설 예약 지원 · 누적 200만+ 다운로드"
            />
            <ProjectDivider accent="teal" />

            <Project
              first
              accent="teal"
              name="광고 구독 — 사장님 솔루션 광고 상품 풀스택 구축"
              period="2026.06 — 현재"
              description="매장 사장님이 마커 광고·리스팅 광고를 월 구독으로 직접 신청하고 쿠폰까지 운영하는 상품. 테이블 설계부터 화면·API·결제 워커·배치·어드민까지 7개 레포를 직접 구현하고, 출시 후 결제·쿠폰 데이터를 직접 확인하며 운영. 현재 유료 구독 90여 개 매장이 사용 중."
              tags={[
                "React",
                "TypeScript",
                "Kotlin",
                "Spring",
                "Django",
                "MySQL",
                "SQS",
              ]}
              items={[
                <>
                  백엔드 리뷰를 반영해 쿠폰·결제를 새로 만드는 대신{" "}
                  <B>기존 테이블을 참조하고 회차 연결 테이블만 추가</B>, 신규
                  테이블 6개로 구성. 결제일을 예정일·다음 시도일로 나눠 재시도
                  상태 컬럼 없이 두 날짜 비교로 판별
                </>,
                <>
                  결제 결과가 PG→SQS→워커로 늦게 오는 구조라{" "}
                  <B>
                    <code>PENDING → ACTIVE/FAILED</code> 상태 전이
                  </B>
                  로 설계하고, 화면은 신청 응답이 아닌 폴링 결과로만 확정 — 10초
                  초과 시 안내 화면 전환, 재진입 시 폴링 재개,{" "}
                  <code>ref</code>로 같은 틱 중복 클릭 차단. 실측 결과 중앙값
                  2.8초, 30건 중 29건이 10초 안에 확정
                </>,
                <>
                  받아만 두고 안 쓰는 쿠폰 때문에 선착순이 일찍 마감돼 매장 문의가
                  반복되던 문제 — 두 기준의 장단점을 영업과 검토해{" "}
                  <B>실사용 기준 전환과 받기 한도 4배</B>를 결정하고, 손님 앱 배포
                  없이 서버에서 재해석해 사장님 화면엔 실사용 수량만 표기. 출시
                  후 실측으로 받은 쿠폰 34,445장 중 사용은 11,281장(32.8%)
                </>,
                <>
                  출시 후 3개월{" "}
                  <B>유료 갱신 265건 중 256건 성공(96.6%)</B>, 1차 실패 15건 중
                  6건은 재시도로 회복. 사장님이 직접 신청한 26곳 중 12곳은 이전
                  광고 결제 이력이 없던 매장 (결제 이력 기준, 테스트 매장 제외)
                </>,
                <>
                  &ldquo;두 달 무상&rdquo; 합의를 결제 중단 대신{" "}
                  <B>결제 금액 0원</B>으로 처리 — 결제 경로를 추적해 PG 호출 없이
                  성공 콜백이 돌아 갱신·쿠폰이 끊기지 않는 지점 선택
                </>,
                <>
                  출시 후 결제·쿠폰 데이터를 매일 대조해{" "}
                  <B>에러 없이 옛 시스템에서 돌던 매장을 발견</B> — 결제 재시도와
                  이관 제외 조건이 겹친 원인을 찾고, 전수 조회로 후보 7곳을 추려
                  매장별로 처리
                </>,
              ]}
              links={[
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
              name="Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스"
              period="2025.09 — 현재"
              description="김캐디의 해외 스크린 골프 및 연습장 예약 웹. 회사 최초 해외 매출을 만든 서비스로, 태국·필리핀·미국 매장에서 운영 중."
              tags={[
                "React",
                "TypeScript",
                "Recoil",
                "Stripe",
                "styled-components",
              ]}
              items={[
                <>
                  요일별 운영시간·매장별 게임 소요시간·룸별 기예약·현재 이전
                  시간 차단 <B>4중 조건을 동시 통과한 슬롯만 활성화</B>해 매장
                  운영 룰과 어긋난 예약을 입력 단계에서 차단.{" "}
                  <B>
                    백엔드 검증만 의존하면 사용자가 폼을 다 채운 뒤에야 충돌을
                    발견하는 UX
                  </B>
                  를 슬롯 선택 시점으로 끌어올려 해결
                </>,
                <>
                  백엔드와 협의해 최대 5초 이내 결제 결과가 도달함을 확인한 뒤
                  1초 간격 5회 폴링 설계. 결제 완료 후 단발성 확인이라
                  WebSocket보다 폴링이 적합하다고 판단.{" "}
                  <B>폴링 대기 중 결제 버튼을 비활성화해 중복 청구 차단</B>
                </>,
                <>
                  Google Sheets에서 번역이 추가·수정되면 빌드 시 변경된 부분만
                  감지해 6개 언어 번역 파일에 자동 반영되는 파이프라인 구축.
                  번역이 빠진 항목은 기본 언어로 대체 표시. Google Sheets 인증
                  키는{" "}
                  <B>
                    AWS Secrets Manager에서 빌드 시점에만 주입하고 종료 직후
                    폐기
                  </B>
                </>,
              ]}
            />

            <Project
              accent="teal"
              name="AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱"
              period="2025.07 — 현재"
              description="무인 스크린골프 매장에서 고객이 직접 실시간 스윙을 분석·코칭받는 Electron 데스크톱 앱. 입사 직후 프로토타입을 이어받아 프론트엔드 단독으로 핵심 기능부터 운영까지 책임."
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
                  매장 추가마다 JSON 수정·재빌드·현장 방문이 반복되던 구조를
                  인식 — 매장 시공 시 이미 등록된{" "}
                  <B>MAC Address로 환경설정을 서버에서 자동 수신</B>하는 구조로
                  전환하고, S3 자동 업로드 + Silent 설치 파이프라인 구축 —{" "}
                  <B>업데이트 시 매장 방문 완전 제거</B>
                </>,
                <>
                  차트 도입 시 ECharts import를 한 파일로 통일하고 사용 모듈만
                  명시 등록 — 사용하지 않는 차트 모듈이 main bundle에 묶이지
                  않도록 번들 구조를 정리해{" "}
                  <B>main bundle 압축 사이즈 760 KB → 592 KB (22%↓)</B>
                </>,
                <>
                  무인 매장 PC에서 스크린골프 시뮬레이터 주변기기와 IPC로
                  통신하는 구조에서 <code>contextIsolation: false</code>로 인한
                  XSS 위험 발견 — <code>contextBridge</code> 기반 최소 권한
                  API로 전환 + IPC 핸들러를 도메인별 Facade 모듈로 분리해{" "}
                  <B>신규 채널 추가 위치 6곳→1곳으로 단일화</B>, 렌더러 6개에
                  흩어진 <code>ipcRenderer</code> 호출 23곳 일괄 전환 — 원격
                  임의 제어 가능했던 보안 위험 제거
                </>,
                <>
                  STOMP 재연결은 성공하지만 메시지 응답이 끊기는 무응답 장애를
                  진단. 클라이언트가 <code>sessionStorage</code>에 캐싱한 최초
                  세션 ID로 구독 경로를 구성했으나, 서버는 매 연결마다{" "}
                  <code>user-name</code> 헤더로 새 세션 ID를 발급하고{" "}
                  <B>이전 ID를 폐기하는 구조</B>임을 식별 — 클라이언트 캐싱
                  분기를 제거하고 서버 발급 ID만 사용하도록 변경해{" "}
                  <B>재발 차단</B>
                </>,
              ]}
            />

            <Project
              accent="teal"
              name="사장님 솔루션 — 스크린골프 매장 B2B SaaS"
              period="2025.07 — 현재"
              description="골프 매장 사장님을 위한 B2B SaaS. PC + 모바일 프론트엔드 개발 담당. 국내 900개+ 매장이 구독 중."
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
                  사장님 웹 nginx에 gzip과 정적 파일 장기 캐시를 적용해{" "}
                  <B>ALB 일평균 전송량 91%↓, 요청 수 48%↓</B> (배포 전후
                  CloudWatch 비교)
                </>,
                <>
                  <code>weekday</code> 필드 하나에 의미 없는 숫자
                  코드(&ldquo;1&rdquo;·&ldquo;2&rdquo;·&ldquo;4&rdquo;)가 뒤섞인
                  레거시 — 백엔드에 제안해 <code>price_category_cd</code> 배열
                  필드를 신설하고 <code>WEEKDAY</code>·<code>HOLIDAY</code>·
                  <code>FOURSOME</code> 상수로 분리. 새 필드 있으면 그대로,
                  없으면 기존 숫자를 상수로 매핑하는 폴백으로{" "}
                  <B>전체 데이터를 한 번에 갈아엎지 않고 점진적 전환</B>,
                  상수·그룹핑·라벨·폴백을 단일 파일에 응집
                </>,
                <>
                  검증이 최종 제출에 몰려 있던 구조를{" "}
                  <B>&ldquo;가장 먼저 알 수 있는 시점에서 차단&rdquo;</B>{" "}
                  원칙으로 전환 — 검수 중 진입 즉시 차단, 변경 없는 제출은{" "}
                  <code>ref</code> 스냅샷 비교로 불필요한 서버 호출 제거
                </>,
                <>
                  외부 폼(JotForm)으로는 UI·검증을 원하는 대로 바꿀 수 없어,
                  매장 양도양수 신청을 사장님 솔루션 안 자체 페이지로 옮겨
                  react-hook-form + zod로 구현. 양도인/양수인 필드 차이를 역할별
                  스키마 분리 대신 zod <code>superRefine</code> 한 벌로 분기해
                  타입을 단일 출처로 유지. 여러 단계로 나눈 신청 폼에서
                  역할·옵션에 따라 검증 항목을 달리하고,{" "}
                  <B>
                    다음 단계로 넘어갈 때 잘못된 입력을 바로 막고 최종 제출 때
                    zod로 한 번 더 거르는 이중 검증
                  </B>
                  으로 설계
                </>,
              ]}
            />

            <Project
              accent="teal"
              name="전사 업무 자동화 · AI 워크플로우"
              description="현장에서 마주친 반복 작업을 자동화로 옮기고, 동료가 그대로 가져다 쓸 수 있게 사내 가이드·블로그로 공유."
              tags={[]}
              items={[
                <>
                  <span className="block">
                    주간 배포 요약 슬랙 자동화 — GitHub 각 레포 PR을 자동
                    수집·요약해 전사 슬랙 채널에 발행, 비개발자도 배포 내역 즉시
                    파악 가능
                  </span>
                  <span className="mt-2 block">
                    <BlogBadge
                      href="https://blog.kimcaddie.com/slack-autobot-skill"
                      label="주간 배포 요약 슬랙 자동화"
                      accent="teal"
                    />
                  </span>
                </>,
                <>
                  <span className="block">
                    SVG 도면 변환 자동화 — 골프장 매장 도면 room_id 매핑 수동
                    작업(1시간+)을 수 분으로 단축, 디자이너 단독 실행 가능한
                    구조로 전환
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
                  주차장 사이트마다 로그인 화면이 달라 무인 매장 시공 때 자동
                  로그인 스크립트를 개발자에게 요청하던 흐름을, 동료의 프롬프트를
                  확장한 Claude 스킬로 전환 — 로그인 URL과 계정만 넣으면 페이지를
                  분석해 생성하고, 폼을 미리 못 읽는 사이트는 실행 시점에 탐지.
                  공유 후 3개월간{" "}
                  <B>새로 세팅한 7개 매장을 영업팀이 개발자 없이 완료</B>, 주차
                  매장 설정의 개발자 수정은 13건 → 0건 (직전 3개월 대비, 어드민
                  수정 이력 기준)
                </>,
                <>
                  영업팀이 사이트 배너·입력폼 접수 알림을 슬랙에서만 받아
                  검색·관리가 어렵던 구조를, Apps Script로 Google Sheets에 자동
                  적재 — <B>리드를 날짜별 분류·필터링·담당자 지정으로 관리</B>
                </>,
                <>
                  수기로 뽑던 광고 매출을 결제 로그 기준 집계로 표준화 — 광고월
                  정의, 자동화 전후 비교, 이탈 매장까지{" "}
                  <B>명령 하나로 재현</B>
                </>,
                <>
                  원인 조사·티켓·구현·QA를 역할별 에이전트 세션으로 나눠 운영.
                  구현하지 않은 에이전트가 깨는 시나리오를 실행해 재현 증거를
                  넘기고, <B>판정과 배포 결정은 직접</B>
                </>,
                <>
                  집계만 보고 틀린 판단을 전달 문장에 쓴 사고 뒤,{" "}
                  <B>
                    코드·조회 조건·실제 1건 추적·예외 분류를 거친 사실만 전달
                  </B>
                  하도록 에이전트 규칙으로 고정
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
              description="국내 1위 골프 O2O 플랫폼 — 국내 골프장 70% 제휴 · 누적 회원 400만+"
            />
            <ProjectDivider accent="blue" />

            <Project
              first
              accent="blue"
              name="모바일 네트워크 광고 시스템"
              period="2024.12 — 2025.06"
              description="사내 최초로 모바일 네트워크 광고를 도입한 프로젝트. 다른 앱에서 import 한 줄로 도입 가능한 공통 모듈을 설계."
              tags={["Vue2", "Webpack"]}
              items={[
                <>
                  광고 호출 시 라이브러리 로딩으로 노출이 지연되고, load·open
                  동시 호출 시 페이지 이탈하면 다른 페이지에서 광고가 뜨는
                  race도 발생하던 구조를, 사용자 흐름에 따라{" "}
                  <B>
                    <code>preload</code> / <code>load</code> / <code>open</code>{" "}
                    3단계로 분리
                  </B>{" "}
                  + <code>RepeatableLoad</code> 옵션으로 Open/Close 후 자동 재
                  Load — 모든 흐름에서 끊김 없이 즉시 노출
                </>,
                <>
                  4가지 광고 타입(InterstitialImage / InterstitialVideo /
                  RewardVideo / BottomModal)을 통합 처리하는{" "}
                  <B>공통 Mixin 모듈 설계</B> — OS·Placement ID 상수화, 각
                  타입별 콜백 액션 매핑, <code>idx</code>만으로 광고 호출 가능한
                  구조로 일원화해 <B>다른 앱에서 import 한 줄로 도입 가능</B>
                </>,
                <>
                  포인트 전환 버튼이 클릭마다 포인트 차감되는 흐름에서, 5회/10회
                  진입 시 5초 전면 비디오 광고 트리거. 광고 로딩(4~10초) +
                  재생(5초) 동안 추가 클릭으로 포인트만 계속 차감되던 문제를,{" "}
                  <B>
                    광고 호출 시 카운팅 플래그를 false로 잠그고{" "}
                    <code>OnInterstitialVideoAdClosed</code> 콜백에서 true로
                    복귀
                  </B>
                  하는 가드로 해결
                </>,
              ]}
            />

            <Project
              accent="blue"
              name="클럽 페이지 — 골프장 운영 데이터 대시보드"
              period="2024.03 — 2025.06"
              description="골프장 운영자를 위한 내장객 분석 및 매장 운영 지표 시각화 대시보드."
              tags={["Vue3", "Pinia", "Highcharts", "Vite"]}
              items={[
                <>
                  8개 차트 동시 호출로 초기 로드 30초까지 걸리던 문제를 진단 —
                  백엔드와 병목 API를 분리하고 캐싱 전략을 협의해{" "}
                  <B>API 응답 지연 원인 제거</B>
                </>,
                <>
                  API 최적화 후에도 8개 차트를 동시에 그리는 구조 자체가 메인
                  스레드 병목임을 진단 — Intersection Observer로 화면에 보이는
                  차트만 호출하도록 렌더링 전략 전환해{" "}
                  <B>TBT 3,180ms → 320ms (90%↓)</B>
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
              description="스마트스코어 국내 및 해외 공식 웹사이트 단독 개발. 6개국 다국어 지원."
              tags={["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"]}
              items={[
                <>
                  글로벌 공식 웹사이트(6개국 다국어) 단독 구축 후 국내 전면
                  개편까지 전담 — 도메인 이전·성능·SEO·폼 검증 전 영역 재설계
                </>,
                <>
                  이미지 WebP 전환 + preload·fetchpriority 적용 —{" "}
                  <B>LCP 6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0
                </>,
                <>
                  도메인 이전 시 검색 색인 리셋 위험을 인지하고,
                  사이트맵·robots.txt·Schema.org + Unhead 기반 라우터 통합
                  메타데이터 관리로 SEO 세팅 — <B>Lighthouse SEO 83 → 92점</B>
                </>,
                <>
                  폼 검증을 위해 vee-validate·vuelidate 같은 풀 폼 라이브러리
                  도입 대신, <B>검증 로직만 Zod로 분리</B>하는 선택. 필드별로
                  흩어져 있던 정규표현식을 단일 스키마로 응집하고,{" "}
                  <code>isSubmitted</code> 상태로 첫 진입 에러 숨김 + 제출 후
                  실시간 검증 UX 적용
                </>,
              ]}
              links={[
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
              기술 블로그 · 포트폴리오 운영
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              Next.js로 직접 구축한 개인 사이트. 프로젝트에서 마주친 문제와
              의사결정 과정을 글로 정리하고, 포트폴리오를 함께 운영
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
              특허 출원 공동 발명자 등재
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7f8da9]">
              AI 골프 레슨 방법 및 컴퓨팅 장치 · 프론트엔드 단독 개발 기여
              (출원번호 10-2025-0133876)
            </p>
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
        </div>
      </section>
    </div>
  );
}
