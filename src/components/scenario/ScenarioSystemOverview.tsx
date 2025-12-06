import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScenarios } from '@/hooks/useScenarios';
import { ScenarioCard } from './ScenarioCard';

export function ScenarioSystemOverview() {
  const navigate = useNavigate();
  const { data: scenarios, isLoading } = useScenarios();

  if (isLoading || !scenarios) {
    return (
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 flex-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 flex-1"
        layout
      >
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            className="relative min-h-0"
            layout
          >
            <ScenarioCard
              scenario={scenario}
              onClick={() => navigate(`/scenario/${scenario.id}`)}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
