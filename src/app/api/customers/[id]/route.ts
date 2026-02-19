import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById, updateCustomer, deleteCustomer } from '@/lib/services';
import { UpdateCustomerSchema } from '@/lib/validations';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const customer = await getCustomerById(id);
    if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = UpdateCustomerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const customer = await updateCustomer(id, parsed.data);
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteCustomer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
