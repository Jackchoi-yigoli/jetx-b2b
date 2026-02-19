import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers, createTeamMember } from '@/lib/services';
import { CreateTeamMemberSchema } from '@/lib/validations';

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateTeamMemberSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const member = await createTeamMember(parsed.data as any);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
