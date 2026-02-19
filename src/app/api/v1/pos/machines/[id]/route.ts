import { NextRequest } from 'next/server';
import { apiSuccess, apiError, withApiKey } from '@/lib/api';
import { getMachineById } from '@/lib/services';

export const GET = withApiKey(
  async (_request: NextRequest, { params }) => {
    try {
      const { id } = await params!;
      const machine = await getMachineById(id);
      if (!machine) {
        return apiError('Machine not found', 404);
      }
      return apiSuccess(machine);
    } catch (error) {
      return apiError('Failed to fetch machine', 500);
    }
  },
  ['sites:read'],
);
