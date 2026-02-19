import { NextRequest, NextResponse } from 'next/server';
import { getAlerts, acknowledgeAlert } from '@/lib/services';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const alerts = await getAlerts({ machineId: id });
    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId, acknowledgedBy } = body;
    if (!alertId || !acknowledgedBy) {
      return NextResponse.json({ error: 'alertId and acknowledgedBy are required' }, { status: 400 });
    }
    const alert = await acknowledgeAlert(alertId, acknowledgedBy);
    return NextResponse.json(alert);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to acknowledge alert' }, { status: 500 });
  }
}
