import { NextRequest, NextResponse } from 'next/server';
import { getCustomers, createCustomer } from '@/lib/services';
import { CreateCustomerSchema } from '@/lib/validations';

export async function GET() {
  try {
    const customers = await getCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateCustomerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const customer = await createCustomer(parsed.data as any);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
