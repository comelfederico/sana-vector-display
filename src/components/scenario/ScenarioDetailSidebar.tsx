import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useScenarioAlerts } from '@/hooks/useScenarioAlerts';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { toast } from 'sonner';

interface ScenarioDetailSidebarProps {
  scenarioId: string;
  scenarioName: string;
}

export function ScenarioDetailSidebar({ scenarioId, scenarioName }: ScenarioDetailSidebarProps) {
  const { data: alerts, isLoading } = useScenarioAlerts(scenarioId);
  const previousAlertCount = useRef(0);

  useEffect(() => {
    if (alerts && alerts.length > previousAlertCount.current && previousAlertCount.current > 0) {
      // New alert detected
      const newAlert = alerts[0];
      toast.error('New contamination event detected', {
        description: newAlert.message,
      });
    }
    if (alerts) {
      previousAlertCount.current = alerts.length;
    }
  }, [alerts]);

  const criticalCount = alerts?.filter((a) => a.status === 'critical' && !a.isRead).length || 0;

  return (
    <aside className="glass-panel h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-title">Live Alerts</h2>
        <p className="text-caption mt-0.5">{scenarioName}</p>
      </div>

      {/* Alert Badge */}
      {criticalCount > 0 && (
        <div className="px-4 py-2 bg-critical/10 border-b border-critical/20">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-critical" />
            <span className="text-body font-medium text-critical">
              {criticalCount} Critical {criticalCount === 1 ? 'Alert' : 'Alerts'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="alert-card animate-pulse h-20" />
            ))}
          </div>
        ) : alerts && alerts.length > 0 ? (
          <motion.div
            key="alerts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {alerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-body text-muted-foreground">No alerts for this scenario</p>
            <p className="text-caption text-muted-foreground/70 mt-1">
              All systems operating normally
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {alerts && alerts.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-3 gap-2 text-center">
            <StatBox
              label="Total"
              value={alerts.length.toString()}
              status="safe"
            />
            <StatBox
              label="Warning"
              value={alerts.filter(a => a.status === 'warning').length.toString()}
              status="warning"
            />
            <StatBox
              label="Critical"
              value={alerts.filter(a => a.status === 'critical').length.toString()}
              status="critical"
            />
          </div>
        </div>
      )}
    </aside>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  status: 'safe' | 'warning' | 'critical';
}

function StatBox({ label, value, status }: StatBoxProps) {
  const colorClass = {
    safe: 'text-safe',
    warning: 'text-warning',
    critical: 'text-critical',
  }[status];

  return (
    <div className="p-2 rounded-lg bg-secondary/30">
      <div className={`text-lg font-semibold ${colorClass}`}>
        {value}
      </div>
      <div className="text-caption">{label}</div>
    </div>
  );
}
