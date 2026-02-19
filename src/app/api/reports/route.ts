import { NextRequest, NextResponse } from 'next/server';
import { getReports, createReport } from '@/lib/services';
import { CreateReportSchema } from '@/lib/validations';

export async function GET() {
  try {
    const reports = await getReports();
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateReportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const report = await createReport(parsed.data as any);
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
