import { NextRequest, NextResponse } from 'next/server';
import { getReportById, updateReport } from '@/lib/services';
import { UpdateReportSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const report = await getReportById(id);
    if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateReportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const report = await updateReport(id, parsed.data as any);
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}
