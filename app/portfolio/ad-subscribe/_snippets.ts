export const PHASE_CODE = `// 타임아웃을 가장 먼저 본다. status가 PENDING이어도 스피너에 갇히지 않게.
let paymentPhase: PaymentPhase = "idle";

if (paymentTimedOut) paymentPhase = "timeout";
else if (isPolling || status === "PENDING") paymentPhase = "pending";
else if (status === "FAILED") paymentPhase = "failed";`;

export const POLL_CODE = `const POLL_INTERVAL_MS = 1000;
const POLL_MAX_ATTEMPTS = 10;

const pollPaymentResult = async () => {
  if (pollingRef.current) return; // 신청 직후와 재진입이 겹쳐도 한 번만 돈다
  pollingRef.current = true;
  try {
    for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
      await sleep(POLL_INTERVAL_MS);
      const status = await fetchSubscribeStatus();
      if (status === "ACTIVE" || status === "FAILED") return; // 확정되면 끝
    }
    setPaymentTimedOut(true); // 10초가 지나도 PENDING이면 안내 화면으로
  } finally {
    pollingRef.current = false;
  }
};

// 신청 직후·재진입·새로고침 모두 PENDING이면 폴링을 다시 돌린다
useEffect(() => {
  if (status === "PENDING" && !paymentTimedOut) pollPaymentResult();
}, [status, paymentTimedOut]);`;
