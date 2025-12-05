import { CameraStatus } from '@/types/camera';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: CameraStatus;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase',
        status === 'safe' && 'badge-safe',
        status === 'warning' && 'badge-warning',
        status === 'critical' && 'badge-critical',
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'safe' && 'bg-safe',
          status === 'warning' && 'bg-warning',
          status === 'critical' && 'bg-critical animate-pulse-glow'
        )}
      />
      {label}
    </div>
  );
}
