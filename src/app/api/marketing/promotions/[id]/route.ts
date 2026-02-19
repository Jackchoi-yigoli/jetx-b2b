import { NextRequest, NextResponse } from 'next/server';
import { getPromoCodeById, updatePromoCode } from '@/lib/services';
import { UpdatePromoCodeSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const promoCode = await getPromoCodeById(id);
    if (!promoCode) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(promoCode);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promo code' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdatePromoCodeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const promoCode = await updatePromoCode(id, parsed.data);
    return NextResponse.json(promoCode);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promo code' }, { status: 500 });
  }
}
