import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — 산가리의 테크블로그',
  description: '산가리에게 연락하기',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <section className="pb-12 border-b border-black mb-12">
        <h1 className="text-5xl font-black tracking-tight">CONTACT</h1>
      </section>

      <div className="flex flex-col gap-10">
        <p className="text-lg leading-relaxed text-gray-600">
          협업 제안, 기술 질문, 커피챗 모두 환영합니다.
          <br />
          아래 채널로 편하게 연락 주세요.
        </p>

        <div className="flex flex-col gap-6">
          {[
            { label: 'EMAIL', value: 'hello@sangari.dev', href: 'mailto:hello@sangari.dev' },
            { label: 'GITHUB', value: 'github.com/sangari', href: 'https://github.com' },
            { label: 'LINKEDIN', value: 'linkedin.com/in/sangari', href: 'https://linkedin.com' },
          ].map((contact) => (
            <div key={contact.label} className="border-b border-black pb-6 flex items-center justify-between group">
              <span className="text-xs font-black tracking-widest text-gray-400">
                {contact.label}
              </span>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-base font-bold hover:opacity-50 transition-opacity"
              >
                {contact.value} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
