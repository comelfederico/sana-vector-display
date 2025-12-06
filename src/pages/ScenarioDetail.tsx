import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Activity, TrendingUp, Clock } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { ScenarioVideoPlayer } from '@/components/scenario/ScenarioVideoPlayer';
import { ScenarioDetailSidebar } from '@/components/scenario/ScenarioDetailSidebar';
import { useScenarioDetail } from '@/hooks/useScenarioDetail';

const ScenarioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scenario, isLoading } = useScenarioDetail(id || '');

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <Header withBackButton />
        <div className="flex flex-1 min-h-0 p-4 lg:p-6">
          <div className="flex-1 animate-pulse">
            <div className="aspect-video bg-secondary/30 rounded-lg mb-4" />
            <div className="h-32 bg-secondary/30 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!scenario) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <Header withBackButton />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Video & Metadata Section (75%) */}
        <main className="flex-1 p-4 lg:p-6 min-w-0 overflow-y-auto custom-scrollbar">
          {/* Video Player */}
          <div className="mb-6">
            <ScenarioVideoPlayer scenario={scenario} />
          </div>

          {/* Scenario Metadata */}
          <div className="glass-card p-6">
            <h2 className="text-title font-semibold mb-4">Scenario Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-safe" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Location</div>
                  <div className="text-body font-medium">{scenario.location}</div>
                </div>
              </div>

              {/* Zone Type */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-safe" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Zone Type</div>
                  <div className="text-body font-medium">{scenario.zoneType}</div>
                </div>
              </div>

              {/* Events (24h) */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Events (24h)</div>
                  <div className="text-body font-medium">
                    {scenario.eventsLast24h} events
                    {scenario.eventsCritical > 0 && (
                      <span className="ml-2 text-caption text-critical">
                        ({scenario.eventsCritical} critical)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Model Confidence */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-safe" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Model Confidence</div>
                  <div className="text-body font-medium">{scenario.confidence}%</div>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Last Update</div>
                  <div className="text-body font-medium">{scenario.lastUpdate}</div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Activity
                    className={`w-5 h-5 ${
                      scenario.status === 'safe'
                        ? 'text-safe'
                        : scenario.status === 'warning'
                        ? 'text-warning'
                        : 'text-critical'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-caption text-muted-foreground">Current Status</div>
                  <div className="text-body font-medium">{scenario.statusLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Alerts Sidebar (25%) */}
        <div className="w-72 lg:w-80 xl:w-96 flex-shrink-0 hidden md:block">
          <ScenarioDetailSidebar scenarioId={scenario.id} scenarioName={scenario.name} />
        </div>
      </div>
    </div>
  );
};

export default ScenarioDetail;
