import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionById, updateSubscription } from '@/lib/services';
import { UpdateSubscriptionSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subscription = await getSubscriptionById(id);
    if (!subscription) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const subscription = await updateSubscription(id, parsed.data);
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
