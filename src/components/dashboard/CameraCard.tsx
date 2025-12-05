import { motion } from 'framer-motion';
import { Camera } from '@/types/camera';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

interface CameraCardProps {
  camera: Camera;
  isExpanded: boolean;
  onClick: () => void;
  layoutId: string;
}

export function CameraCard({ camera, isExpanded, onClick, layoutId }: CameraCardProps) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden cursor-pointer glass-card card-hover h-full w-full',
        isExpanded ? 'rounded-xl' : 'rounded-card'
      )}
      initial={false}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={camera.image}
          alt={camera.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 camera-overlay" />
      </div>
      
      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-3">
        {/* Top Left Badge */}
        <div>
          <StatusBadge status={camera.status} label={`${camera.name} // ${camera.statusLabel}`} />
        </div>
        
        {/* Bottom Info */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-caption">{camera.sector}</span>
          <span className="text-caption">{camera.lastUpdate}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
