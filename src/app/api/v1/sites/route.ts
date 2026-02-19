import { apiSuccess, apiError } from '@/lib/api';
import { getSites } from '@/lib/services';

export async function GET() {
  try {
    const sites = await getSites();
    const filtered = sites.filter((s) => s.status !== 'offline');
    return apiSuccess(filtered);
  } catch (error) {
    return apiError('Failed to fetch sites', 500);
  }
}
