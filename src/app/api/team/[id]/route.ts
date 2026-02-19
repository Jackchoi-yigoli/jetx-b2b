import { NextRequest, NextResponse } from 'next/server';
import { getTeamMemberById, updateTeamMember } from '@/lib/services';
import { UpdateTeamMemberSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const member = await getTeamMemberById(id);
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateTeamMemberSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const member = await updateTeamMember(id, parsed.data);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}
