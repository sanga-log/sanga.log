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
import { C5A_CODE, C5B_CODE } from "./_snippets";

export const metadata: Metadata = {
  title: "모바일 네트워크 광고 시스템 — Portfolio",
  description:
    "사내 처음으로 모바일 네트워크 광고를 도입한 프로젝트. 4가지 광고 타입을 한 번에 처리하는 공통 모듈을 설계한 기록. 의사결정, 트레이드오프, 회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/mobile-ads` },
  openGraph: {
    title: "모바일 네트워크 광고 시스템 — Portfolio",
    description:
      "사내 처음으로 모바일 네트워크 광고를 도입한 프로젝트. 4가지 광고 타입을 한 번에 처리하는 공통 모듈을 설계한 기록. 의사결정, 트레이드오프, 회고.",
    url: `${SITE_URL}/portfolio/mobile-ads`,
  },
};

export default function MobileAdsPortfolioPage() {
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
          모바일 네트워크 광고 시스템
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 mt-4 mb-5">
          사내 처음으로 앱에 모바일 네트워크 광고를 도입했습니다. 4가지 광고
          타입을 한 번에 처리하는 공통 Mixin을 설계해 다른 앱에서도 쓸 수 있게
          했습니다.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Vue2", "Webpack"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionLabel>풀어야 했던 문제</SectionLabel>
        <BulletList
          items={[
            "광고 SDK를 처음 붙이는 거라 4가지 광고 타입을 어느 화면에서든 부를 수 있어야 했고, 다른 팀도 같은 코드를 반복하지 않고 쓸 수 있어야 했습니다.",
            "광고 로딩이 느려 노출이 늦거나 다른 화면에서 떠올랐고, 광고가 도는 동안 포인트가 추가로 빠져나가는 사용자 손해가 있었습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>내 역할과 협업</SectionLabel>
        <BulletList
          items={[
            "직접 한 일: 광고 호출 구조 설계, 공통 Mixin 모듈, 포인트 전환 화면과 차감 가드",
            "함께한 일: 광고 SDK 호출과 close 콜백은 네이티브 앱(AOS/iOS) 쪽과 인터페이스를 맞췄습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 성과</SectionLabel>
        <BulletList
          items={[
            "사내 처음으로 모바일 네트워크 광고 도입",
            <>
              4가지 광고 타입을 한 번에 처리하는 공통 Mixin. 다른 팀은{" "}
              <code>idx</code> 한 줄로 도입
            </>,
            "광고 로딩 중 포인트 이중 차감 가드로 사용자 손해 차단",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 의사결정</SectionLabel>

        <Decision
          number={1}
          title="광고 호출 3단계 분리 — preload / load / open"
          body={
            <>
              <code>load</code>와 <code>open</code>을 동시에 호출하면 광고가
              뜨기까지 오래 걸리고, 특히 <code>load</code> 중에 페이지를 벗어나면
              엉뚱한 페이지에서 <code>open</code>되는 <B>race condition</B>이
              있었습니다. 그래서 노출 시점보다 한 단계 앞에서 <code>load</code>를
              호출해 광고를 미리 받아 두는 구조로 바꿨습니다. 즉시 노출이
              필요하면 홈 진입 때 <B><code>preload</code></B>로, 버튼을 눌러야
              뜨는 경우엔 페이지 진입 때 <code>load</code>를 호출해 클릭하는 순간
              바로 <code>open</code>되게 했습니다. 네이티브에서 <code>close</code>를
              받으면 곧바로 다시 <code>load</code>를 호출해, 다음 광고도 끊김 없이
              이어지도록 처리했습니다.
            </>
          }
          result={[
            <>
              광고 호출을 <code>preload</code> / <code>load</code> /{" "}
              <code>open</code> 3단계로 분리
            </>,
            <>
              네이티브 <code>close</code> 수신 즉시 다시 <code>load</code>로 다음
              광고 연속 노출
            </>,
            "페이지 이탈 race condition 해결, 끊김 없는 광고 노출",
          ]}
          retrospective={
            <>
              외부 SDK는 자기 lifecycle을 제 페이스대로 끌고 갑니다. 동기라고
              가정하고 단순히 await만 걸면, 결국 페이지 이탈 race로 되돌아오더라는
              걸 배웠습니다.
            </>
          }
        />

        <Decision
          number={2}
          title="4가지 광고 타입 통합 Mixin — 사내 공통 모듈"
          body={
            <>
              광고 위치와 기기(AOS/iOS)마다 달라지는{" "}
              <B>Placement ID를 상수로 통합 관리</B>하고,{" "}
              <B>
                4가지 광고 타입(InterstitialImage / InterstitialVideo /
                RewardVideo / BottomModal)
              </B>
              을 한 모듈에서 처리하는 공통 Mixin으로 묶었습니다. Placement ID를
              각 팀이 직접 들고 있으면 코드가 반복되고 실수 위험도 커지기
              때문입니다. 타입마다 컴포넌트를 따로 만드는 대신 콜백 액션을
              매핑하고(<code>RewardVideo</code>는 영상 시청 완료 여부를{" "}
              <code>status: completed/skipped</code>로 분기), <code>idx</code>{" "}
              하나만으로 광고를 호출할 수 있게 했습니다. 네이버 광고(NAM)와
              제3자 비디오 광고 SDK 두 종을 같은 인터페이스로 통합한 것도 같은
              생각이었습니다. 다른 팀은 <code>idx</code>만 추가하면 광고 호출 코드
              없이 그대로 가져다 쓸 수 있습니다.
            </>
          }
          diagram={
            <Diagram
              title="광고 시스템 통합 인터페이스"
              caption="다른 팀은 idx 인자만 알면 호출 가능. SDK 라우팅·OS 분기·placementId 매핑은 Mixin이 내부에서 자동 처리."
            >
              <FlowStep>
                <B>다른 팀</B>: <code>idx</code> 하나만 알면 광고 호출
                <FlowAside>
                  <code>this.preloadAd(this.getPlacementId(3))</code>
                </FlowAside>
              </FlowStep>
              <FlowArrow label="공통 Mixin이 SDK·OS·위치 매핑 자동 해결" />
              <FlowStep>
                <B>SDK 라우팅</B> — 네이버 광고 vs 비디오 광고
                <FlowAside>
                  네이버 NAM → adUnitId 동적 생성 (1:1 매핑, placementId 불필요)
                  <br />
                  제3자 SDK → PLACEMENT_ID_LIST[idx][OS] (14 × 2 매핑)
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                광고 노출
                <FlowAside>
                  4가지 타입 통합 — InterstitialImage / InterstitialVideo /
                  RewardVideo / BottomModal
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "네이버 광고 (NAM) Mixin",
              code: C5A_CODE,
              highlight: (
                <>
                  네이버 광고는 어드민 콘솔에서 NAM adUnitId와 1:1로 매핑돼
                  별도 <code>placementId</code>가 필요 없습니다. 그래서
                  회사명·위치·OS·NAM ID를 조합해 <code>adUnitId</code>를 동적으로
                  만들었습니다. 다른 팀은 <code>idx</code> 하나만 알면 호출할 수
                  있습니다.
                </>
              ),
            },
            {
              filename: "비디오 광고 (제3자 SDK) Mixin",
              code: C5B_CODE,
              highlight: (
                <>
                  비디오 광고는 SDK 제공 업체가 달라 <code>placementId</code>가
                  꼭 필요합니다. 14개 위치 × 2 OS = 28개 항목을 단일{" "}
                  <code>getPlacementId(idx)</code> 함수로 모아, 네이버 광고와
                  똑같은 <code>idx</code> 인터페이스로 두 SDK를 통합했습니다.
                </>
              ),
            },
          ]}
          result={[
            "4가지 광고 타입 통합 처리 Mixin 모듈",
            "OS·Placement ID 상수화 + 콜백 액션 매핑",
            <>
              <code>idx</code>만으로 광고 호출 가능. 다른 프로젝트에서 재사용
            </>,
          ]}
          retrospective={
            <>
              <code>idx</code>만 알면 광고 호출이 끝나는 인터페이스 덕에, 다른
              앱에서도 import 한 줄로 도입이 끝났습니다. 모듈을 만든 뒤 쓰는
              사람의 인지 부담까지 챙긴 게 자산화의 핵심이었습니다.
            </>
          }
        />

        <Decision
          number={3}
          title="포인트 차감 가드 — 광고 로딩 중 중복 클릭"
          body={
            <>
              앱 안에는 광고 시청이나 미니게임으로 <B>포인트를 모으고</B>, 그
              포인트를 <B>실제로 쓸 수 있는 캐시로 전환</B>하는 보상 흐름이 있는데,
              이걸 직접 구현했습니다. 전환 버튼은 5번 클릭마다 전면 비디오 광고가
              트리거되는 구조였습니다. 그런데 광고가 로딩되는 동안 버튼을 연속으로
              누르면, <B>광고는 이미 진행 중인데 포인트만 계속 빠져나가는 손해</B>가
              생겼습니다. 단순히 <code>disabled</code>로 막으면 UX가 불명확해서,
              광고를 호출할 때 클릭 카운팅을 멈췄다가 네이티브 close
              콜백(<code>OnInterstitialVideoAdClosed</code>)을 받으면 다시 켜는
              가드로 해결했습니다. 사용자 입장에선 광고가 도는 동안 추가 차감이
              0입니다.
            </>
          }
          result={[
            "광고 로딩 중 연속 클릭에도 포인트 추가 차감 차단",
            <>
              클릭 카운팅 중단 + 네이티브 close 콜백(
              <code>OnInterstitialVideoAdClosed</code>) 재개 가드
            </>,
            "사용자가 인지 가능한 명확한 흐름",
          ]}
          retrospective={
            <>
              잠금 상태를 명시적 ref가 아니라 store(Pinia/Vuex)로 흡수했다면 더
              나았을 것 같습니다. 명령형 ref는 컴포넌트 깊이 들어갈수록 추적이
              점점 어려워졌습니다.
            </>
          }
        />
      </section>

    </div>
  );
}
