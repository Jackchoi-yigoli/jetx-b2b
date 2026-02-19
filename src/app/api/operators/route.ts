import { NextRequest, NextResponse } from 'next/server';
import { getOperators, createOperator } from '@/lib/services';
import { CreateOperatorSchema } from '@/lib/validations';

export async function GET() {
  try {
    const operators = await getOperators();
    return NextResponse.json(operators);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch operators' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateOperatorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const operator = await createOperator(parsed.data);
    return NextResponse.json(operator, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create operator' }, { status: 500 });
  }
}
