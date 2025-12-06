import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/dashboard/Header';
import { ArrowRight, Video, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createScenario } from '@/lib/api';

const AddScenario = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    zoneType: '',
    rtspUrl: '',
    contaminationDefinition: '',
    decontaminationDefinition: '',
    specificConcerns: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create scenario via API
      const newScenario = await createScenario({
        name: formData.name,
        location: formData.location,
        zoneType: formData.zoneType,
        rtspUrl: formData.rtspUrl,
        vssConfig: {
          contaminationDefinition: formData.contaminationDefinition,
          decontaminationDefinition: formData.decontaminationDefinition,
          specificConcerns: formData.specificConcerns.split('\n').filter(Boolean),
        },
      });

      toast.success('Scenario created successfully!', {
        description: `${newScenario.name} is now being monitored`,
      });

      // Navigate back to dashboard
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast.error('Failed to create scenario', {
        description: error instanceof Error ? error.message : 'Please check your configuration and try again',
      });
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.location &&
    formData.zoneType &&
    formData.rtspUrl &&
    formData.contaminationDefinition &&
    formData.decontaminationDefinition;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header withBackButton />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-semibold mb-2">Add New Scenario</h1>
            <p className="text-body text-muted-foreground">
              Configure a new contamination detection scenario with NVIDIA VSS
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-safe/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-safe" />
                </div>
                <div>
                  <h2 className="text-title font-semibold">Basic Information</h2>
                  <p className="text-caption text-muted-foreground">Define the scenario details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Scenario Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Prep Kitchen - Station A"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Building 2, Floor 1"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zoneType">Zone Type *</Label>
                  <Input
                    id="zoneType"
                    placeholder="e.g., Food Preparation, Surgical Suite, Laboratory"
                    value={formData.zoneType}
                    onChange={(e) => handleChange('zoneType', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rtspUrl">RTSP Stream URL *</Label>
                  <Input
                    id="rtspUrl"
                    type="url"
                    placeholder="rtsp://camera-ip:554/stream"
                    value={formData.rtspUrl}
                    onChange={(e) => handleChange('rtspUrl', e.target.value)}
                    required
                  />
                  <p className="text-caption text-muted-foreground">
                    Live video feed URL for real-time monitoring
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contamination Definition */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-critical/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <h2 className="text-title font-semibold">Contamination Definition</h2>
                  <p className="text-caption text-muted-foreground">
                    Define what constitutes contamination in this context
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contaminationDefinition">What is "contaminated"? *</Label>
                  <Textarea
                    id="contaminationDefinition"
                    placeholder="e.g., A surface or person becomes contaminated when they come into direct contact with raw chicken, unwashed hands touch food preparation areas, or when proper PPE protocols are violated."
                    value={formData.contaminationDefinition}
                    onChange={(e) => handleChange('contaminationDefinition', e.target.value)}
                    rows={4}
                    required
                  />
                  <p className="text-caption text-muted-foreground">
                    Clear definition helps VSS accurately detect contamination events
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decontamination Definition */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-safe/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-safe" />
                </div>
                <div>
                  <h2 className="text-title font-semibold">Decontamination Process</h2>
                  <p className="text-caption text-muted-foreground">
                    Define how contamination is resolved
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="decontaminationDefinition">How is something "decontaminated"? *</Label>
                  <Textarea
                    id="decontaminationDefinition"
                    placeholder="e.g., Contaminated surfaces must be sanitized with approved cleaning solution and allowed to dry. Personnel must wash hands thoroughly for at least 20 seconds and change gloves before resuming work."
                    value={formData.decontaminationDefinition}
                    onChange={(e) => handleChange('decontaminationDefinition', e.target.value)}
                    rows={4}
                    required
                  />
                  <p className="text-caption text-muted-foreground">
                    VSS will monitor for these decontamination procedures
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Specific Concerns */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-title font-semibold">Specific Concerns</h2>
                  <p className="text-caption text-muted-foreground">
                    What should the model specifically watch for?
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specificConcerns">Key Items to Monitor (one per line)</Label>
                  <Textarea
                    id="specificConcerns"
                    placeholder="Raw chicken handling&#10;Cross-contamination between cutting boards&#10;Glove changes after touching raw materials&#10;Hand washing compliance&#10;Sanitization of work surfaces"
                    value={formData.specificConcerns}
                    onChange={(e) => handleChange('specificConcerns', e.target.value)}
                    rows={6}
                  />
                  <p className="text-caption text-muted-foreground">
                    Enter each concern on a new line for focused monitoring
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center justify-between gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating Scenario...
                  </>
                ) : (
                  <>
                    Create Scenario
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScenario;
