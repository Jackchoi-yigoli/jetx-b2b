import { apiSuccess, apiError } from '@/lib/api';
import { getSitePricingMenu } from '@/lib/services';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const menu = await getSitePricingMenu(id);
    if (!menu) {
      return apiError('Site not found', 404);
    }
    return apiSuccess(menu);
  } catch (error) {
    return apiError('Failed to fetch site menu', 500);
  }
}
