import { Scenario, Alert, SystemMetrics } from "@/types/scenario";

export const scenarios: Scenario[] = [
  {
    id: "scenario-01",
    name: "Norssken Kitchen",
    location: "Norssken House",
    zoneType: "Food handling",
    status: "safe",
    statusLabel: "STERILE",
    eventsLast24h: 2,
    eventsCritical: 0,
    eventsWarning: 0,
    lastUpdate: "2 min ago",
    videoUrl: "/src/data/IMG_7007.mp4",
    isActive: true,
    confidence: 94,
  },
  {
    id: "scenario-02",
    name: "Surgical Suite B",
    location: "Hospital Wing, Floor 3",
    zoneType: "Operating Room",
    status: "safe",
    statusLabel: "STERILE",
    eventsLast24h: 1,
    eventsCritical: 0,
    eventsWarning: 0,
    lastUpdate: "1 min ago",
    videoUrl: "/src/data/IMG_6733.mp4",
    isActive: true,
    confidence: 98,
  },
  {
    id: "scenario-03",
    name: "Lab Workstation C",
    location: "Research Center, Floor 2",
    zoneType: "Biosafety Lab",
    status: "warning",
    statusLabel: "MONITORING",
    eventsLast24h: 5,
    eventsCritical: 0,
    eventsWarning: 2,
    lastUpdate: "Just now",
    videoUrl: "/src/data/IMG_6733.mp4",
    isActive: true,
    confidence: 87,
  },
  {
    id: "scenario-04",
    name: "Processing Line D",
    location: "Production Facility, Floor 1",
    zoneType: "Food Processing",
    status: "critical",
    statusLabel: "CONTAMINATED",
    eventsLast24h: 8,
    eventsCritical: 3,
    eventsWarning: 2,
    lastUpdate: "Just now",
    videoUrl: "/src/data/IMG_6733.mp4",
    isActive: true,
    confidence: 76,
  },
  {
    id: "scenario-05",
    name: "Clean Room E",
    location: "Pharmaceutical, Floor 4",
    zoneType: "Sterile Manufacturing",
    status: "safe",
    statusLabel: "STERILE",
    eventsLast24h: 0,
    eventsCritical: 0,
    eventsWarning: 0,
    lastUpdate: "5 min ago",
    videoUrl: "/src/data/IMG_6733.mp4",
    isActive: true,
    confidence: 99,
  },
  {
    id: "scenario-06",
    name: "Storage Zone F",
    location: "Warehouse, Floor 1",
    zoneType: "Cold Storage",
    status: "safe",
    statusLabel: "STERILE",
    eventsLast24h: 1,
    eventsCritical: 0,
    eventsWarning: 0,
    lastUpdate: "3 min ago",
    videoUrl: "/src/data/IMG_6733.mp4",
    isActive: true,
    confidence: 92,
  },
];

export const alerts: Alert[] = [
  {
    id: "alert-01",
    scenarioId: "scenario-04",
    timestamp: "10:42:18",
    message: "Raw chicken contact detected on preparation surface",
    status: "critical",
    eventType: "cross_contamination",
    isRead: false,
  },
  {
    id: "alert-02",
    scenarioId: "scenario-04",
    timestamp: "10:38:22",
    message: "Personnel touched contaminated zone without glove change",
    status: "critical",
    eventType: "direct_contact",
    isRead: false,
  },
  {
    id: "alert-03",
    scenarioId: "scenario-03",
    timestamp: "10:35:15",
    message: "Work surface contact after raw material handling",
    status: "warning",
    eventType: "cross_contamination",
    isRead: false,
  },
  {
    id: "alert-04",
    scenarioId: "scenario-04",
    timestamp: "10:28:45",
    message: "Zone breach detected - unauthorized area entry",
    status: "critical",
    eventType: "zone_breach",
    isRead: true,
  },
  {
    id: "alert-05",
    scenarioId: "scenario-03",
    timestamp: "10:22:10",
    message: "PPE verification failed - improper glove usage",
    status: "warning",
    eventType: "ppe_violation",
    isRead: true,
  },
  // {
  //   id: "alert-99",
  //   scenarioId: "scenario-01",
  //   timestamp: "0:24",
  //   message: "Individual 3 handling food",
  //   status: "warning",
  //   isRead: true,
  // },
  // {
  //   id: "alert-98",
  //   scenarioId: "scenario-01",
  //   timestamp: "0:35",
  //   message: "Contamination: individual 3 transfers to individual 1",
  //   status: "critical",
  //   eventType: "cross_contamination",
  //   isRead: true,
  // },
  // {
  //   id: "alert-97",
  //   scenarioId: "scenario-01",
  //   timestamp: "0:37",
  //   message: "Contamination: individual 3 transfers to individual 1",
  //   status: "critical",
  //   eventType: "cross_contamination",
  //   isRead: true,
  // },
  {
    id: "alert-07",
    scenarioId: "scenario-02",
    timestamp: "09:58:12",
    message: "Sterile field maintained - no violations detected",
    status: "safe",
    isRead: true,
  },
  {
    id: "alert-08",
    scenarioId: "scenario-06",
    timestamp: "09:45:55",
    message: "Temperature and sanitation levels within acceptable range",
    status: "safe",
    isRead: true,
  },
];

export function calculateSystemMetrics(scenarios: Scenario[]): SystemMetrics {
  const totalScenarios = scenarios.length;
  const activeScenarios = scenarios.filter((s) => s.isActive).length;
  const scenariosSafe = scenarios.filter((s) => s.status === "safe").length;
  const scenariosWarning = scenarios.filter(
    (s) => s.status === "warning"
  ).length;
  const scenariosCritical = scenarios.filter(
    (s) => s.status === "critical"
  ).length;
  const totalEventsToday = scenarios.reduce(
    (sum, s) => sum + s.eventsLast24h,
    0
  );
  const criticalEventsToday = scenarios.reduce(
    (sum, s) => sum + s.eventsCritical,
    0
  );

  return {
    totalScenarios,
    activeScenarios,
    scenariosSafe,
    scenariosWarning,
    scenariosCritical,
    totalEventsToday,
    criticalEventsToday,
  };
}
