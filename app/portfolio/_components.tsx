const MONO_FONT =
  "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', ui-monospace, Menlo, Consolas, monospace";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-9 text-2xl sm:text-[26px] font-black tracking-tight text-gray-900">
      {children}
    </h2>
  );
}

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-black">{children}</strong>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0 inline-block" />
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-base leading-[1.75] text-gray-700 flex items-start gap-2"
        >
          <Dot />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface Snippet {
  filename: string;
  code: string;
  highlight: React.ReactNode;
}

// ─────────────────────────────────────────────
// 코드 블록 — Claude 다크 테마 (붙여넣기 코드 스타일)
// 의존성 없이 JS/TS/JSX를 라이트 토크나이징해 구문 강조한다.
// ─────────────────────────────────────────────

const SYNTAX = {
  panel: "#1E1F26",
  border: "#2C2E3A",
  header: "#16171D",
  filename: "#8B92A5",
  text: "#C8CDD6", // 기본 식별자
  keyword: "#C792EA", // const/return/class/public ...
  constant: "#F2A65E", // this / true / false / null / 숫자
  type: "#D7C08A", // 대문자 시작 식별자(String, Hello, Set ...)
  func: "#82AAFF", // 함수 호출명
  string: "#C3E88D",
  comment: "#6B7385",
  punct: "#7E8595",
} as const;

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "do", "switch", "case", "break", "continue", "new", "class", "extends",
  "super", "import", "from", "export", "default", "async", "await", "yield",
  "try", "catch", "finally", "throw", "typeof", "instanceof", "in", "of",
  "void", "delete", "public", "private", "protected", "static", "readonly",
  "interface", "type", "enum", "implements", "as", "namespace", "declare",
  "abstract", "get", "set",
]);

const CONSTANTS = new Set(["this", "true", "false", "null", "undefined"]);

type Token = { text: string; color: string };

const isIdentStart = (c: string) => /[A-Za-z_$]/.test(c);
const isIdentPart = (c: string) => /[A-Za-z0-9_$]/.test(c);

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const n = code.length;
  let i = 0;

  while (i < n) {
    const c = code[i];

    // 줄 주석
    if (c === "/" && code[i + 1] === "/") {
      let j = i;
      while (j < n && code[j] !== "\n") j++;
      tokens.push({ text: code.slice(i, j), color: SYNTAX.comment });
      i = j;
      continue;
    }

    // 블록 주석
    if (c === "/" && code[i + 1] === "*") {
      let j = i + 2;
      while (j < n && !(code[j] === "*" && code[j + 1] === "/")) j++;
      j = Math.min(n, j + 2);
      tokens.push({ text: code.slice(i, j), color: SYNTAX.comment });
      i = j;
      continue;
    }

    // 문자열 (' " `) — 멀티라인 템플릿 리터럴 포함
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < n) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === c) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ text: code.slice(i, j), color: SYNTAX.string });
      i = j;
      continue;
    }

    // 숫자
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < n && /[0-9._]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), color: SYNTAX.constant });
      i = j;
      continue;
    }

    // 식별자 / 키워드
    if (isIdentStart(c)) {
      let j = i;
      while (j < n && isIdentPart(code[j])) j++;
      const word = code.slice(i, j);
      let k = j;
      while (k < n && code[k] === " ") k++;

      let color: string = SYNTAX.text;
      if (KEYWORDS.has(word)) color = SYNTAX.keyword;
      else if (CONSTANTS.has(word)) color = SYNTAX.constant;
      else if (code[k] === "(") color = SYNTAX.func;
      else if (/^[A-Z]/.test(word)) color = SYNTAX.type;

      tokens.push({ text: word, color });
      i = j;
      continue;
    }

    // 공백·구두점·연산자 (다음 토큰 시작 전까지 묶음)
    let j = i;
    while (j < n) {
      const d = code[j];
      if (isIdentStart(d) || isIdentPart(d)) break;
      if (d === '"' || d === "'" || d === "`") break;
      if (d === "/" && (code[j + 1] === "/" || code[j + 1] === "*")) break;
      j++;
    }
    if (j === i) j = i + 1;
    tokens.push({ text: code.slice(i, j), color: SYNTAX.punct });
    i = j;
  }

  return tokens;
}

function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((t, idx) => (
        <span key={idx} style={{ color: t.color }}>
          {t.text}
        </span>
      ))}
    </>
  );
}

export function CodeSnippet({ filename, code, highlight }: Snippet) {
  return (
    <div className="mt-5">
      <div
        className="overflow-hidden rounded-lg"
        style={{ border: `1px solid ${SYNTAX.border}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: SYNTAX.header,
            borderBottom: `1px solid ${SYNTAX.border}`,
          }}
        >
          <span className="flex gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3A3D49" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3A3D49" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3A3D49" }} />
          </span>
          <span
            className="text-[11px] tracking-wide ml-1"
            style={{ fontFamily: MONO_FONT, color: SYNTAX.filename }}
          >
            {filename}
          </span>
        </div>
        <pre
          className="text-[12.5px] leading-[1.7] px-5 py-4 overflow-x-auto"
          style={{ fontFamily: MONO_FONT, background: SYNTAX.panel }}
        >
          <code className="whitespace-pre" style={{ background: "transparent" }}>
            <HighlightedCode code={code} />
          </code>
        </pre>
      </div>
      <p className="text-xs leading-[1.65] text-gray-600 mt-2.5">
        {highlight}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 다이어그램 컴포넌트 — 흑백 미니멀 톤
// ─────────────────────────────────────────────

export function FlowStep({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-md rounded-xl px-4 py-3 text-[13px] leading-snug text-center break-words ${
        emphasis
          ? "bg-gray-900 text-white font-semibold shadow-md ring-1 ring-gray-900"
          : "bg-white text-gray-800 border border-gray-200 shadow-[0_1px_3px_rgba(17,24,39,0.06)]"
      }`}
    >
      {children}
    </div>
  );
}

export function FlowArrow({ label }: { label?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full select-none">
      <span className="w-px h-3 bg-gray-200" />
      {label && (
        <span className="my-0.5 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
          {label}
        </span>
      )}
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        className="text-gray-300"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 1.5 L7 7.5 L13 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function FlowAside({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] opacity-70 mt-1.5 text-center leading-snug break-words">
      {children}
    </p>
  );
}

export function Diagram({
  title,
  children,
  caption,
}: {
  title?: string;
  children: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-3.5 rounded-full bg-gray-900" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {title}
          </span>
        </div>
      )}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-5 py-8">
        <div className="flex flex-col items-center gap-0">{children}</div>
      </div>
      {caption && (
        <p className="text-xs leading-[1.65] text-gray-500 mt-2.5">
          {caption}
        </p>
      )}
    </div>
  );
}

interface DecisionProps {
  number: number;
  title: string;
  body: React.ReactNode;
  diagram?: React.ReactNode;
  snippets?: Snippet[];
  result: React.ReactNode[];
  retrospective: React.ReactNode;
}

export function Decision({
  number,
  title,
  body,
  diagram,
  snippets,
  result,
  retrospective,
}: DecisionProps) {
  return (
    <div
      className={
        number === 1 ? "" : "mt-12 pt-10 border-t border-gray-100"
      }
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[11px] font-bold tracking-[0.14em] text-gray-500">
          결정 {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight mb-4">
        {title}
      </h3>
      <div className="text-base leading-[1.75] text-gray-700 space-y-3">
        {body}
      </div>
      {diagram && <div className="mt-2">{diagram}</div>}
      {snippets && snippets.length > 0 && (
        <div className="mt-2">
          {snippets.map((s, i) => (
            <CodeSnippet key={i} {...s} />
          ))}
        </div>
      )}
      <div className="mt-7 border-l-2 border-gray-900 pl-4">
        <h4 className="text-[11px] font-bold tracking-wide text-gray-500 mb-2">
          결과
        </h4>
        <BulletList items={result} />
      </div>
      <div className="mt-6">
        <h4 className="text-[11px] font-bold tracking-wide text-gray-500 mb-2">
          배운 점
        </h4>
        <p className="text-base leading-[1.75] text-gray-600">{retrospective}</p>
      </div>
    </div>
  );
}
