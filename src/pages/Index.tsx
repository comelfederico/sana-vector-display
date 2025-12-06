import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { ScenarioSystemOverview } from '@/components/scenario/ScenarioSystemOverview';
import { ContaminationMetrics } from '@/components/scenario/ContaminationMetrics';
import { Sidebar } from '@/components/dashboard/Sidebar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Main Stage - Scenario Overview (75%) */}
        <main className="flex-1 p-4 lg:p-6 min-w-0 flex flex-col relative">
          <ContaminationMetrics />
          <ScenarioSystemOverview />

          {/* Floating Action Button */}
          <motion.button
            onClick={() => navigate('/scenario/new')}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-safe to-safe/80 hover:from-safe/90 hover:to-safe/70 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-50 group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-6 h-6 text-background" />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-secondary/90 backdrop-blur-sm rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Add Scenario
            </span>
          </motion.button>
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
