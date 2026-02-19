import { NextRequest, NextResponse } from 'next/server';
import { getPlans, createPlan } from '@/lib/services';
import { CreatePlanSchema } from '@/lib/validations';

export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreatePlanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const plan = await createPlan(parsed.data);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
