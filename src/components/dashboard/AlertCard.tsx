import { motion } from 'framer-motion';
import { Alert } from '@/types/scenario';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  index: number;
}

export function AlertCard({ alert, index }: AlertCardProps) {
  return (
    <motion.div
      className="alert-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'mt-1.5 flex-shrink-0',
            alert.status === 'safe' && 'dot-safe',
            alert.status === 'warning' && 'dot-warning',
            alert.status === 'critical' && 'dot-critical'
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-caption font-medium">{alert.timestamp}</span>
          </div>
          <p className="text-body leading-snug">{alert.message}</p>
        </div>
      </div>
    </motion.div>
  );
}
