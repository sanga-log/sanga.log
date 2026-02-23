'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-black sticky top-0 bg-white z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="leading-tight text-sm font-black tracking-tight hover:opacity-70 transition-opacity">
          <span className="block">산가리의</span>
          <span className="block">테크블로그</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/blog"
            className="text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
          >
            BLOG
          </Link>
          <Link
            href="/resume"
            className="text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
          >
            RESUME
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold tracking-widest hover:opacity-50 transition-opacity"
          >
            CONTACT
          </Link>
        </nav>

        {/* 햄버거 메뉴 버튼 */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 cursor-pointer p-1"
          aria-label="메뉴 열기"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="border-t border-black bg-white">
          <nav className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-5">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest hover:opacity-50 transition-opacity"
            >
              BLOG
            </Link>
            <Link
              href="/resume"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest hover:opacity-50 transition-opacity"
            >
              RESUME
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest hover:opacity-50 transition-opacity"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
