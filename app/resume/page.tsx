import Image from "next/image";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Resume",
  description: "이상아 이력서. 김캐디 Product Engineer, 프론트엔드 담당.",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    title: "Resume",
    description: "이상아 이력서. 김캐디 Product Engineer, 프론트엔드 담당.",
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

const STRENGTHS = [
  {
    title: "문제 정의",
    proof:
      "매장 문의가 반복되던 선착순 쿠폰 조기 마감을, 다운로드 기준과 실사용 기준의 장단점을 영업과 비교해 실사용 기준으로 바꿨습니다.",
  },
  {
    title: "기획부터 출시 후 운영까지",
    proof:
      "광고 구독 상품을 테이블 설계부터 화면, API, 어드민까지 7개 레포에서 구현했고, 출시 후 3개월 유료 갱신 성공률은 96.6%입니다.",
  },
  {
    title: "이해관계자 조율",
    proof:
      "테이블 설계는 백엔드 리뷰로, 쿠폰 기준과 무상 조건은 영업과 정했습니다. 기한 안에 어려운 카카오 광고 발송은 신청만 자동으로 받고 발송은 영업이 맡도록 범위를 조정했습니다.",
  },
  {
    title: "데이터로 검증",
    proof:
      "출시 후 결제와 쿠폰 데이터를 매일 대조해, 에러가 나지 않아 눈에 띄지 않던 옛 시스템 매장을 찾았습니다. AI 에이전트의 결론은 코드와 실제 데이터로 확인한 뒤에만 씁니다.",
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
          기술영업 7년을 거쳐 개발자가 됐습니다. 900+개 매장이 쓰는 B2B SaaS와
          무인 매장에서 사용 가능한 Electron 앱을 만들고 있습니다. 고객의
          말에서 문제를 정의하는 일부터 화면·서버·어드민 구현, 출시 후 지표
          확인까지 맡으며, AI 에이전트를 활용해 일의 속도를 높이고 있습니다.
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
              description="실내 골프 마켓플레이스. 무인 매장 170+개 운영, 12,000여 골프 시설 예약 지원, 누적 200만+ 다운로드. Product Engineer (2026.06 — 현재) · Frontend Engineer (2025.06 — 2026.06)"
            />
            <ProjectDivider accent="teal" />

            <Project
              first
              accent="teal"
              name="광고 구독 — 사장님 솔루션 광고 상품 풀스택 구축"
              period="2026.06 — 현재"
              description="매장 사장님이 마커 광고·리스팅 광고를 월 구독으로 직접 신청하고 쿠폰까지 운영하는 상품입니다. 테이블 설계부터 화면, API, 결제 결과 처리, 배치, 어드민까지 7개 레포를 직접 구현하고, 출시 후 결제·쿠폰 데이터를 확인하며 운영하고 있습니다. 유료 구독 90여 개 매장이 사용 중입니다."
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
                  <B>문제.</B> 사장님이 영업 담당자를 거치지 않고 광고를 직접
                  신청·결제하고, 매달 갱신되는 회차마다 쿠폰을 운영할 수 있어야
                  했습니다. 기존 쿠폰·주문·결제 시스템과 이미 광고를 쓰던 매장을
                  깨지 않고 이어야 했습니다.
                </>,
                <>
                  백엔드 리뷰를 반영해 쿠폰·결제를 새로 만드는 대신{" "}
                  <B>기존 테이블을 참조하고 회차 연결 테이블만 추가</B>해 신규
                  테이블 6개로 구성했습니다. 결제일은 예정일과 다음 시도일로 나눠,
                  재시도 상태 컬럼 없이 두 날짜 비교로 판별합니다.
                </>,
                <>
                  결제 결과가 PG→SQS→워커로 늦게 오는 구조라{" "}
                  <B>
                    <code>PENDING → ACTIVE/FAILED</code> 상태 전이
                  </B>
                  로 설계하고, 화면은 신청 응답이 아닌 폴링 결과로만 확정합니다.
                  10초 초과 시 안내 화면으로 전환하고, 재진입 시 폴링을
                  재개하며, <code>ref</code>로 같은 틱 중복 클릭을 막았습니다.
                  실측 중앙값 2.8초, 30건 중 29건이 10초 안에 확정됐습니다.
                </>,
                <>
                  받아만 두고 안 쓰는 쿠폰 때문에 선착순이 일찍 마감돼 매장 문의가
                  반복됐습니다. 두 기준의 장단점을 영업과 검토해{" "}
                  <B>실사용 기준 전환과 받기 한도 4배</B>를 정했고, 손님 앱 배포
                  없이 서버에서 재해석해 사장님 화면엔 실사용 수량만 보이게
                  했습니다. 출시 후 받은 쿠폰 34,445장 중 11,281장(32.8%)이
                  사용됐습니다.
                </>,
                <>
                  출시 후 3개월{" "}
                  <B>유료 갱신 265건 중 256건 성공(96.6%)</B>, 1차 실패 15건 중
                  6건은 재시도로 회복했습니다. 사장님이 직접 신청한 26곳 중
                  12곳은 이전 광고 결제 이력이 없던 매장입니다. (결제 이력 기준,
                  테스트 매장 제외)
                </>,
                <>
                  &ldquo;두 달 무상&rdquo; 합의를 결제 중단 대신{" "}
                  <B>결제 금액 0원</B>으로 처리했습니다. 결제 경로를 추적해 PG
                  호출 없이 성공 콜백이 돌아 갱신·쿠폰이 끊기지 않는 지점을
                  골랐습니다.
                </>,
                <>
                  출시 후 결제·쿠폰 데이터를 매일 대조해{" "}
                  <B>에러 없이 옛 시스템에서 돌던 매장을 발견</B>했습니다. 결제
                  재시도와 이관 제외 조건이 겹친 원인을 찾고, 전수 조회로 후보
                  7곳을 추려 매장별로 처리했습니다.
                </>,
                <>
                  운영 중 정책을 정해 반영했습니다. 갱신 결제는 3회 재시도 후
                  해지, 당일 환불도 하루치 차감, 못 쓴 쿠폰은 다음 달 이월, 기간
                  안에 쿠폰을 못 쓰는 매장은 영업이 어드민에서 기간 연장(기간당
                  1회, 최대 한 달). 다음에 볼 지표는 갱신 유지율로, 기존 매장
                  95.2%와 신규 매장 68.0%의 차이입니다.
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
              name="Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스"
              period="2025.09 — 현재"
              description="김캐디의 해외 스크린골프·연습장 예약 웹입니다. 회사 최초 해외 매출을 만든 서비스로, 태국·필리핀·미국 매장에서 운영 중입니다. 예약 슬롯 검증, 결제 결과 폴링, 다국어 빌드 파이프라인을 맡았습니다."
              tags={[
                "React",
                "TypeScript",
                "Recoil",
                "styled-components",
                "i18next",
              ]}
              items={[
                <>
                  요일별 운영시간, 매장별 게임 소요시간, 룸별 기예약, 현재 이전
                  시간 차단. <B>네 조건을 모두 통과한 슬롯만 활성화</B>해 매장
                  운영 룰과 어긋난 예약을 입력 단계에서 막았습니다. 백엔드 검증만
                  두면 폼을 다 채운 뒤에야 충돌을 알게 되는 흐름을 슬롯 선택
                  시점으로 앞당겼습니다. 동시성 충돌은 백엔드가 최종 검증합니다.
                </>,
                <>
                  결제 결과가 최대 5초 안에 도착한다는 것을 백엔드와 확인한 뒤 1초
                  간격 5회 폴링으로 설계했습니다. 결제 완료 후 한 번만 확인하면
                  되는 흐름이라 WebSocket보다 폴링이 맞다고 봤습니다.{" "}
                  <B>폴링 대기 중 결제 버튼을 비활성화해 중복 청구를 막았습니다.</B>
                </>,
                <>
                  Google Sheets에서 번역이 추가·수정되면 빌드 시 변경된 부분만
                  감지해 6개 언어 번역 파일에 반영되는 파이프라인을 만들었습니다.
                  번역이 빠진 항목은 기본 언어로 대체합니다. 번역 CMS는 번역 규모
                  대비 비용이 커서 쓰지 않았습니다. Google Sheets 인증 키는{" "}
                  <B>
                    AWS Secrets Manager에서 빌드 시점에만 주입하고 종료 직후
                    삭제
                  </B>
                  합니다.
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
                  매장을 추가할 때마다 JSON 수정, 재빌드, 현장 방문이 반복되던
                  구조를 바꿨습니다. 매장 시공 시 이미 등록되는{" "}
                  <B>MAC Address로 환경설정을 서버에서 자동 수신</B>하게 하고, S3
                  자동 업로드와 Silent 설치 파이프라인을 만들어{" "}
                  <B>업데이트 때 매장 방문이 필요 없어졌습니다.</B> 5개 테스트
                  매장에서 운영 중입니다.
                </>,
                <>
                  ECharts import를 한 파일로 모으고 쓰는 모듈만 등록하도록
                  정리해, 한 화면에서만 쓰는 차트가 모든 페이지 번들에 묶이지
                  않게 했습니다.{" "}
                  <B>main bundle 압축 사이즈 760 KB → 592 KB (22%↓)</B>
                </>,
                <>
                  무인 매장 PC에서 시뮬레이터 주변기기와 IPC로 통신하는 구조에서{" "}
                  <code>contextIsolation: false</code>로 인한 원격 임의 실행
                  위험을 발견해 <code>contextBridge</code> 기반 최소 권한 API로
                  전환했습니다. IPC 핸들러를 도메인별 모듈로 나눠{" "}
                  <B>신규 채널 추가 위치를 6곳에서 1곳으로</B> 줄이고, 렌더러
                  6개에 흩어진 <code>ipcRenderer</code> 호출 23곳을 일괄
                  전환했습니다.
                </>,
                <>
                  STOMP 재연결은 되는데 메시지 응답이 끊기는 장애를 진단했습니다.
                  클라이언트는 <code>sessionStorage</code>에 캐싱한 최초 세션
                  ID로 구독 경로를 만들었지만, 서버는 연결마다 새 세션 ID를
                  발급하고 <B>이전 ID를 폐기</B>하고 있었습니다. 클라이언트
                  캐싱을 없애고 서버 발급 ID만 쓰도록 바꿔 재발을 막았습니다.
                </>,
                <>
                  일본 1호점 준비로 다국어를 붙이면서, UI 번역만으로는 AI 답변이
                  한국어로 나오는 문제가 있어 <code>languageTypeCd</code>를 모든
                  서버 요청에 실어 AI 응답과 TTS까지 함께 바꾸도록 했습니다.
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
              name="사장님 솔루션 — 스크린골프 매장 B2B SaaS"
              period="2025.07 — 현재"
              description="골프 매장 사장님을 위한 B2B SaaS입니다. PC와 모바일 프론트엔드를 담당하고 있고, 국내 900개 넘는 매장이 구독 중입니다."
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
                  코드(&ldquo;1&rdquo;·&ldquo;2&rdquo;·&ldquo;4&rdquo;)가 섞여
                  있던 요금 데이터를, 백엔드에 제안해 <code>price_category_cd</code>{" "}
                  배열 필드와 <code>WEEKDAY</code>·<code>HOLIDAY</code>·
                  <code>FOURSOME</code> 상수로 분리했습니다. 새 필드가 있으면
                  그대로 쓰고 없으면 기존 숫자를 상수로 매핑하는 폴백을 둬,{" "}
                  <B>전체 데이터를 한 번에 갈아엎지 않고 점진적으로 전환</B>
                  했습니다.
                </>,
                <>
                  검증이 최종 제출에 몰려 있던 구조를{" "}
                  <B>&ldquo;가장 먼저 알 수 있는 시점에서 차단&rdquo;</B>{" "}
                  원칙으로 바꿨습니다. 검수 중이면 진입 즉시 막고, 변경 없는
                  제출은 <code>ref</code> 스냅샷 비교로 서버 호출을 생략합니다.
                </>,
                <>
                  외부 폼(JotForm)으로는 UI와 검증을 원하는 대로 바꿀 수 없어,
                  매장 양도양수 신청을 사장님 솔루션 안 자체 페이지로 옮겨
                  react-hook-form과 zod로 구현했습니다. 양도인·양수인 필드
                  차이는 역할별 스키마를 나누는 대신 zod{" "}
                  <code>superRefine</code> 한 벌로 분기해 타입을 단일 출처로
                  유지했고,{" "}
                  <B>
                    단계 이동 시 잘못된 입력을 바로 막고 최종 제출 때 zod로 한 번
                    더 거르는 이중 검증
                  </B>
                  으로 설계했습니다.
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
                    주간 배포 요약 슬랙 자동화. GitHub 각 레포 PR을 자동으로
                    수집·요약해 전사 슬랙 채널에 발행합니다. 비개발자도 배포
                    내역을 바로 확인할 수 있습니다.
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
                    SVG 도면 변환 자동화. 골프장 매장 도면 room_id 매핑 수작업(1시간
                    이상)을 몇 분으로 줄이고, 디자이너가 혼자 실행할 수 있게
                    했습니다.
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
                  확장한 Claude 스킬로 바꿨습니다. 로그인 URL과 계정만 넣으면
                  페이지를 분석해 생성하고, 폼을 미리 못 읽는 사이트는 실행
                  시점에 탐지합니다. 공유 후 3개월간{" "}
                  <B>새로 세팅한 7개 매장을 영업팀이 개발자 없이 완료</B>했고,
                  주차 매장 설정의 개발자 수정은 13건에서 0건이 됐습니다. (직전
                  3개월 대비, 어드민 수정 이력 기준)
                </>,
                <>
                  영업팀이 사이트 배너·입력폼 접수 알림을 슬랙에서만 받아
                  검색·관리가 어렵던 구조를, Apps Script로 Google Sheets에 자동
                  적재하도록 바꿨습니다. <B>리드를 날짜별 분류·필터링·담당자
                  지정으로 관리</B>합니다.
                </>,
                <>
                  수기로 뽑던 광고 매출을 결제 로그 기준 집계로 표준화했습니다.
                  광고월 정의, 자동화 전후 비교, 이탈 매장까지{" "}
                  <B>명령 하나로 재현</B>됩니다.
                </>,
                <>
                  원인 조사, 티켓, 구현, QA를 역할별 에이전트 세션으로 나눠
                  운영합니다. 구현하지 않은 에이전트가 깨는 시나리오를 실행해
                  재현 증거를 넘기고, <B>판정과 배포 결정은 직접</B> 합니다.
                </>,
                <>
                  집계만 보고 틀린 판단을 전달 문장에 쓴 사고 뒤,{" "}
                  <B>
                    코드, 조회 조건, 실제 1건 추적, 예외 분류를 거친 사실만 전달
                  </B>
                  하도록 에이전트 규칙으로 고정했습니다.
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
              description="사내 처음으로 앱에 모바일 네트워크 광고를 도입한 프로젝트입니다. 다른 앱에서 import 한 줄로 쓸 수 있는 공통 모듈을 설계했습니다."
              tags={["Vue2", "Webpack"]}
              items={[
                <>
                  광고 호출 시 라이브러리 로딩으로 노출이 늦고, load와 open을
                  동시에 부르면 페이지를 벗어났을 때 다른 페이지에서 광고가 뜨는
                  race가 있었습니다. 사용자 흐름에 따라{" "}
                  <B>
                    <code>preload</code> / <code>load</code> / <code>open</code>{" "}
                    3단계로 분리
                  </B>
                  하고, <code>RepeatableLoad</code> 옵션으로 닫힌 뒤 자동으로
                  다시 load하게 해 모든 흐름에서 바로 노출되게 했습니다.
                </>,
                <>
                  4가지 광고 타입(InterstitialImage / InterstitialVideo /
                  RewardVideo / BottomModal)을 한 번에 처리하는{" "}
                  <B>공통 Mixin 모듈을 설계</B>했습니다. OS·Placement ID를
                  상수화하고 타입별 콜백 액션을 매핑해 <code>idx</code>만으로
                  광고를 호출할 수 있고, <B>다른 앱에서 import 한 줄로 도입</B>
                  됩니다.
                </>,
                <>
                  포인트 전환 버튼이 클릭마다 포인트를 차감하는 흐름에서 5회/10회
                  진입 시 5초 전면 비디오 광고가 뜨는데, 광고 로딩(4~10초)과
                  재생(5초) 동안 추가 클릭으로 포인트만 계속 차감됐습니다.{" "}
                  <B>
                    광고 호출 시 카운팅 플래그를 잠그고{" "}
                    <code>OnInterstitialVideoAdClosed</code> 콜백에서 푸는
                  </B>{" "}
                  가드로 해결했습니다.
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
                  차트 8개를 동시에 호출해 초기 로드가 30초까지 걸리던 문제를
                  진단했습니다. 백엔드와 병목 API를 나누고 캐싱 전략을 협의해{" "}
                  <B>API 응답 지연 원인을 없앴습니다.</B>
                </>,
                <>
                  API 개선 후에도 차트 8개를 한꺼번에 그리는 구조 자체가 메인
                  스레드 병목이었습니다. Intersection Observer로 화면에 보이는
                  차트만 호출하도록 바꿔 <B>TBT 3,180ms → 320ms (90%↓)</B>
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
                  글로벌 공식 웹사이트(6개국 다국어)를 혼자 구축한 뒤 국내 전면
                  개편까지 맡았습니다. 도메인 이전, 성능, SEO, 폼 검증을 다시
                  설계했습니다.
                </>,
                <>
                  이미지 WebP 전환과 preload·fetchpriority 적용으로{" "}
                  <B>LCP 6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0. 이미지 CDN
                  없이 코드 변경만으로 얻은 수치입니다.
                </>,
                <>
                  도메인 이전 시 검색 색인이 초기화될 위험에 대비해
                  사이트맵·robots.txt·Schema.org와 Unhead 기반 라우터 통합
                  메타데이터 관리를 이전과 동시에 적용했습니다.{" "}
                  <B>Lighthouse SEO 83 → 92점</B>
                </>,
                <>
                  vee-validate·vuelidate 같은 풀 폼 라이브러리 대신{" "}
                  <B>검증 로직만 Zod로 분리</B>했습니다. 필드별로 흩어져 있던
                  정규표현식을 단일 스키마로 모으고, <code>isSubmitted</code>{" "}
                  상태로 첫 진입 에러는 숨기고 제출 후부터 실시간 검증하도록
                  했습니다.
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
              description="연 매출 40억 원 안팎의 효성중공업 전동기·감속기 공식 특약점(경남 창원). 영업부 과장"
            />
            <ProjectDivider accent="neutral" />
            <Project
              first
              accent="neutral"
              name="전동기·감속기 기술영업"
              period="2014.08 — 2021.12"
              description="석유화학 플랜트 및 펌프·압축기 제조사(롯데케미칼, 광신기계공업, 영풍정밀 등)의 주 거래처를 전담해 플랜트 증설·유지보수·해외 수출 프로젝트에 저압·고압 전동기와 감속기를 공급했습니다."
              tags={[]}
              items={[
                <>
                  <B>사양 분석 및 입찰:</B> 고객사 플랜트의 전체 기술사양서를
                  분석해 전동기·감속기 요구 스펙을 도출하고, 최적 모델 선정 및
                  견적·입찰을 진행했습니다. 효성중공업 본사와 단가·납기 조건을
                  협상해 수주 경쟁력을 확보했습니다.
                </>,
                <>
                  <B>기술 사양 조율 및 확정:</B> 고객 요구사항과 본사 설계팀 스펙
                  간의 기술적 정합성을 사전 검토하며 발주 오차를 최소화하기 위해
                  노력했습니다. 최종 사양 승인 절차를 전담해 제작 단계의
                  재작업(Rework) 리스크를 줄였습니다.
                </>,
                <>
                  <B>글로벌 방폭 규격 대응:</B> 해외 플랜트 프로젝트(우즈베키스탄
                  CNG 설비 등)의 영문 사양서를 분석해 국가별 방폭 규격(ATEX,
                  TR CU, IECEx)을 검토했습니다. 인증 충족 여부 및 관련 비용을
                  견적 단계에 선제 반영해 통관·인도 리스크를 방지했습니다.
                </>,
                <>
                  <B>공정 및 납기 리스크 관리:</B> 제조 공정 전반을 트래킹하며
                  파업, 자재 수급 차질 등 생산 병목 발생 시 제조 공장 및
                  협력업체와 직접 일정·원자재를 조율해 고객 납기를 지켰습니다.
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
