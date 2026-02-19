import { NextRequest, NextResponse } from 'next/server';
import { getPricingTemplateById, updatePricingTemplate } from '@/lib/services';
import { UpdatePricingTemplateSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const template = await getPricingTemplateById(id);
    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing template' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdatePricingTemplateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const template = await updatePricingTemplate(id, parsed.data);
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing template' }, { status: 500 });
  }
}
