import { NextRequest, NextResponse } from 'next/server';
import { getMachineById, updateMachine } from '@/lib/services';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const machine = await getMachineById(id);
    if (!machine) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(machine);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch machine' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const machine = await updateMachine(id, body);
    return NextResponse.json(machine);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update machine' }, { status: 500 });
  }
}
