import { apiSuccess, apiError } from '@/lib/api';
import { getPlans } from '@/lib/services';

export async function GET() {
  try {
    const plans = await getPlans();
    const active = plans.filter((p) => p.status === 'active');
    return apiSuccess(active);
  } catch (error) {
    return apiError('Failed to fetch plans', 500);
  }
}
