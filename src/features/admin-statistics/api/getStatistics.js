import api from '../../../lib/api';

export async function getStatisticsData(period = 'all_time') {
  const { data } = await api.get('/admin/statistics', { params: { period } });
  return data?.data ?? data;
}