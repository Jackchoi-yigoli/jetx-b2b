import { NextRequest, NextResponse } from 'next/server';
import { getPromoCodes, createPromoCode } from '@/lib/services';
import { CreatePromoCodeSchema } from '@/lib/validations';

export async function GET() {
  try {
    const promoCodes = await getPromoCodes();
    return NextResponse.json(promoCodes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promo codes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreatePromoCodeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const promoCode = await createPromoCode(parsed.data);
    return NextResponse.json(promoCode, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo code' }, { status: 500 });
  }
}
