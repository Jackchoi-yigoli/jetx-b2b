import { NextRequest, NextResponse } from 'next/server';
import { getMaintenanceHistory, createMaintenanceRecord } from '@/lib/services';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const records = await getMaintenanceHistory(id);
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch maintenance history' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const record = await createMaintenanceRecord({ ...body, machineId: id });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create maintenance record' }, { status: 500 });
  }
}
