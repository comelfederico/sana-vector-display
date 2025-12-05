export type CameraStatus = 'safe' | 'warning' | 'critical';

export interface Camera {
  id: string;
  name: string;
  sector: string;
  status: CameraStatus;
  statusLabel: string;
  image: string;
  activeAgents: number;
  lastUpdate: string;
  zoneType: string;
}

export interface Alert {
  id: string;
  time: string;
  message: string;
  status: CameraStatus;
  cameraId: string;
}

export interface PredictiveRisk {
  id: string;
  probability: number;
  description: string;
  sector: string;
  timeframe: string;
}
