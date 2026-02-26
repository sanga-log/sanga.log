'use client';

import { useEffect, useState } from 'react';

interface TypewriterTitleProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function TypewriterTitle({ text, className, speed = 60 }: TypewriterTitleProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1 className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle animate-pulse" />
      )}
    </h1>
  );
}
