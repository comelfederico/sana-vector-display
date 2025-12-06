import { useQuery } from '@tanstack/react-query';
import { scenarios, calculateSystemMetrics } from '@/data/mockScenarioData';
import { SystemMetrics } from '@/types/scenario';

export function useSystemMetrics() {
  return useQuery<SystemMetrics>({
    queryKey: ['metrics'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));

      // Calculate from scenarios
      // Currently returns mock data
      // Later: return fetch(`${API_BASE_URL}/metrics`).then(res => res.json())
      return calculateSystemMetrics(scenarios);
    },
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 2000,
  });
}
