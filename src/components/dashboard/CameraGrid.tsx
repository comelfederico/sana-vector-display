import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { cameras } from '@/data/mockData';
import { CameraCard } from './CameraCard';
import { ExpandedCameraView } from './ExpandedCameraView';

export function CameraGrid() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  
  const selectedCameraData = cameras.find((c) => c.id === selectedCamera);

  return (
    <LayoutGroup>
      <div className="h-full flex flex-col">
        {/* Bento Grid - 3 columns, 2 rows */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 flex-1"
          layout
        >
          {cameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              className="relative min-h-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <CameraCard
                camera={camera}
                isExpanded={false}
                onClick={() => setSelectedCamera(camera.id)}
                layoutId={`camera-${camera.id}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded View Portal */}
        <AnimatePresence>
          {selectedCamera && selectedCameraData && (
            <ExpandedCameraView
              camera={selectedCameraData}
              onClose={() => setSelectedCamera(null)}
              layoutId={`camera-${selectedCamera}`}
            />
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
