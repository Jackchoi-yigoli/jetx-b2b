import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withConsumerAuth } from '@/lib/api';
import { AddVehicleSchema } from '@/lib/validations';
import { getVehiclesByCustomer, createVehicle } from '@/lib/services';

export const GET = withConsumerAuth(async (_request, { customer }) => {
  try {
    const vehicles = await getVehiclesByCustomer(customer.id);
    return apiSuccess(vehicles);
  } catch (error) {
    return apiError('Failed to fetch vehicles', 500);
  }
});

export const POST = withConsumerAuth(async (request: NextRequest, { customer }) => {
  try {
    const body = await request.json();
    const parsed = AddVehicleSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error.flatten());
    }

    const vehicle = await createVehicle({ ...parsed.data, customerId: customer.id } as any);
    return apiSuccess(vehicle, 201);
  } catch (error) {
    return apiError('Failed to create vehicle', 500);
  }
});
