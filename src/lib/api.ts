import { Scenario, Alert, SystemMetrics } from '@/types/scenario';
import { scenarios, alerts, calculateSystemMetrics } from '@/data/mockScenarioData';

// API base URL - will be set from environment variable later
// const API_BASE_URL = import.meta.env.VITE_API_URL || null;
const API_BASE_URL = null; // Use mock data for now

/**
 * Fetch all scenarios
 * GET /scenarios
 */
export async function fetchScenarios(): Promise<Scenario[]> {
  if (!API_BASE_URL) {
    // Mock data fallback
    await new Promise(resolve => setTimeout(resolve, 100));
    return scenarios;
  }

  const response = await fetch(`${API_BASE_URL}/scenarios`);
  if (!response.ok) {
    throw new Error('Failed to fetch scenarios');
  }
  return response.json();
}

/**
 * Fetch a single scenario by ID
 * GET /scenarios/:id
 */
export async function fetchScenarioById(id: string): Promise<Scenario | undefined> {
  if (!API_BASE_URL) {
    // Mock data fallback
    await new Promise(resolve => setTimeout(resolve, 100));
    return scenarios.find(s => s.id === id);
  }

  const response = await fetch(`${API_BASE_URL}/scenarios/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch scenario ${id}`);
  }
  return response.json();
}

/**
 * Fetch alerts for a specific scenario
 * GET /scenarios/:id/alerts
 */
export async function fetchScenarioAlerts(scenarioId: string): Promise<Alert[]> {
  if (!API_BASE_URL) {
    // Mock data fallback
    await new Promise(resolve => setTimeout(resolve, 100));
    return alerts.filter(a => a.scenarioId === scenarioId);
  }

  const response = await fetch(`${API_BASE_URL}/scenarios/${scenarioId}/alerts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts for scenario ${scenarioId}`);
  }
  return response.json();
}

/**
 * Fetch system-wide metrics
 * GET /metrics
 */
export async function fetchSystemMetrics(): Promise<SystemMetrics> {
  if (!API_BASE_URL) {
    // Mock data fallback
    await new Promise(resolve => setTimeout(resolve, 100));
    return calculateSystemMetrics(scenarios);
  }

  const response = await fetch(`${API_BASE_URL}/metrics`);
  if (!response.ok) {
    throw new Error('Failed to fetch system metrics');
  }
  return response.json();
}

/**
 * Create a new scenario
 * POST /scenarios
 */
export interface CreateScenarioRequest {
  name: string;
  location: string;
  zoneType: string;
  rtspUrl: string;
  vssConfig: {
    contaminationDefinition: string;
    decontaminationDefinition: string;
    specificConcerns: string[];
  };
}

export async function createScenario(data: CreateScenarioRequest): Promise<Scenario> {
  if (!API_BASE_URL) {
    // Mock data fallback - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real implementation, this would return the created scenario from the API
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: data.name,
      location: data.location,
      zoneType: data.zoneType,
      status: 'safe',
      statusLabel: 'STERILE',
      eventsLast24h: 0,
      eventsCritical: 0,
      eventsWarning: 0,
      lastUpdate: 'Just now',
      videoUrl: data.rtspUrl,
      isActive: true,
      confidence: 95,
    };

    return newScenario;
  }

  const response = await fetch(`${API_BASE_URL}/scenarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create scenario');
  }

  return response.json();
}
