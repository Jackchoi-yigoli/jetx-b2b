import { NextRequest, NextResponse } from 'next/server';
import { getSites, getSitesByOperator, createSite } from '@/lib/services';
import { CreateSiteSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const operatorId = request.nextUrl.searchParams.get('operatorId');
    const sites = operatorId ? await getSitesByOperator(operatorId) : await getSites();
    return NextResponse.json(sites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateSiteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const site = await createSite(parsed.data as any);
    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}
