import { NextRequest, NextResponse } from 'next/server';
import { getCampaigns, createCampaign } from '@/lib/services';
import { CreateCampaignSchema } from '@/lib/validations';

export async function GET() {
  try {
    const campaigns = await getCampaigns();
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateCampaignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const campaign = await createCampaign(parsed.data);
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
