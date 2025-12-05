import { motion } from 'framer-motion';
import { Shield, Activity } from 'lucide-react';

export function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-sm">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-foreground/10 to-foreground/5 border border-border flex items-center justify-center">
          <Shield className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Vector</h1>
          <p className="text-caption">Bio-Safety Monitoring</p>
        </div>
      </motion.div>

      {/* Center Status */}
      <motion.div
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Activity className="w-4 h-4 text-safe animate-pulse" />
        <span className="text-sm text-muted-foreground">System Online</span>
        <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse-glow" />
      </motion.div>

      {/* Time */}
      <motion.div
        className="text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-lg font-medium tabular-nums">{currentTime}</div>
        <div className="text-caption">{currentDate}</div>
      </motion.div>
    </header>
  );
}
