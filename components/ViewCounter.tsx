'use client';

import { useEffect, useRef, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
}

export default function ViewCounter({ slug, increment = false }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const called = useRef(false);

  useEffect(() => {
    if (increment && called.current) return;
    called.current = true;

    const url = `/api/views/${slug}`;
    const method = increment ? 'POST' : 'GET';

    fetch(url, { method })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(0));
  }, [slug, increment]);

  return (
    <span className="text-xs font-bold tracking-widest text-gray-400">
      {count === null ? '-' : count.toLocaleString()} views
    </span>
  );
}
