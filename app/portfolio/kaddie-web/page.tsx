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
import { C3_CODE, C4A_CODE, C4B_CODE } from "./_snippets";

export const metadata: Metadata = {
  title: "Kaddie Web — Portfolio",
  description:
    "김캐디의 해외 스크린골프·연습장 예약 B2C 웹. 예약 슬롯 검증, 결제 결과 폴링, 다국어 빌드 파이프라인을 맡은 기록. 의사결정, 트레이드오프, 회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/kaddie-web` },
  openGraph: {
    title: "Kaddie Web — Portfolio",
    description:
      "김캐디의 해외 스크린골프·연습장 예약 B2C 웹. 예약 슬롯 검증, 결제 결과 폴링, 다국어 빌드 파이프라인을 맡은 기록. 의사결정, 트레이드오프, 회고.",
    url: `${SITE_URL}/portfolio/kaddie-web`,
  },
};

export default function KaddieWebPortfolioPage() {
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
          Kaddie Web
        </h1>
        <p className="text-base leading-relaxed text-gray-500 mt-4 mb-5">
          해외 스크린골프·연습장 예약 B2C 웹입니다. 회사의 첫 해외 매출을 만든
          서비스로, 태국·필리핀·미국 매장에서 운영 중입니다. 예약 슬롯 검증, 결제
          결과 폴링, 다국어 빌드 파이프라인을 맡았습니다.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "React",
            "TypeScript",
            "Recoil",
            "react-query",
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
            "회사 최초 해외 매출을 만든 서비스. 태국·필리핀·미국 3개국에서 운영 중",
            "네 가지 조건을 모두 통과한 슬롯만 활성화해, 매장 규칙과 어긋난 예약을 폼 제출 전에 막았습니다",
            <>
              <code>react-query</code> 폴링으로 결제 결과를 확정하고, 대기 중 결제
              버튼을 잠가 이중 청구를 막았습니다
            </>,
            "Google Sheets 기반 6개 언어 번역 파이프라인. 변경된 부분만 빌드에 반영",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>실제 화면</SectionLabel>
        <video
          src="/videos/kaddie.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls
          aria-label="회원권을 카드로 사고 결제 결과를 기다린 뒤, 막힌 시간을 피해 예약하고 회원권으로 결제하는 화면 녹화"
          className="w-full h-auto border border-gray-200"
        />
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          실제 예약 웹 화면에 예시 데이터를 넣어 재현했습니다. 매장·회원·금액은 모두
          지어낸 값입니다.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>풀어야 했던 문제</SectionLabel>
        <BulletList
          items={[
            "매장마다 운영시간, 게임 소요시간, 룸 수가 달라서, 손님이 고른 시간이 매장 규칙과 맞는지 폼을 다 채운 뒤에야 알 수 있었습니다.",
            "결제 직후에는 서버도 결제 결과를 바로 모르는 구조라, 화면이 결과를 기다리는 동안 중복 청구가 생길 수 있었습니다.",
            "6개 언어 번역이 자주 바뀌는데, 번역을 고칠 때마다 개발자가 코드를 손대야 했습니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>내 역할과 협업</SectionLabel>
        <BulletList
          items={[
            "직접 한 일: 예약 슬롯 검증 로직, 결제 결과 폴링 화면, 다국어 prebuild 파이프라인과 시크릿 주입 구성",
            "함께한 일: 결제 결과 도착 시간(최대 5초)과 실패 판정 기준은 백엔드와 맞췄고, 동시성 충돌은 백엔드가 최종 검증합니다. 번역 내용은 운영 담당자가 Google Sheets에서 관리합니다.",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>핵심 의사결정</SectionLabel>

        <Decision
          number={1}
          title="복합 조건 예약 충돌 검증 — 슬롯 선택 시점에서 막기"
          body={
            <>
              <p>
                매장마다 다른 요일별(평일/토/일) 운영시간, 매장별 게임
                소요시간(60·90분 등), 룸별 기예약, 현재 이전 시간 차단.{" "}
                <B>이 네 가지 조건을 한꺼번에 통과한 슬롯만 활성화</B>해, 매장
                운영 룰과 어긋난 예약을 입력 단계에서 걸러내는 부킹
                시스템입니다.{" "}
                <B>
                  백엔드 검증에만 기대면 사용자가 폼을 다 채운 뒤에야 충돌을
                  알게 됩니다
                </B>
                . 그래서 검증 책임을 슬롯 선택 시점으로 끌어올려, 무효 슬롯은
                아예 만지지 못하게 했습니다.
              </p>
              <p>
                자정을 넘기는 영업 시간(예: 10:00~03:00)은 시작 시각이 종료
                시각보다 커서 단순 비교로는 판정이 깨집니다. 그래서{" "}
                <B>
                  영업 시작~자정 구간과 자정~영업 종료 구간을 합쳐서 판정
                </B>
                했습니다. 분 단위 선택지(10분 간격)가 모두 막히면 시간 버튼까지
                자동으로 비활성화해, 무효 슬롯은 클릭조차 못 하게 했습니다.
              </p>
              <p>
                <B>고려한 옵션</B>은 이렇습니다. (a) <B>백엔드만 검증</B>.
                사용자가 시간 선택을 다 끝낸 뒤에야 충돌이 드러나고, 백엔드는
                사용자가 무엇을 누를지 미리 알 수 없습니다. (b){" "}
                <B>클라만 검증</B>. 같은 시간대에 다른 사용자가 몇 분 차이로
                예약하는 동시성 충돌은 클라이언트가 알 수 없어 정합성이 깨집니다.
              </p>
              <p>
                그래서 결국 (c) <B>양쪽 검증</B>을 택했습니다. 프론트는 “선택
                가능한 슬롯만 노출”로 UX를, 백엔드는 “최종 정합성”으로 동시성
                충돌을 맡습니다. 두 책임이 다르니 한쪽만으로는 부족합니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="슬롯 활성화 검증 — 4중 조건 동시 통과"
              caption="각 분 슬롯이 4중 조건을 모두 통과해야만 활성화. 분 단위 6개(00·10·20·30·40·50)가 모두 차단되면 시간 버튼까지 자동 비활성화."
            >
              <FlowStep>
                사용자: <B>시간 버튼 클릭</B>
              </FlowStep>
              <FlowArrow label="각 분 슬롯마다 4중 조건 검증" />
              <FlowStep>
                <B>① 요일별 운영시간</B>
                <FlowAside>
                  평일/토/일 분기 → 해당 요일 운영시간 내 시각인가
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>② 게임 종료 ≤ 폐점</B>
                <FlowAside>
                  시각 + 게임 소요시간 ≤ 폐점 시각. 자정 넘김 매장은 영업
                  시작~자정 구간과 자정~영업 종료 구간을 합쳐서 판정
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>③ 룸별 기예약 없음</B>
                <FlowAside>
                  기존 예약 시간 범위와 충돌 검증 (시작 시각 포함, 종료 시각 후
                  다음 예약 가능)
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>④ 현재 이전 시간 아님</B>
                <FlowAside>당일이면 현재 시각 이후만</FlowAside>
              </FlowStep>
              <FlowArrow label="4중 모두 통과" />
              <FlowStep emphasis>
                분 슬롯 활성화
                <FlowAside>
                  분 단위 6개 모두 차단 시 → 시간 버튼까지 자동 비활성화
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          result={[
            "4중 조건(요일별 운영시간·매장별 게임 소요시간·룸별 기예약·현재 이전 시간 차단) 동시 통과한 슬롯만 활성화",
            "자정 넘기는 영업 시간 두 구간 합집합 판정 + 분 단위 차단 시 시간 버튼까지 자동 비활성화",
            "폼 제출 후 에러가 아닌 슬롯 선택 단계에서 즉시 피드백",
          ]}
          retrospective={
            <>
              폼 제출 후가 아니라 슬롯을 고르는 시점에 바로 피드백을 주니,
              사용자가 무효 슬롯에 시간을 쓰지 않게 됐습니다. 다만 검증 룰을
              백엔드와 클라이언트가 따로 들고 있는 구조라, 정책이 바뀌면 둘이
              어긋날 위험이 남습니다. 다시 한다면 검증 룰을 백엔드와 합의한 단일
              스키마(API 스펙이나 Zod 공유)로 통합해, 정책이 바뀔 때 생기는
              동기화 부담 자체를 없앴을 것 같습니다.
            </>
          }
        />

        <Decision
          number={2}
          title="결제 직후 서버 응답 지연 — react-query 폴링으로 정리"
          body={
            <>
              <p>
                결제 직후에는 서버도 Stripe 결과를 곧바로 알지 못하는
                구조였습니다. 백엔드와 맞춰 보니 응답이 늦어도 5초 안에는
                도착하고, 그 이후엔 <B>백엔드도 실패로 본다</B>는 걸 알았습니다.
                결제 완료 뒤 한 번만 확인하면 되는 흐름이라 WebSocket보다 폴링이
                맞다고 판단했고, 이 기준을 그대로 <B>1초 간격 5회 폴링</B>으로
                옮겨 폴링이 끝나는 시점과 백엔드의 실패 판정 시점을
                일치시켰습니다. 덕분에 실제로는 성공인데 프론트만 실패로 표시하는
                경우가 구조적으로 사라집니다.
              </p>
              <p>
                화면에 결과가 안 잡히면 사용자가 버튼을 한 번 더 누를 수 있는데,
                이 <B>중복 청구</B> 위험은 플래그 두 개로 막았습니다.{" "}
                <B>주문 제출</B>(<code>isSubmitting</code>, postOrder 호출
                동안)과 <B>결과 확인</B>(<code>isProcessing</code>, 폴링
                동안) 어느 단계에서든 결제 버튼이 잠깁니다.{" "}
                <B>useMutation + useQuery refetchInterval</B>로 주문
                생성·폴링·정지 조건을 한 책임으로 모아, 직접 짜던 가드 코드를
                걷어냈습니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="결제 직후 폴링과 결제 버튼 잠금 흐름"
              caption="결제 직후 서버 응답이 곧바로 따라오지 못하는 구간을 1초 간격 폴링으로 메우고, 주문 생성·폴링 두 단계 동안 결제 버튼을 잠가 중복 청구를 차단한다."
            >
              <FlowStep>
                <B>사용자</B>: 결제 버튼 클릭
              </FlowStep>
              <FlowArrow label="submitOrder.mutate(payload)" />
              <FlowStep>
                <code>useMutation</code> → <code>POST /orders/create</code>
                <FlowAside>
                  isPending = true → 버튼 disabled 자동
                </FlowAside>
              </FlowStep>
              <FlowArrow label="응답 OK → orderId 생성" />
              <FlowStep>
                <code>useQuery</code> enabled = !!orderId
                <FlowAside>
                  refetchInterval 1초 — 자동 폴링 시작
                </FlowAside>
              </FlowStep>
              <FlowArrow label="checkOrder 응답 3분기" />
              <FlowStep emphasis>
                refetchInterval 정지 조건
                <FlowAside>
                  COMPLETE / FAILED → false · dataUpdateCount ≥ 5 → false
                </FlowAside>
              </FlowStep>
              <FlowArrow label="useEffect: 종결 상태 또는 타임아웃 감지" />
              <FlowStep>
                <code>navigate(success)</code> / <code>navigate(failed)</code>
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "src/components/payment/MembershipPayment.tsx",
              code: C3_CODE,
              highlight: (
                <>
                  <code>useMutation</code>이 주문 생성과{" "}
                  <code>isPending</code> 신호를, <code>useQuery</code>가 1초
                  간격 폴링과 정지 조건을 각각 한 책임으로 들고 간다.{" "}
                  <code>refetchInterval</code>은 응답 status가{" "}
                  <code>COMPLETE</code>/<code>FAILED</code>거나{" "}
                  <code>dataUpdateCount</code>가 5에 도달하면 false를 반환해
                  자동으로 멈춤 — setTimeout 재귀·수동 카운터·요청/확인 두
                  단계 플래그를 직접 짤 필요가 없다.
                </>
              ),
            },
          ]}
          result={[
            <>
              결제 직후 서버 응답이 따라오지 못하는 구간을{" "}
              <code>useQuery refetchInterval</code> 1초 폴링으로 채움
            </>,
            <>
              <code>isPending</code>(주문 생성)·<code>isFetching</code>(폴링)이
              그대로 버튼 disabled 신호로 직결돼 수동 상태 플래그 제거
            </>,
            <>
              5회 도달 또는 <code>COMPLETE</code>/<code>FAILED</code> 응답 시
              폴링 자동 정지 — setTimeout 재귀 직접 관리 제거
            </>,
          ]}
          retrospective={
            <>
              처음부터 react-query로 갔으면 더 좋았을 것 같습니다. 명령형으로
              시작한 건 기존 axios 래퍼 패턴을 따라간 관성이었는데,{" "}
              <code>refetchInterval</code>은 사실 이런 폴링에 딱 맞는 도구라
              명령형 폴링을 한 줄도 짤 필요가 없었습니다.
            </>
          }
        />

        <Decision
          number={3}
          title="다국어 prebuild 파이프라인 — Google Sheets + Secrets Manager"
          body={
            <>
              <p>
                6개 언어 번역이 자주 바뀌는 글로벌 환경이다 보니, 번역을 고칠
                때마다 개발자가 코드를 손대는 비용을 줄이는 게 목표였습니다.{" "}
                <B>Google Sheets에서 번역을 추가하거나 수정하면</B> 다음 빌드 때
                변경된 부분만 감지해 <B>6개 언어 파일에 자동으로 반영</B>되는
                파이프라인을 만들었습니다.
              </p>
              <p>
                행마다 MD5 해시로 변경 여부를 비교해
                수정된 항목만 부분 갱신하고, 번역이 빠진 항목은 기본 언어(영어)로
                대체해 빈 화면이 뜨지 않게 했습니다. 로컬과 CI 모두에 필요한
                Google Sheets 인증 키는{" "}
                <B>AWS Secrets Manager에서 빌드할 때만 가져와 쓰고, 끝나면
                곧바로 삭제</B>해 노출 위험을 막았습니다.
              </p>
              <p>
                <B>고려한 옵션</B>도 있었습니다. Crowdin·Lokalise 같은{" "}
                <B>번역 CMS</B>는 비용이 드는데, 우리 번역 규모는 관리자 한 분이
                감당할 만큼 작아 비용 대비 효율이 낮았습니다. 그래서{" "}
                <B>
                  비용 0 + 기존 Google Sheets 환경 + 단순한 빌드 파이프라인
                </B>
                이라는, 우리 규모에 맞는 최소 구성을 택했습니다.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="다국어 prebuild 파이프라인"
              caption="Sheets에서 번역이 추가·수정되면 다음 빌드 시 변경된 부분만 6개 언어 파일에 자동 반영. Google Sheets 인증 키는 빌드할 때만 가져와 쓰고 끝나면 즉시 폐기."
            >
              <FlowStep>
                Google Sheets에서 <B>번역 셀 추가·수정</B>
              </FlowStep>
              <FlowArrow label="다음 빌드 시점에 자동 트리거" />
              <FlowStep>
                Jenkins:{" "}
                <code>aws secretsmanager get-secret-value</code> →{" "}
                <code>credentials.json</code> 주입
              </FlowStep>
              <FlowArrow label="prebuild 훅 (Docker 빌드 직전)" />
              <FlowStep>
                <code>fetch-translations.ts</code>: Sheets API 호출 + row 단위
                MD5 해시 비교
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                변경된 키만 부분 갱신
                <FlowAside>
                  changedKeys 0개 → 스킵, 변경 → 6개 언어{" "}
                  <code>{`{ko, en, ja, zh-CN, zh-TW, th}.json`}</code> 머지
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <code>rm credentials.json</code> 즉시 폐기 → Docker 이미지 빌드
                → ECR 푸시
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "scripts/fetch-translations.ts",
              code: C4A_CODE,
              highlight: (
                <>
                  캐싱 키는 행 단위(<code>key + 모든 언어 값 join</code>)로 만든
                  MD5라, 한 셀만 바뀌어도 그 행만 갱신하고 나머지 행은 기존
                  번역을 그대로 둡니다. <code>changedKeys</code>가 비어 있으면
                  빌드를 건너뛰어 시간을 아낍니다.
                </>
              ),
            },
            {
              filename: "package.json · Jenkinsfile-us",
              code: C4B_CODE,
              highlight: (
                <>
                  빌드 파이프라인 연결점은{" "}
                  <code>npm run build → prebuild → npm run i18n → fetch-translations.ts</code>
                  입니다. 시크릿 관리도 과거{" "}
                  <code>credentials.json</code>을 레포에 커밋하던 방식에서, 지금은
                  AWS Secrets Manager에서 빌드할 때만 주입하고 곧바로 폐기하는
                  쪽으로 바꿨습니다.
                </>
              ),
            },
          ]}
          result={[
            "Google Sheets에서 번역 추가·수정 시 다음 빌드에서 변경된 부분만 6개 언어 번역 파일에 자동 반영",
            "MD5 해시 캐싱으로 변경 키만 부분 갱신",
            "credentials는 AWS Secrets Manager에서만 관리 (빌드 단계 주입, 종료 시 삭제)",
          ]}
          retrospective={
            <>
              번역 텍스트와 코드를 분리하니 번역을 추가·수정할 때마다 코드를
              건드릴 일이 사라졌고, 남는 일도 빌드 직전 UI 검토 정도로
              좁혀졌습니다. 다시 한다면 Sheets 권한 모델과 번역 검토 체크리스트를
              더 일찍 정리해, 운영 부담을 한 번 더 낮췄을 것 같습니다.
            </>
          }
        />
      </section>

    </div>
  );
}
