import { apiSuccess, apiError, withConsumerAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export const DELETE = withConsumerAuth(async (_request, { customer, params }) => {
  try {
    const { id } = await params!;

    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      return apiError('Vehicle not found', 404);
    }

    if (vehicle.customerId !== customer.id) {
      return apiError('Forbidden', 403);
    }

    await prisma.vehicle.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error) {
    return apiError('Failed to delete vehicle', 500);
  }
});
