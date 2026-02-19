import { NextRequest, NextResponse } from 'next/server';
import { getTickets, createTicket } from '@/lib/services';
import { CreateTicketSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const tickets = await getTickets({
      siteId: sp.get('siteId') || undefined,
      machineId: sp.get('machineId') || undefined,
      assigneeId: sp.get('assigneeId') || undefined,
      status: sp.get('status') || undefined,
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateTicketSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const ticket = await createTicket(parsed.data);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
