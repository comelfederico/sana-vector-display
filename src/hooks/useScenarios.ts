import { useQuery } from '@tanstack/react-query';
import { scenarios } from '@/data/mockScenarioData';
import { Scenario } from '@/types/scenario';

export function useScenarios() {
  return useQuery<Scenario[]>({
    queryKey: ['scenarios'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));

      // Currently returns mock data
      // Later: return fetch(`${API_BASE_URL}/scenarios`).then(res => res.json())
      return scenarios;
    },
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 2000,
  });
}
