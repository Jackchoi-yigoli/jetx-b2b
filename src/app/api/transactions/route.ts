import { NextRequest, NextResponse } from 'next/server';
import { getTransactions, createTransaction } from '@/lib/services';
import { CreateTransactionSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const transactions = await getTransactions({
      siteId: sp.get('siteId') || undefined,
      customerId: sp.get('customerId') || undefined,
      operatorId: sp.get('operatorId') || undefined,
      machineId: sp.get('machineId') || undefined,
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const transaction = await createTransaction(parsed.data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
