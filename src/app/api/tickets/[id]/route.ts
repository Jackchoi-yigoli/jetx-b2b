import { NextRequest, NextResponse } from 'next/server';
import { getTicketById, updateTicket } from '@/lib/services';
import { UpdateTicketSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ticket = await getTicketById(id);
    if (!ticket) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateTicketSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const ticket = await updateTicket(id, parsed.data);
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}
