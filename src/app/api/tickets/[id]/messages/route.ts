import { NextRequest, NextResponse } from 'next/server';
import { addTicketMessage } from '@/lib/services';
import { CreateTicketMessageSchema } from '@/lib/validations';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = CreateTicketMessageSchema.safeParse({ ...body, ticketId: id });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const message = await addTicketMessage(parsed.data);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}
