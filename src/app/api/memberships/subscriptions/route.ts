import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptions, createSubscription } from '@/lib/services';
import { CreateSubscriptionSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const subscriptions = await getSubscriptions({
      customerId: sp.get('customerId') || undefined,
      planId: sp.get('planId') || undefined,
      status: sp.get('status') || undefined,
    });
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const subscription = await createSubscription(parsed.data);
    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}
