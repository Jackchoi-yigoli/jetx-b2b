import { NextRequest, NextResponse } from 'next/server';
import { getTransactionById, updateTransaction } from '@/lib/services';
import { UpdateTransactionSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const transaction = await getTransactionById(id);
    if (!transaction) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const transaction = await updateTransaction(id, parsed.data);
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}
