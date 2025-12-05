import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, MapPin, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Camera } from '@/types/camera';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

interface ExpandedCameraViewProps {
  camera: Camera;
  onClose: () => void;
  layoutId: string;
}

export function ExpandedCameraView({ camera, onClose, layoutId }: ExpandedCameraViewProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="relative w-full max-w-6xl h-[80vh] rounded-xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="flex h-full">
          {/* Main Video Area */}
          <div className="relative flex-1">
            <img
              src={camera.image}
              alt={camera.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 camera-overlay" />
            
            {/* Top Left Badge */}
            <div className="absolute top-4 left-4">
              <StatusBadge 
                status={camera.status} 
                label={`${camera.name} // ${camera.statusLabel}`}
                className="text-xs"
              />
            </div>
            
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:bg-background/70 transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>
            
            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
              <div className="flex items-center gap-6 text-caption">
                <span>{camera.sector}</span>
                <span>•</span>
                <span>{camera.zoneType}</span>
                <span>•</span>
                <span>Updated {camera.lastUpdate}</span>
              </div>
            </div>
          </div>
          
          {/* Metadata Panel */}
          <AnimatePresence>
            <motion.div
              className="w-80 bg-card/80 backdrop-blur-xl border-l border-border p-6 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <h2 className="text-title mb-1">{camera.zoneType}</h2>
              <p className="text-caption mb-6">{camera.sector}</p>
              
              {/* Stats Grid */}
              <div className="space-y-4 flex-1">
                <MetadataItem
                  icon={Users}
                  label="Active Agents"
                  value={camera.activeAgents.toString()}
                  status={camera.activeAgents > 2 ? 'warning' : 'safe'}
                />
                
                <MetadataItem
                  icon={Shield}
                  label="Zone Status"
                  value={camera.statusLabel}
                  status={camera.status}
                />
                
                <MetadataItem
                  icon={MapPin}
                  label="Location"
                  value={camera.sector}
                />
                
                <MetadataItem
                  icon={Clock}
                  label="Last Update"
                  value={camera.lastUpdate}
                />
                
                {camera.status === 'critical' && (
                  <motion.div
                    className="mt-6 p-4 rounded-lg bg-critical/10 border border-critical/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-critical flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-critical">Critical Alert</p>
                        <p className="text-caption mt-1">
                          Immediate attention required. Contamination protocols have been activated.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {camera.status === 'warning' && (
                  <motion.div
                    className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-warning">Monitoring Alert</p>
                        <p className="text-caption mt-1">
                          Elevated readings detected. Automated monitoring in progress.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-border">
                <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  View Full Report
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface MetadataItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  status?: 'safe' | 'warning' | 'critical';
}

function MetadataItem({ icon: Icon, label, value, status }: MetadataItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-caption">{label}</span>
      </div>
      <span
        className={cn(
          'text-sm font-medium',
          status === 'safe' && 'text-safe',
          status === 'warning' && 'text-warning',
          status === 'critical' && 'text-critical',
          !status && 'text-foreground'
        )}
      >
        {value}
      </span>
    </div>
  );
}
