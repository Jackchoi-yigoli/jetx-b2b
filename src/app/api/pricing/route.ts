import { NextRequest, NextResponse } from 'next/server';
import { getPricingTemplates, createPricingTemplate } from '@/lib/services';
import { CreatePricingTemplateSchema } from '@/lib/validations';

export async function GET() {
  try {
    const templates = await getPricingTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing templates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreatePricingTemplateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const template = await createPricingTemplate(parsed.data);
    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing template' }, { status: 500 });
  }
}
