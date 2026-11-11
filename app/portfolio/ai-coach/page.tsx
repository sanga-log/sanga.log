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
  title: "AI Coach — Portfolio",
  description:
    "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 데스크톱 앱. 프로토타입을 이어받아 프론트엔드를 혼자 맡고 상용화 현장 테스트까지 간 기록. 의사결정, 트레이드오프, 회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/ai-coach` },
  openGraph: {
    title: "AI Coach — Portfolio",
    description:
      "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 데스크톱 앱. 프로토타입을 이어받아 프론트엔드를 혼자 맡고 상용화 현장 테스트까지 간 기록. 의사결정, 트레이드오프, 회고.",
    url: `${SITE_URL}/portfolio/ai-coach`,
  },
};

export default function AICoachPortfolioPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 break-keep [overflow-wrap:anywhere]">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        <span>Portfolio</span>
      </Link>

      <section className="border-b border-black pb-12 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
          AI Coach
        </h1>
        <p className="text-base leading-relaxed text-gray-500 mt-4 mb-5">
          무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는
          Electron 앱입니다. 입사 직후 프로토타입을 이어받아 프론트엔드를 혼자
          맡았습니다.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "React",
            "TypeScript",
            "Electron",
            "Recoil",
            "WebSocket",
            "ECharts",
            "i18next",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 성과</SectionLabel>
        <BulletList
          items={[
            "빌드, 배포, 설치를 자동화해 업데이트 때 매장 방문이 없어졌습니다.",
            <>
              main bundle 압축 사이즈 <B>760 KB → 592 KB (22%↓)</B>. 차트
              라이브러리 진입점을 한 파일로 모아 한 화면의 차트가 전 페이지
              번들에 묶이지 않게 했습니다.
            </>,
            <>
              <code>contextBridge</code> 화이트리스트로 렌더러 권한을 필요한
              API로 좁히고, 신규 IPC 등록 위치를 <B>6곳에서 1곳으로</B>{" "}
              줄였습니다.
            </>,
            "특허 공동 발명자 등재: AI 골프 레슨 방법 및 컴퓨팅 장치 (등록번호 10-2952712, 2026.04.17 등록)",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>실제 화면</SectionLabel>
        <video
          src="/videos/ai-coach.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls
          aria-label="언어를 고르고 클럽을 선택해 세 번 스윙한 뒤, 분석 결과와 차트를 보고 설문 후 첫 화면으로 돌아오는 화면 녹화"
          className="w-full h-auto border border-gray-200"
        />
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          실제 앱 화면에 예시 데이터를 넣어 재현했습니다. 스윙 영상은 실제 사람
          대신 그린 인형이고, 점수·비거리·피드백은 지어낸 값입니다.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>풀어야 했던 문제</SectionLabel>
        <BulletList
          items={[
            "무인 매장 PC에서 도는 앱인데, 매장을 추가하거나 업데이트할 때마다 개발자가 빌드하고 현장을 방문해야 했습니다.",
            "시뮬레이터 주변기기와 IPC로 통신하는 구조에서, 원격 SPA를 띄우는 렌더러에 Node 권한을 어디까지 열어 둘지 다시 정해야 했습니다.",
            "일본 1호점 준비로 다국어가 필요했고, UI만 번역하면 AI 답변과 음성은 한국어로 나왔습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>내 역할과 협업</SectionLabel>
        <BulletList
          items={[
            "직접 한 일: Electron 앱 프론트엔드 전체(화면, IPC 구조, 빌드·배포 파이프라인, 다국어, 로그), 매장 현장 테스트",
            "함께한 일: MAC Address로 매장 정보를 내려주는 API와 언어별 AI 응답·TTS는 백엔드와 협의해 받았습니다. 스윙 분석 AI와 서버는 백엔드·AI 담당자가 맡았습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 의사결정</SectionLabel>

        <Decision
          number={1}
          title="운영 사이클의 무인화"
          body={
            <>
              <p>
                무인 스크린골프 매장에서 도는 Electron 앱인데, 정작 빌드·S3
                업로드·환경설정·로그 확인은 전부 수작업이었습니다. 매장을 하나
                추가할 때마다 JSON 수정 → 재빌드 → 재배포 → 현장 방문이
                반복됐습니다. 직접 매장을 돌며 테스트하다 보니{" "}
                <B>&ldquo;무인 매장이라면서 운영은 무인이 아니다&rdquo;</B>
                라는 모순이 눈에 들어왔습니다.
              </p>
              <p>
                JSON만 떼어내는 임시방편이나, 코드를 건드리지 않는 운영 매뉴얼
                정비도 검토했지만, 매장 시공 때 이미 등록되는{" "}
                <B>MAC Address를 재활용</B>해 전 과정을 자동화하는 쪽을
                택했습니다.
              </p>
              <p>
                초기 인프라 구축 비용이 들고 Silent 설치로 디버깅 가시성이
                떨어지는 트레이드오프는, 일별 로그 로테이션과 IPC 로그 통합으로
                메웠습니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="무인 매장 운영 사이클"
              caption="MAC Address 시공 시 등록 → 빌드·배포·설치·환경설정이 자동으로 연결. 사람 개입 0."
            >
              <FlowStep>
                매장 시공: <B>MAC Address 등록</B>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                개발: 빌드 → S3 자동 업로드 (<code>--publish always</code>)
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                매장 PC: electron-updater <B>Silent 다운로드</B>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                매장 PC: <B>MAC API 호출</B>
              </FlowStep>
              <FlowArrow label="MAC Address로 매장·룸 자동 매칭" />
              <FlowStep>
                서버: shopInfo 반환 ·{" "}
                <code>shopId / roomId / shotPath / clipPath / windowName</code>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                자동 환경설정 완료 — 사용자 인터랙션 0
              </FlowStep>
              <FlowAside>
                부수: 일별 로그 로테이션 + 렌더러 로그 IPC 통합으로 원격 디버깅
                인프라 보강
              </FlowAside>
            </Diagram>
          }
          result={[
            "신규 매장 추가: JSON 수정·재빌드·재배포 사이클 제거 (MAC Address 자동 매칭)",
            "빌드 → S3 업로드 → 매장 PC 설치를 단일 파이프라인으로 통합 (수동 개입 0)",
            "사용자 인터랙션 0건 (Silent 설치 + 자동 재시작)",
            "업데이트 매장 방문 완전 제거 (신규 시뮬레이터 최초 도입 시만 1회 방문)",
          ]}
          retrospective={
            <>
              JSON 임시방편 단계를 건너뛰고 처음부터 MAC Address 자동 매칭으로
              갔다면 더 나았을 것 같습니다. 임시로 운영하는 동안 매장을 추가할
              때마다 쌓인 매뉴얼 재배포 비용이, 결국 처음에 제대로 만드는 비용보다
              더 비쌌습니다.
            </>
          }
        />

        <Decision
          number={2}
          title="ECharts 모듈화 — main bundle 사이즈 사전 통제"
          body={
            <>
              <p>
                차트가 lesson note 한 화면에서만 쓰여도, main bundle에 묶이는
                순간 모든 페이지의 다운로드 비용에 영향을 줍니다. ECharts 전체
                진입점(
                <code>import * as echarts</code>)을 그대로 쓰면 쓰지도 않는 차트
                모듈까지 풀번들로 딸려 오기 때문입니다.
              </p>
              <p>
                차트 컴포넌트마다 echarts를 직접 import하는 흩어진 구조도
                검토했지만, 차트를 추가할 때 등록을 빠뜨리거나 동기화하는 비용이
                컸습니다. 그래서{" "}
                <B>
                  ECharts import 위치를 한 파일(chartCore.ts)로 모으고 쓰는
                  모듈만 명시적으로 등록
                </B>
                한 뒤, <code>BaseChart</code> 추상화를 둬서 각 차트 컴포넌트가
                echarts API를 직접 다루지 않게 분리했습니다.
              </p>
              <p>
                새 차트를 추가할 때 chartCore에 등록을 빠뜨릴 위험은 남지만, 한
                파일만 보면 잡히도록 좁혀 뒀습니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="ECharts 의존성 단일 진입점 구조"
              caption="chartCore.ts 한 파일에서만 echarts/core + 사용 모듈을 등록. 소비 차트 컴포넌트는 BaseChart를 통해 등록된 echarts 인스턴스를 주입받음."
            >
              <FlowStep>
                <B>chartCore.ts</B>
                <FlowAside>
                  echarts/core + LineChart / BarChart / RadarChart /
                  GraphicComponent / ... 명시 등록 (
                  <code>echarts.use([...])</code>)
                </FlowAside>
              </FlowStep>
              <FlowArrow label="export default echarts" />
              <FlowStep>
                <B>BaseChart.tsx</B>
                <FlowAside>
                  echarts-for-react/lib/core + chartCore에서 echarts 인스턴스
                  주입받음
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                AgeAverageChart · ProComparisonChart · DistanceTrendChart
                <FlowAside>
                  echarts API 직접 모름 — BaseChart 통해서만 사용
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          result={[
            <>
              main bundle 압축 사이즈 <B>760 KB → 592 KB (22%↓, 168 KB 감소)</B>,
              raw 기준 2.49 MB → 1.96 MB (-530 KB)
            </>,
            "lesson note 한 화면의 차트가 모든 페이지 main bundle 비용에 더해지던 것을 막았습니다",
            "신규 차트 추가 시 chartCore.ts 한 파일 등록만으로 모든 사용처 자동 적용",
          ]}
          retrospective={
            <>
              사용처가 한 곳뿐인 라이브러리라도 main bundle에 묶이면 결국 전
              페이지가 그 비용을 나눠 집니다. 도입하는 시점에 진입점을 잡아 두지
              않으면 나중에 마이그레이션 비용이 쌓이는 영역이라는 걸 배웠습니다.
            </>
          }
        />

        <Decision
          number={3}
          title="contextIsolation 권한 분리 — 보안 + DX 동시 개선"
          body={
            <>
              <p>
                Electron 앱이 원격 호스팅 SPA URL을 <code>loadURL</code>하는
                구조였습니다. Electron 보안 가이드는 원격 콘텐츠를 띄우는
                렌더러에 <code>contextIsolation</code>을 켜고{" "}
                <code>nodeIntegration</code>을 끄라고 권장합니다.
              </p>
              <p>
                CSP 헤더만 강화하는 방법은 렌더러 권한 범위를 바꾸지 못하고, SPA
                패키지 번들링은 자동 업데이트 흐름과 충돌해서, 대신{" "}
                <B>contextBridge 화이트리스트 + 타입 통합</B>으로 전면
                재설계했습니다. 여러 파일에 복붙돼 있던 타입 선언·초기화 블록을{" "}
                <code>electron.d.ts</code> 한 곳으로 합치고, 렌더러 6개 파일에
                흩어져 있던 <code>ipcRenderer</code> 직접 호출을 단일 브릿지로
                정리했습니다.
              </p>
              <p>
                IPC 직렬화 비용은 마이크로초 단위라 사용자는 차이를 느끼지
                못합니다.
              </p>
            </>
          }
          result={[
            <>
              중복 setup 코드 <B>73줄 → 22줄 (70%↓)</B>
            </>,
            <>
              신규 IPC 등록 절차 <B>6곳 → 1곳</B>
            </>,
            <>
              <code>contextIsolation: true</code> + 화이트리스트 API로 렌더러 권한을
              필요한 범위로 제한
            </>,
          ]}
          retrospective={
            <>
              contextBridge 화이트리스트는 권한도 줄이면서 IPC setup 중복까지
              같이 없애 줬습니다. 보안과 DX가 같은 방향을 가리키는 순간이 있다는
              걸 알았습니다.
            </>
          }
        />

        <Decision
          number={4}
          title="다국어 동기화 — 정적 텍스트 치환을 넘어"
          body={
            <>
              <p>
                일본 진출 1호점을 준비하면서 다국어 지원이 필요해졌습니다.
                그런데 i18next로 정적 텍스트만 번역하면 UI는 일본어인데 AI는
                한국어로 답해 일관성이 깨지고, 이건 글로벌 매장 운영의 의미와도
                맞지 않았습니다.
              </p>
              <p>
                그래서 <code>languageTypeCd</code>를 모든 서버 요청에 함께 실어{" "}
                <B>AI 응답과 Clova TTS까지 한 번에 동기화</B>하는 구조를
                택했습니다.
              </p>
              <p>
                다만 코칭 도중 언어를 바꾸면 이전 언어 음성이 TTS 큐에 남는
                문제가 있었는데(실사용 흐름에서 발견했습니다), 변경 직전에{" "}
                <code>stopCurrentTTS</code>·<code>resetTTSSession</code>을
                강제로 호출하고 언어를 바꿀 수 있는 시점을 메인 진입 모달로
                제한하는 UX 정책으로 해결했습니다.
              </p>
            </>
          }
          result={[
            "글로벌 1호점(일본) 배포 완료",
            "한국어 / 일본어 / 영어 다국어 구조 설계",
            "언어 전환 시나리오 반복 테스트로 TTS 큐 잔존 버그 발견·해결",
          ]}
          retrospective={
            <>
              언어 전환 시점을 메인 진입 모달로만 묶어 둔 건 사실 임시
              정책이었습니다. TTS 큐를 routing 시점에 자동으로 reset하는
              구조였다면 더 깨끗했을 것 같습니다.
            </>
          }
        />

        <Decision
          number={5}
          title="STOMP 무응답 장애 — sessionStorage 캐싱과 서버 세션 ID 폐기 구조 충돌 식별"
          body={
            <>
              <p>
                STOMP 재연결은 성공하는데 메시지 응답만 끊기는, 무응답 장애가
                자주 났습니다.
              </p>
              <p>
                재연결 자체는 멀쩡해서 네트워크 문제로는 보이지 않았는데, 로그를
                따라가 보니 클라이언트는 <code>sessionStorage</code>에 캐싱한{" "}
                <B>최초 세션 ID로 구독 경로를 고정</B>하는 반면, 서버는 매
                연결마다 <code>user-name</code> 헤더로 새 세션 ID를 발급하고{" "}
                <B>이전 ID를 바로 폐기</B>하는 구조였습니다. 클라이언트가 이미
                버려진 ID로 구독하고 있었으니 메시지가 도달할 수 없었던 겁니다.
              </p>
              <p>
                클라이언트 캐싱 분기를 걷어내고 서버가 발급한 ID만 쓰도록 바꿔
                재발을 구조적으로 막았습니다.
              </p>
            </>
          }
          result={[
            "STOMP 재연결 후 메시지 무응답 장애의 원인을 찾고 sessionStorage 캐싱 분기 제거",
            "서버 발급 세션 ID만 사용하는 구조로 전환해 재발 차단",
            "재연결 성공 / 메시지 무응답 분리 진단으로 원인 범위 좁혀 해결",
          ]}
          retrospective={
            <>
              STOMP 재연결 성공과 메시지 수신은 별개입니다. 재연결이 됐으니
              구독 경로도 당연히 살아 있겠거니 가정한 게 함정이었습니다. 서버가
              세션 ID를 어떻게 만들고 폐기하는지 먼저 확인했다면 원인을 훨씬 빨리
              좁힐 수 있었을 것 같습니다.
            </>
          }
        />
      </section>
    </div>
  );
}
