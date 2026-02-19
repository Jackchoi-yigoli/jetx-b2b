import { NextRequest, NextResponse } from 'next/server';
import { getPlanById, updatePlan } from '@/lib/services';
import { UpdatePlanSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const plan = await getPlanById(id);
    if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdatePlanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const plan = await updatePlan(id, parsed.data);
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
  }
}
