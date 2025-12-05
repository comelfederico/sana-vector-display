import { Camera, Alert, PredictiveRisk } from '@/types/camera';

import lab1 from '@/assets/lab-1.jpg';
import kitchen1 from '@/assets/kitchen-1.jpg';
import lab2 from '@/assets/lab-2.jpg';
import processing1 from '@/assets/processing-1.jpg';
import lab3 from '@/assets/lab-3.jpg';
import storage1 from '@/assets/storage-1.jpg';

export const cameras: Camera[] = [
  {
    id: 'cam-01',
    name: 'CAM 01',
    sector: 'Sector 1',
    status: 'safe',
    statusLabel: 'STERILE',
    image: lab1,
    activeAgents: 0,
    lastUpdate: '2 min ago',
    zoneType: 'Clean Room A',
  },
  {
    id: 'cam-02',
    name: 'CAM 02',
    sector: 'Sector 2',
    status: 'safe',
    statusLabel: 'STERILE',
    image: kitchen1,
    activeAgents: 3,
    lastUpdate: '1 min ago',
    zoneType: 'Prep Kitchen',
  },
  {
    id: 'cam-03',
    name: 'CAM 03',
    sector: 'Sector 3',
    status: 'warning',
    statusLabel: 'MONITORING',
    image: lab2,
    activeAgents: 2,
    lastUpdate: 'Just now',
    zoneType: 'Biosafety Lab',
  },
  {
    id: 'cam-04',
    name: 'CAM 04',
    sector: 'Sector 4',
    status: 'critical',
    statusLabel: 'COMPROMISED',
    image: processing1,
    activeAgents: 4,
    lastUpdate: 'Just now',
    zoneType: 'Processing Line',
  },
  {
    id: 'cam-05',
    name: 'CAM 05',
    sector: 'Sector 5',
    status: 'safe',
    statusLabel: 'STERILE',
    image: lab3,
    activeAgents: 1,
    lastUpdate: '5 min ago',
    zoneType: 'Research Lab',
  },
  {
    id: 'cam-06',
    name: 'CAM 06',
    sector: 'Sector 6',
    status: 'safe',
    statusLabel: 'STERILE',
    image: storage1,
    activeAgents: 0,
    lastUpdate: '3 min ago',
    zoneType: 'Cold Storage',
  },
];

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    time: '10:42',
    message: 'Cross-contamination detected in Sector 4',
    status: 'critical',
    cameraId: 'cam-04',
  },
  {
    id: 'alert-2',
    time: '10:38',
    message: 'Elevated particle count in Sector 3',
    status: 'warning',
    cameraId: 'cam-03',
  },
  {
    id: 'alert-3',
    time: '10:35',
    message: 'Personnel entered without PPE verification',
    status: 'warning',
    cameraId: 'cam-04',
  },
  {
    id: 'alert-4',
    time: '10:22',
    message: 'Air pressure differential restored',
    status: 'safe',
    cameraId: 'cam-01',
  },
  {
    id: 'alert-5',
    time: '10:15',
    message: 'Routine sanitization complete',
    status: 'safe',
    cameraId: 'cam-02',
  },
  {
    id: 'alert-6',
    time: '09:58',
    message: 'Temperature fluctuation detected',
    status: 'warning',
    cameraId: 'cam-06',
  },
];

export const predictiveRisks: PredictiveRisk[] = [
  {
    id: 'risk-1',
    probability: 78,
    description: 'High contamination risk due to processing line breach',
    sector: 'Sector 4',
    timeframe: 'Next 2 hours',
  },
  {
    id: 'risk-2',
    probability: 45,
    description: 'Particle count trending upward, may exceed threshold',
    sector: 'Sector 3',
    timeframe: 'Next 4 hours',
  },
  {
    id: 'risk-3',
    probability: 23,
    description: 'Scheduled maintenance may impact sterility',
    sector: 'Sector 1',
    timeframe: 'Tomorrow',
  },
  {
    id: 'risk-4',
    probability: 12,
    description: 'Minor temperature variance predicted',
    sector: 'Sector 6',
    timeframe: 'Next 6 hours',
  },
];
