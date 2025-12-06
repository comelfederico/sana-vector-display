import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import { cn } from '@/lib/utils';

export function ContaminationMetrics() {
  const { data: metrics, isLoading } = useSystemMetrics();

  if (isLoading || !metrics) {
    return (
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-secondary/30 rounded animate-pulse" />
          <div className="h-8 w-32 bg-secondary/30 rounded animate-pulse" />
          <div className="h-8 w-32 bg-secondary/30 rounded animate-pulse" />
          <div className="h-8 w-32 bg-secondary/30 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const metricItems = [
    {
      label: 'Active Scenarios',
      value: metrics.activeScenarios,
      total: metrics.totalScenarios,
      icon: Activity,
      color: 'text-foreground',
    },
    {
      label: 'Events Today',
      value: metrics.totalEventsToday,
      icon: Activity,
      color: 'text-foreground',
    },
    {
      label: 'Critical',
      value: metrics.criticalEventsToday,
      icon: XCircle,
      color: 'text-critical',
    },
    {
      label: 'Safe Zones',
      value: metrics.scenariosSafe,
      icon: CheckCircle,
      color: 'text-safe',
    },
  ];

  return (
    <motion.div
      className="glass-card p-4 mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className={cn('flex-shrink-0', item.color)}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-caption text-muted-foreground">{item.label}</div>
              <div className="flex items-baseline gap-1">
                <motion.div
                  className={cn('text-title font-semibold', item.color)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={item.value}
                >
                  {item.value}
                </motion.div>
                {item.total !== undefined && (
                  <span className="text-caption text-muted-foreground">/ {item.total}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
