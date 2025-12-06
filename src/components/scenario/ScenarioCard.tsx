import { motion } from 'framer-motion';
import { MapPin, Clock, TrendingUp } from 'lucide-react';
import { Scenario } from '@/types/scenario';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: () => void;
  index?: number;
}

export function ScenarioCard({ scenario, onClick, index = 0 }: ScenarioCardProps) {
  const hasEvents = scenario.eventsLast24h > 0;
  const hasCritical = scenario.eventsCritical > 0;
  const hasWarning = scenario.eventsWarning > 0;

  return (
    <motion.div
      className="glass-card h-full flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-title font-semibold mb-1 truncate">{scenario.name}</h3>
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{scenario.location}</span>
            </div>
          </div>
          <StatusBadge status={scenario.status} label={scenario.statusLabel} />
        </div>

        {/* Zone Type */}
        <div className="text-body text-muted-foreground mb-4">
          {scenario.zoneType}
        </div>

        {/* Event Metrics */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-foreground">Events (24h)</span>
              <span
                className={cn(
                  'text-body font-semibold',
                  hasEvents ? (hasCritical ? 'text-critical' : hasWarning ? 'text-warning' : 'text-safe') : 'text-muted-foreground'
                )}
              >
                {scenario.eventsLast24h}
              </span>
            </div>

            {hasEvents && (
              <div className="flex gap-2">
                {hasCritical && (
                  <div className="flex-1 px-2 py-1 rounded bg-critical/10 border border-critical/20">
                    <div className="text-[10px] text-critical/70 uppercase">Critical</div>
                    <div className="text-body font-semibold text-critical">{scenario.eventsCritical}</div>
                  </div>
                )}
                {hasWarning && (
                  <div className="flex-1 px-2 py-1 rounded bg-warning/10 border border-warning/20">
                    <div className="text-[10px] text-warning/70 uppercase">Warning</div>
                    <div className="text-body font-semibold text-warning">{scenario.eventsWarning}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{scenario.lastUpdate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-caption">
              <TrendingUp className="w-3 h-3 text-safe" />
              <span className="text-safe font-medium">{scenario.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
