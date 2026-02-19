import { NextRequest, NextResponse } from 'next/server';
import { getInvitations, createInvitation } from '@/lib/services';
import { CreateInvitationSchema } from '@/lib/validations';

export async function GET() {
  try {
    const invitations = await getInvitations();
    return NextResponse.json(invitations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateInvitationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const invitation = await createInvitation(parsed.data as any);
    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}
