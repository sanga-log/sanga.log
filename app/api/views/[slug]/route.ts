import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const count = await redis.incr(`views:post:${slug}`);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const count = (await redis.get<number>(`views:post:${slug}`)) ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
