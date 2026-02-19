import { NextRequest } from 'next/server';
import { apiSuccess, apiError, apiValidationError, withApiKey } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { PosMachineHeartbeatSchema } from '@/lib/validations';

export const PATCH = withApiKey(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params!;
      const body = await request.json();
      const parsed = PosMachineHeartbeatSchema.safeParse(body);
      if (!parsed.success) {
        return apiValidationError(parsed.error.flatten());
      }

      const machine = await prisma.machine.update({
        where: { id },
        data: {
          status: parsed.data.status as any,
          ...(parsed.data.healthScore !== undefined ? { healthScore: parsed.data.healthScore } : {}),
          ...(parsed.data.totalWashCycles !== undefined ? { totalWashCycles: parsed.data.totalWashCycles } : {}),
        },
      });

      return apiSuccess(machine);
    } catch (error) {
      return apiError('Failed to update machine heartbeat', 500);
    }
  },
  ['transactions:write'],
);
