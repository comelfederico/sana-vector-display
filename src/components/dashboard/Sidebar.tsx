import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { alerts } from '@/data/mockScenarioData';
import { AlertCard } from './AlertCard';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const criticalCount = alerts.filter((a) => a.status === 'critical' && !a.isRead).length;

  return (
    <aside className="glass-panel h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-title">Global Alerts</h2>
        <p className="text-caption mt-0.5">All scenarios</p>
        {criticalCount > 0 && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-critical/10 border border-critical/20">
            <Bell className="w-4 h-4 text-critical" />
            <span className="text-body font-medium text-critical">
              {criticalCount} Critical {criticalCount === 1 ? 'Alert' : 'Alerts'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {alerts.map((alert, index) => (
            <AlertCard key={alert.id} alert={alert} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-2 text-center">
          <StatBox
            label="Total"
            value={alerts.length.toString()}
            status="safe"
          />
          <StatBox
            label="Warnings"
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
    </aside>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  status: 'safe' | 'warning' | 'critical';
}

function StatBox({ label, value, status }: StatBoxProps) {
  return (
    <div className="p-2 rounded-lg bg-secondary/30">
      <div
        className={cn(
          'text-lg font-semibold',
          status === 'safe' && 'text-safe',
          status === 'warning' && 'text-warning',
          status === 'critical' && 'text-critical'
        )}
      >
        {value}
      </div>
      <div className="text-caption">{label}</div>
    </div>
  );
}
