import { getAccessToken } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
    const token = await getAccessToken();
    return NextResponse.json({ token: token || '' });
}