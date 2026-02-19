import { NextRequest, NextResponse } from 'next/server';
import { getMachines } from '@/lib/services';

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId') || undefined;
    const machines = await getMachines({ siteId });
    return NextResponse.json(machines);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch machines' }, { status: 500 });
  }
}
