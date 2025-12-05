import { motion } from 'framer-motion';
import { PredictiveRisk } from '@/types/camera';
import { cn } from '@/lib/utils';

interface RiskCardProps {
  risk: PredictiveRisk;
  index: number;
}

export function RiskCard({ risk, index }: RiskCardProps) {
  const getRiskLevel = (probability: number) => {
    if (probability >= 60) return 'critical';
    if (probability >= 30) return 'warning';
    return 'safe';
  };

  const riskLevel = getRiskLevel(risk.probability);

  return (
    <motion.div
      className="alert-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        {/* Probability Circle */}
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold',
            riskLevel === 'safe' && 'bg-safe/20 text-safe',
            riskLevel === 'warning' && 'bg-warning/20 text-warning',
            riskLevel === 'critical' && 'bg-critical/20 text-critical'
          )}
        >
          {risk.probability}%
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-caption">{risk.sector}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-caption">{risk.timeframe}</span>
          </div>
          <p className="text-body leading-snug">{risk.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
