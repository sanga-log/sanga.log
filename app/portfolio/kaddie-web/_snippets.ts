// Kaddie Web 디테일 페이지의 코드 스니펫 모음.
// JSX template literal 안에서 사용하기 위해 백틱·달러·백슬래시는 escape 처리.

export const C3_CODE = `// 핵심만: 폴링 시작·정지를 refetchInterval 하나로, 버튼 잠금은 상태 신호로 직결
const POLL_INTERVAL_MS = 1000;
const MAX_ATTEMPTS = 5;

const submitOrder = useMutation({ mutationFn: postOrder });

// orderId가 생기면 자동 폴링 → 종결 상태거나 5회 도달 시 false를 반환해 스스로 멈춘다
const orderStatus = useQuery({
  queryKey: ["orderStatus", submitOrder.data?.orderId],
  queryFn: () => checkOrder(submitOrder.data!.orderId),
  enabled: !!submitOrder.data?.orderId,
  refetchInterval: (q) => {
    const status = q.state.data?.status;
    if (status === "COMPLETE" || status === "FAILED") return false;
    if (q.state.dataUpdateCount >= MAX_ATTEMPTS) return false;
    return POLL_INTERVAL_MS;
  },
});

// isPending(주문 생성) || isFetching(폴링) → 버튼 disabled 신호 하나로 직결, 수동 이중 상태 제거
<button disabled={submitOrder.isPending || orderStatus.isFetching}>
  {submitOrder.isPending || orderStatus.isFetching ? "Processing…" : "Confirm Payment"}
</button>`;

export const C4A_CODE = `// 핵심만: 행(row) 단위 MD5로 바뀐 키만 changedKeys에 모은다
const getHash = (value: string) => crypto.createHash("md5").update(value).digest("hex");

const cache = loadCache(); // 이전 빌드의 행별 해시
const changedKeys: string[] = [];
for (let i = 1; i < rows.length; i++) {
  const key = rows[i][keyIndex]?.trim()?.replace(/\\//g, ".") || "";
  let rowString = key;
  for (const lang of LANGUAGES) rowString += \`|\${rows[i][langIndices[lang]]?.trim() || ""}\`;
  // 한 셀만 바뀌어도 그 행의 해시가 달라지므로 해당 키만 갱신 대상이 된다
  if (cache?.hashes[key] !== getHash(rowString)) changedKeys.push(key);
}
if (changedKeys.length === 0 && cache) return; // 변경 없으면 빌드 스킵`;

export const C4B_CODE = `// 핵심만: Google Sheets 인증 키를 빌드 타임에만 주입하고, 빌드 끝나면 즉시 폐기
stage("Build Docker Image") {
  steps {
    // AWS Secrets Manager에서 서비스 계정 키를 받아 credentials.json으로 떨군다
    sh '''
      aws secretsmanager get-secret-value \\
        --secret-id \${GOOGLE_SHEETS_SECRET_NAME} \\
        --query SecretString --output text > credentials.json
    '''
    sh "docker build -t <ECR_URI>/<REPO>:\${GIT_COMMIT_HASH} ."
    sh "rm -f credentials.json" // 이미지 빌드 후 곧바로 폐기 → 레포·이미지에 키가 남지 않음
  }
}`;
