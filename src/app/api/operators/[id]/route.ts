import { NextRequest, NextResponse } from 'next/server';
import { getOperatorById, updateOperator, deleteOperator } from '@/lib/services';
import { UpdateOperatorSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const operator = await getOperatorById(id);
    if (!operator) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(operator);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch operator' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateOperatorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const operator = await updateOperator(id, parsed.data);
    return NextResponse.json(operator);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update operator' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteOperator(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete operator' }, { status: 500 });
  }
}
