import { NextRequest, NextResponse } from 'next/server';
import { getCampaignById, updateCampaign } from '@/lib/services';
import { UpdateCampaignSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const campaign = await getCampaignById(id);
    if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const campaign = await updateCampaign(id, parsed.data);
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
