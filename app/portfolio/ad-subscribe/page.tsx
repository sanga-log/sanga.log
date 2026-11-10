import type { Metadata } from "next";
import Image from "next/image";
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
import { PHASE_CODE, POLL_CODE } from "./_snippets";

export const metadata: Metadata = {
  title: "광고 구독 풀스택 구축 — Portfolio",
  description:
    "광고 구독 상품을 테이블 설계부터 배치·어드민·운영까지 직접 만든 기록. 의사결정, 트레이드오프, 회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/ad-subscribe` },
  openGraph: {
    title: "광고 구독 풀스택 구축 — Portfolio",
    description:
      "광고 구독 상품을 테이블 설계부터 배치·어드민·운영까지 직접 만든 기록. 의사결정, 트레이드오프, 회고.",
    url: `${SITE_URL}/portfolio/ad-subscribe`,
  },
};

const BLOG_LINK_CLASS =
  "underline decoration-from-font underline-offset-2 hover:opacity-70";

export default function AdSubscribePortfolioPage() {
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
          광고 구독 풀스택 구축
        </h1>
        <p className="text-base leading-relaxed text-gray-500 mt-4 mb-5">
          매장 사장님이 마커 광고·리스팅 광고를 월 구독으로 신청하고 쿠폰까지
          운영하는 상품입니다. 테이블 설계부터 화면, API, 결제 결과 처리, 배치,
          어드민, 출시 후 운영까지 맡았고, 프론트엔드 개발자로서 처음 맡은
          백엔드였습니다.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Kotlin", "Spring", "Django", "MySQL"].map(
            (t) => (
              <Tag key={t}>{t}</Tag>
            ),
          )}
        </div>
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 성과</SectionLabel>
        <BulletList
          items={[
            "테이블 설계부터 출시 뒤 운영까지 7개 레포 직접 구현 (Kotlin/Spring 5, Django 1, React 1)",
            "출시 후 3개월 유료 갱신 성공률 96.6%",
            <>
              <code>PENDING → ACTIVE/FAILED</code> 상태 전이로, 결제 실패 건이 구독
              중으로 보이던 문제 해결
            </>,
            "손님 앱 배포 없이 선착순 쿠폰 기준을 다운로드에서 실사용으로 전환",
            "무상 합의를 0원 결제로 처리해 갱신·쿠폰 유지",
            "출시 후 데이터 대조로 에러 없이 옛 시스템에서 돌던 매장을 찾아 매장별로 처리",
            "구독 취소 시 환불(외부 호출)을 먼저 실행해, 환불 실패 시 만료·노출 변경이 돌지 않게 처리 (반쯤 취소된 상태 방지)",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>실제 화면</SectionLabel>
        <video
          src="/videos/ad-subscribe.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls
          aria-label="마커 광고를 쿠폰 설정부터 결제, 구독 중 화면, 리포트까지 진행하는 화면 녹화"
          className="w-full h-auto border border-gray-200"
        />
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          실제 광고 센터 화면에 예시 데이터를 넣어 재현했습니다. 화면의 금액·쿠폰·리포트
          수치는 실제 성과가 아닙니다.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>풀어야 했던 문제</SectionLabel>
        <BulletList
          items={[
            "사장님이 광고를 직접 신청·결제하고, 매달 갱신되는 회차마다 쿠폰을 운영할 수 있어야 했습니다.",
            "결제 결과는 PG를 거쳐 늦게 돌아오는데, 결제가 실패한 구독이 구독 중으로 보이면 안 됐습니다.",
            "쿠폰·주문·결제 같은 기존 시스템과 이미 광고를 쓰던 매장을 깨지 않고 이어야 했습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>내 역할과 협업</SectionLabel>
        <BulletList
          items={[
            "직접 한 일: 테이블·API 설계, 구독·쿠폰 서버, 결제 결과를 받아 구독 상태를 확정하는 워커 처리, 배치, 어드민, 광고센터 화면, 정책 정리, 출시 후 데이터 확인과 보정",
            "함께한 일: 설계는 백엔드 개발자분의 리뷰를 반영했고, PG 결제와 SQS 연동은 기존 결제 코드를 그대로 썼습니다. 기존 매장 이관 기능은 다른 개발자분이 구현했고, 쿠폰 기준과 무상 조건은 영업과 협의했습니다.",
            "범위 조정: 카카오 광고 자동 발송은 기간 안에 준비가 어려워, 신청만 자동으로 받고 발송은 영업 담당자가 맡는 방식으로 바꿔 출시했습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>출시 뒤 숫자로 확인한 것</SectionLabel>
        <BulletList
          items={[
            "결제: 유료 갱신 성공률 96.6%. 1차 결제 실패 건의 40%는 재시도로 회복했고, 나머지는 3회 실패로 종료됐습니다.",
            "결제 대기: 신청부터 결제 결과까지 중앙값 2.8초, p95 7.7초입니다. 97%가 10초 안에 확정돼 폴링 10초 기준이 실제 분포와 맞았습니다.",
            "매장: 사장님이 직접 신청한 매장의 46%는 이전 광고 결제 이력이 없던 매장입니다.",
            "쿠폰: 손님이 받은 쿠폰의 32.8%가 실제로 쓰였습니다. 받아만 두는 쿠폰이 많다는 전제를 숫자로 확인했습니다.",
            "다음 과제: 갱신 유지율은 기존 매장 95.2%, 새로 들어온 매장 68.0%입니다. 새로 들어온 매장은 표본이 작아 단정할 수 없지만 다음에 먼저 볼 지표입니다.",
            "적지 않은 것: 매출은 출시 뒤 완결된 비교 기간이 2개월뿐이고 대조군이 없어 성과로 적지 않았습니다.",
          ]}
        />
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          집계 기준: 2026-08-10 ~ 2026-11-04 결제·쿠폰 이력, 테스트 매장 제외.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 의사결정</SectionLabel>

        <Decision
          number={1}
          title="쿠폰·결제는 새로 만들지 않고 기존 테이블에 잇기"
          body={
            <>
              <p>
                기획서에서 저장할 데이터를 뽑아 스프레드시트에 테이블로 그리고
                ERD를 만들었습니다. 초안에서는 쿠폰과 결제까지 전부 새 테이블로
                그렸습니다. 백엔드 개발자분께 리뷰를 계속 받으면서, 쿠폰과 주문·카드는
                이미 구축돼 있으니{" "}
                <B>회차별로 어떻게 세팅했고 얼마나 썼는지만 묶으면 된다</B>는 걸
                알았습니다. 그래서 새 테이블은 구독, 회차, 이력, 회차별 쿠폰 설정,
                회차별 발급 쿠폰에 카카오 광고 발송까지 6개로 두고 나머지는 기존 테이블을
                참조했습니다.
              </p>
              <p>
                결제일도 컬럼 하나로 두지 않았습니다. 리뷰에서 &ldquo;결제가
                실패하면 일자가 밀릴 텐데, 어떻게 원복해 줄 건가요?&rdquo;라는
                질문을 받고, 실패해도 안 바뀌는 결제 예정일과 실패하면 밀리는 다음
                시도일로 나눴습니다. 재시도 중이라는 상태를 따로 두지 않아도 두
                날짜가 다른지만 보면 됩니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="광고 구독 테이블 관계"
              caption="실제 테이블 이름 대신 역할로 적었습니다."
            >
              <Image
                src="/images/ad-subscribe-erd.svg"
                alt="새로 만든 테이블 6개와 이미 있던 테이블의 참조 관계"
                width={760}
                height={540}
                className="w-full h-auto"
              />
            </Diagram>
          }
          result={[
            "신규 테이블 6개 + 기존 테이블 참조로 구조 확정",
            "광고 상품은 테이블 대신 타입 값으로 관리, enum은 문자열 컬럼 + 코드 enum으로 관리",
            "결제일 2개 비교로 재시도 여부 판별",
          ]}
          retrospective={
            <>
              처음엔 신중하게 설계했다고 생각했습니다. 그런데 선착순 기준이 바뀌고
              이관 쿠폰만 있던 매장이 나오면서 고려하지 못한 케이스가 드러났습니다.
              새 테이블을 그리는 일인 줄 알았는데, 이미 있는 테이블을 찾아서 잇는
              일이기도 했습니다.
            </>
          }
        />

        <Decision
          number={2}
          title="신청 즉시 활성화를 버리고, 결제가 확정된 뒤 구독 열기"
          body={
            <>
              <p>
                처음엔 프론트 감각대로 신청하면 바로 <code>ACTIVE</code>로
                열었습니다. 그랬더니 결제가 실패해도 화면에선 구독 중으로
                보였습니다. 결제 결과는 PG 요청 뒤 SQS를 타고 워커로 돌아오기
                때문에, 신청 API가 응답하는 순간에는 서버도 결과를 모릅니다. 그래서{" "}
                <code>PENDING</code>으로 저장하고, 워커가 결과를 받으면{" "}
                <code>ACTIVE</code> 또는 <code>FAILED</code>로 확정하게 바꿨습니다.
              </p>
              <p>
                쿠폰도 결제가 성공해야 만들 수 있는데, 쿠폰 구성은 신청 요청에만
                있습니다. 그래서 구성을 구독에 JSON으로 보관해 뒀다가 첫 결제가
                성공하는 시점에 만들었습니다.
              </p>
            </>
          }
          diagram={
            <Diagram title="비동기 결제 확정 흐름">
              <Image
                src="/images/async-payment-flow.svg"
                alt="신청은 PENDING으로 저장되고 결제 결과가 큐와 워커를 거쳐 ACTIVE 또는 FAILED로 확정되는 흐름"
                width={760}
                height={410}
                className="w-full h-auto"
              />
            </Diagram>
          }
          result={[
            <>
              구독 상태에 <code>PENDING</code>·<code>FAILED</code> 추가
            </>,
            "쿠폰 구성을 보관했다가 결제 성공 뒤 생성",
            <>
              결제 요청 메시지는 DB 커밋 뒤 발행 (
              <code>@TransactionalEventListener(AFTER_COMMIT)</code>)
            </>,
          ]}
          retrospective={
            <>
              워커의 결과 리스너는 처리할 주문 타입 목록을 갖고 있었는데, 거기에 새
              타입을 안 넣어서 결제 뒤 처리가 에러도 없이 안 돈 적이 있습니다. 에러는
              로그라도 남지만 아무 일도 안 일어나는 건 찾기가 더 어려웠습니다. 새
              타입을 만들면 그 타입을 걸러 내는 곳까지 찾아봐야 한다는 걸 배웠습니다.
            </>
          }
        />

        <Decision
          number={3}
          title={`"아직 모른다"를 화면으로 받기 — 폴링·타임아웃·재진입`}
          body={
            <>
              <p>
                서버가 <code>PENDING</code>만 주는 동안 화면이 무엇을 보여 줄지
                정해야 했습니다. 신청 응답은 성공으로 치지 않고, 확정은{" "}
                <B>폴링 결과로만</B> 판단합니다. 1초 간격으로 최대 10번 확인하고,
                그 안에 확정되지 않으면 &ldquo;결제 확인 중&rdquo; 안내로
                전환합니다. 창을 닫았다 다시 열어도 <code>PENDING</code>이면 폴링을
                재개합니다.
              </p>
              <p>
                버튼 연타도 막아야 했습니다. state는 다음 렌더에야 반영돼 같은 틱의
                두 번째 클릭을 못 막기 때문에 <code>ref</code>를 함께 뒀습니다.
              </p>
            </>
          }
          snippets={[
            {
              filename: "결제 화면 단계 판단 (단순화)",
              code: PHASE_CODE,
              highlight: (
                <>
                  타임아웃을 최우선으로 뒀습니다. 10초가 지나도 status는 여전히{" "}
                  <code>PENDING</code>이라, 순서가 바뀌면 사용자가 스피너에
                  갇힙니다.
                </>
              ),
            },
            {
              filename: "결제 결과 폴링 (단순화)",
              code: POLL_CODE,
              highlight: (
                <>
                  이 <code>useEffect</code>가 없으면 재진입했을 때 폴링이 시작되지
                  않아 스피너가 끝없이 돕니다.
                </>
              ),
            },
          ]}
          result={[
            <>
              결제 화면을 <code>idle</code> / <code>pending</code> /{" "}
              <code>failed</code> / <code>timeout</code>으로 분리
            </>,
            "10초 초과 시 안내 화면 전환, 재진입·새로고침에도 폴링 재개",
            <>
              <code>ref</code>로 같은 틱 중복 신청 차단
            </>,
            "출시 뒤 실측 중앙값 2.8초, 97%가 10초 안에 확정",
          ]}
          retrospective={
            <>
              프론트만 할 때는 폴링이 늘 불만이었습니다. 직접 짜 보니 결과가 나중에
              오는 구조라서 누군가는 다시 물어봐야 했습니다. 지금은 &ldquo;왜 폴링을
              해야 하지?&rdquo;가 아니라 &ldquo;결과가 오기까지 보통 얼마나 걸리고,
              그동안 뭘 보여 주지?&rdquo;를 먼저 생각합니다.
            </>
          }
        />

        <Decision
          number={4}
          title="선착순 기준을 다운로드에서 실사용으로 — 서버에서 재해석"
          body={
            <>
              <p>
                선착순 쿠폰을 손님들이 받아만 두고 안 써서, 금방 마감이 뜨고 그날
                쓰려는 손님은 쓰지 못했습니다. 매장 문의도 꾸준히 들어왔습니다.
              </p>
              <p>
                받은 사람 수 기준은 받아 둔 쿠폰을 무조건 쓸 수 있지만, 다 받아
                가면 쓰려는 손님이 막힙니다. 실제로 쓴 사람 수 기준은 받아 둔
                쿠폰이 결제 순간에 막힐 수 있습니다. 장단점을 영업과 검토한 뒤
                실사용 기준으로 바꾸고, 받기 한도는 협의한 3~4배 중 4배로
                정했습니다. 사장님이 20장으로 정하면 20장이 쓰일 때 마감되고,
                받기는 80장까지 열립니다.
              </p>
              <p>
                앱 배포를 피하려고 손님 앱은 그대로 두고,{" "}
                <B>서버에서 등록 수량을 실사용 한도로 재해석</B>했습니다.
              </p>
              <p>
                4배는 내부 숫자라서 사장님 화면에는 실사용 기준 수량만 보이게 하고,
                소진 판정도 실사용 기준으로 바꿨습니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="사장님 화면의 실사용 기준 표기"
              caption="예시 데이터로 재현한 화면입니다. 쿠폰 수량에 사용 기준이 표시됩니다."
            >
              <Image
                src="/images/ad-subscribe-active.png"
                alt="구독 중 화면에서 쿠폰 수량 옆에 사용 기준이 표시되고 잔여와 사용 수가 보이는 모습"
                width={1280}
                height={960}
                className="w-full h-auto"
              />
            </Diagram>
          }
          result={[
            "등록 수량을 실사용 한도로 재해석, 받기 한도는 4배로 자동 산정",
            "손님 앱 배포 없이 정책 전환, 기존 쿠폰은 다음 갱신부터 이행",
            "사장님 화면의 표기와 소진 판정을 실사용 기준으로 전환",
          ]}
          retrospective={
            <>
              화면에서는 숨겼는데, 갱신 슬랙 알림이 내부 숫자를 그대로 찍어서
              &ldquo;쿠폰 400장&rdquo;이 나갔습니다. 숫자를 보여 주는 곳은 화면만이
              아니었습니다. 그 뒤로 숫자 하나를 숨길 때도 알림, 어드민, 엑셀로 또
              나가는지를 같이 봅니다.
            </>
          }
        />

        <Decision
          number={5}
          title="결제를 멈추지 말고 0원으로 — 무상 기간 처리"
          body={
            <>
              <p>
                영업에서 어느 매장과 &ldquo;두 달 무상, 쿠폰은 계속&rdquo;으로
                합의했습니다. 코드에는 무상이라는 개념이 없고, 결제가 성공해야 다음
                회차와 쿠폰이 만들어집니다. 처음 떠오르는 방법은 결제를 멈추는
                것이지만, 결제 대상에서 빼면 배치가 구독을 건너뛰어 갱신이 끊기고
                쿠폰이 꺼집니다. 실제로 환불 처리하면서 결제 대상에서 빠진 매장이
                이렇게 됐습니다.
              </p>
              <p>
                그래서 반대로 <B>결제 금액만 0원</B>으로 뒀습니다. 결제 코드를 따라가
                보니 0원이면 PG를 부르지 않고 성공으로 처리되고, 성공 콜백은 평소와
                똑같이 갑니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="무상 처리 방법 비교"
              caption="결제가 성공해야 갱신이 돌기 때문에, 결제를 없애지 않고 금액만 바꿨습니다."
            >
              <FlowStep>
                결제 대상에서 제외
                <FlowAside>배치가 건너뜀 → 갱신 끊김 → 쿠폰 꺼짐</FlowAside>
              </FlowStep>
              <FlowArrow label="결제 코드 추적" />
              <FlowStep emphasis>
                결제 금액만 0원
                <FlowAside>PG 호출 없이 성공 → 회차·쿠폰 평소대로 생성</FlowAside>
              </FlowStep>
            </Diagram>
          }
          result={[
            "무상 기간에도 갱신·쿠폰 유지",
            <>
              WHERE에 &ldquo;지금 값&rdquo; 조건을 넣고 되돌리는 SQL을 먼저 작성
            </>,
            "상용 첫 적용일에 배치 직후 결제 로그·주문·다음 결제일·회차·쿠폰·알림을 조회로 확인",
          ]}
          retrospective={
            <>
              프론트에선 배포하면 끝이었는데, 서버는 이미 저장된 데이터와 이미 한
              약속이 배포로 바뀌지 않았습니다. 그 뒤로 뭔가 고칠 때 앞으로 생길 것과
              이미 생긴 것을 따로 생각합니다.
            </>
          }
        />

        <Decision
          number={6}
          title="에러가 없는 문제 찾기 — 출시 뒤 매일 데이터 대조"
          body={
            <>
              <p>
                배포 후 구독 갱신과 결제가 슬랙으로 오게 하고, 매일 쿠폰 발급과
                결제 내역을 DB에서 확인했습니다. 그러다 갱신이 돌았는데 쿠폰이나
                구독 이력이 보이지 않는 매장을 찾았습니다. 결제는 정상이고 에러도
                없었는데, 새 구독이 아니라 옛 시스템에서 돌고 있었습니다.
              </p>
              <p>
                원인은 두 규칙이 겹친 데 있었습니다. 결제가 실패하면 종료일이
                하루씩 밀리는데, 한 번만 돈 이관은 곧 끝나는 구독을 뺐습니다.
                재시도 중이던 매장이 빠진 뒤 결제에 성공했고, 결제 배치는 옛
                구독과 새 구독을 가리지 않아 계속 결제됐습니다.
              </p>
            </>
          }
          result={[
            "옛 시스템에서 결제가 도는데 새 구독이 없는 곳을 전수 조회해 후보 7곳 확정",
            "이관 기능의 미리 보기로 판정을 먼저 확인했습니다. 2곳 이전, 3곳은 말일 결제 뒤 이전, 2곳은 이용권 결제라 제외",
          ]}
          retrospective={
            <>
              에러가 나지 않는 문제는 로그나 알람으로 오지 않습니다. 이관이 끝난
              뒤 한 번 더 훑는 절차와 출시 뒤 데이터 대조를 처음부터 출시 계획에
              넣었어야 했습니다.
            </>
          }
        />
      </section>

      <section className="mb-12">
        <SectionLabel>구현하면서 정한 정책</SectionLabel>
        <BulletList
          items={[
            "갱신 결제는 3번까지 재시도하고, 그래도 실패하면 구독 해지",
            "결제와 동시에 광고가 노출되므로, 당일 환불도 하루치 차감",
            "못 쓴 쿠폰은 다음 달로 이관합니다. 예산은 이전 회차에서 채웠으므로 수량에만 포함",
            "쿠폰을 기간 안에 다 못 쓰는 매장이 계속 나와, 영업 담당자가 어드민에서 구독 기간을 늘리도록 구현 (기간마다 1번, 최대 한 달)",
            "카카오 광고는 새로 준비할 게 많아 기간 안에 어려워, 신청은 자동으로 받고 최종 발송은 영업 담당자가 맡는 방식으로 변경",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>AI를 쓰는 방식과 틀린 사례</SectionLabel>
        <p className="text-base leading-relaxed text-gray-600 mb-4">
          로그와 코드 흐름을 읽고 쿼리를 짜는 일은 AI 에이전트에게 맡겼습니다.
          판단과 운영 DB 쓰기는 직접 했습니다. 에이전트의 결론은 아래처럼 틀릴 수
          있어서, 실행 전에 코드나 실제 데이터로 확인합니다.
        </p>
        <BulletList
          items={[
            "이관 누락 처리: 에이전트는 4곳을 바로 옮길 수 있다고 봤지만, 실행 전 미리 보기에서 2곳만 통과했습니다. 나머지 2곳은 이용권 결제 매장이었습니다.",
            "쿠폰 생성 추적: 사내 AI 봇은 데이터만 보고 쿠폰이 자동 생성됐다고 추정했습니다. 회차별로 따라가 보니 사람이 만든 쿠폰이 섞여 있었고, 자동 생성은 일부였습니다.",
            "정산 데이터 검토: 집계 비율만 보고 매출 누락이라고 쓴 전달 문장이 틀렸습니다. 행이 만들어지는 구조와 실제 1건을 따라가 보니 이중 계산을 없앤 정상 구조였습니다. 그 뒤로 코드, 조회 조건, 실제 1건, 예외 분류까지 확인한 사실만 전달하도록 규칙으로 고정했습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>더 읽어보기</SectionLabel>
        <BulletList
          items={[
            <Link
              key="part-1"
              href="/blog/frontend-first-backend-1"
              className={BLOG_LINK_CLASS}
            >
              프론트 개발자의 첫 백엔드 1편: 처음 짜 본 API에서 만난 에러들
            </Link>,
            <Link
              key="part-2"
              href="/blog/frontend-first-backend-2"
              className={BLOG_LINK_CLASS}
            >
              프론트 개발자의 첫 백엔드 2편: 출시하고 나서, 코드로는 못 고치는
              것들
            </Link>,
          ]}
        />
      </section>
    </div>
  );
}
