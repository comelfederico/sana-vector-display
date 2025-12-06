import { useQuery } from '@tanstack/react-query';
import { scenarios } from '@/data/mockScenarioData';
import { Scenario } from '@/types/scenario';

export function useScenarioDetail(id: string) {
  return useQuery<Scenario | undefined>({
    queryKey: ['scenario', id],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));

      // Currently returns mock data
      // Later: return fetch(`${API_BASE_URL}/scenarios/${id}`).then(res => res.json())
      return scenarios.find(s => s.id === id);
    },
    enabled: !!id,
  });
}
