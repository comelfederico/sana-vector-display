import { useQuery } from '@tanstack/react-query';
import { alerts } from '@/data/mockScenarioData';
import { Alert } from '@/types/scenario';

export function useScenarioAlerts(scenarioId: string) {
  return useQuery<Alert[]>({
    queryKey: ['alerts', scenarioId],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));

      // Filter alerts by scenario
      // Currently returns mock data
      // Later: return fetch(`${API_BASE_URL}/scenarios/${scenarioId}/alerts`).then(res => res.json())
      return alerts.filter(a => a.scenarioId === scenarioId);
    },
    refetchInterval: 3000, // Poll every 3 seconds
    staleTime: 1000,
    enabled: !!scenarioId,
  });
}
