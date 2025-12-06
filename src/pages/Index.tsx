import { Header } from '@/components/dashboard/Header';
import { ScenarioSystemOverview } from '@/components/scenario/ScenarioSystemOverview';
import { ContaminationMetrics } from '@/components/scenario/ContaminationMetrics';
import { Sidebar } from '@/components/dashboard/Sidebar';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Main Stage - Scenario Overview (75%) */}
        <main className="flex-1 p-4 lg:p-6 min-w-0 flex flex-col">
          <ContaminationMetrics />
          <ScenarioSystemOverview />
        </main>

        {/* Intelligence Sidebar (25%) */}
        <div className="w-72 lg:w-80 xl:w-96 flex-shrink-0 hidden md:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;
