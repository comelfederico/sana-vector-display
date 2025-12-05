import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendingUp } from 'lucide-react';
import { alerts, predictiveRisks } from '@/data/mockData';
import { AlertCard } from './AlertCard';
import { RiskCard } from './RiskCard';
import { cn } from '@/lib/utils';

type TabType = 'alerts' | 'risks';

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('alerts');

  const criticalCount = alerts.filter((a) => a.status === 'critical').length;

  return (
    <aside className="glass-panel h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-title">Intelligence</h2>
        <p className="text-caption mt-0.5">Real-time monitoring</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b border-border">
        <TabButton
          active={activeTab === 'alerts'}
          onClick={() => setActiveTab('alerts')}
          icon={Bell}
          label="Live Alerts"
          badge={criticalCount > 0 ? criticalCount : undefined}
        />
        <TabButton
          active={activeTab === 'risks'}
          onClick={() => setActiveTab('risks')}
          icon={TrendingUp}
          label="Predictive Risks"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {activeTab === 'alerts' && (
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
        )}

        {activeTab === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {predictiveRisks.map((risk, index) => (
              <RiskCard key={risk.id} risk={risk} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-2 text-center">
          <StatBox label="Active" value="6" status="safe" />
          <StatBox label="Warnings" value="2" status="warning" />
          <StatBox label="Critical" value="1" status="critical" />
        </div>
      </div>
    </aside>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

function TabButton({ active, onClick, icon: Icon, label, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200',
        active
          ? 'bg-secondary/60 text-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
      {badge !== undefined && (
        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-critical/20 text-critical text-[10px] font-bold">
          {badge}
        </span>
      )}
    </button>
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
