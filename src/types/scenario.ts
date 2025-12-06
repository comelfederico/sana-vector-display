export type ScenarioStatus = 'safe' | 'warning' | 'critical';

export interface Scenario {
  id: string;
  name: string;
  location: string;
  zoneType: string;
  status: ScenarioStatus;
  statusLabel: string;
  eventsLast24h: number;
  eventsCritical: number;
  eventsWarning: number;
  lastUpdate: string;
  videoUrl: string;
  isActive: boolean;
  confidence: number;
}

export interface Alert {
  id: string;
  scenarioId: string;
  timestamp: string;
  message: string;
  status: ScenarioStatus;
  eventType?: 'direct_contact' | 'cross_contamination' | 'zone_breach' | 'ppe_violation';
  isRead: boolean;
}

export interface SystemMetrics {
  totalScenarios: number;
  activeScenarios: number;
  scenariosSafe: number;
  scenariosWarning: number;
  scenariosCritical: number;
  totalEventsToday: number;
  criticalEventsToday: number;
}
