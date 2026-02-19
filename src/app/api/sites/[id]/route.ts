import { NextRequest, NextResponse } from 'next/server';
import { getSiteById, updateSite, deleteSite } from '@/lib/services';
import { UpdateSiteSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const site = await getSiteById(id);
    if (!site) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateSiteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const site = await updateSite(id, parsed.data as any);
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteSite(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
  }
}
