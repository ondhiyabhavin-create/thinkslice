import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle, Loader2 } from 'lucide-react'

const steps = [
  { id: 'calibrating', label: 'Calibrating scanner optics', duration: 2000 },
  { id: 'pl_frames', label: 'Capturing PL frames', duration: 3000 },
  { id: 'xpl_frames', label: 'Capturing XPL frames', duration: 3000 },
  { id: 'tiff_stack', label: 'Generating raw TIFF stack', duration: 4000 },
  { id: 'metadata', label: 'Extracting metadata', duration: 2000 },
  { id: 'thumbnails', label: 'Generating thumbnails', duration: 2500 },
  { id: 'deepzoom', label: 'Preparing DeepZoom tiles', duration: 3500 },
  { id: 'verifying', label: 'Verifying dataset', duration: 2000 },
  { id: 'uploading', label: 'Uploading to repository', duration: 3000 },
  { id: 'checksum', label: 'Final checksum verification', duration: 1500 }
]

export default function ScanStepTimeline({ currentStep, completedSteps = [] }) {
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed'
    if (currentStep === stepId) return 'active'
    return 'pending'
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id)
        const stepIndex = steps.findIndex(s => s.id === step.id)
        const completedIndex = completedSteps.length
        
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-lg backdrop-blur-sm transition-all ${
              status === 'active'
                ? 'bg-accent/20 border border-accent/40 shadow-lg shadow-accent/20'
                : status === 'completed'
                ? 'bg-success/10 border border-success/20'
                : 'bg-white/5 border border-white/10'
            }`}
          >
            {/* Status Icon */}
            <div className="flex-shrink-0">
              {status === 'completed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <CheckCircle className="text-success" size={24} />
                </motion.div>
              ) : status === 'active' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="text-accent" size={24} />
                </motion.div>
              ) : (
                <Circle className="text-gray-500" size={24} />
              )}
            </div>

            {/* Step Label */}
            <div className="flex-1">
              <div className={`font-medium ${
                status === 'active' ? 'text-white' : status === 'completed' ? 'text-success' : 'text-gray-400'
              }`}>
                {step.label}
              </div>
              {status === 'active' && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: step.duration / 1000, ease: 'linear' }}
                  className="h-1 bg-accent/30 rounded-full mt-2"
                />
              )}
            </div>

            {/* Step Number */}
            <div className={`text-xs font-bold ${
              status === 'active' ? 'text-accent' : status === 'completed' ? 'text-success' : 'text-gray-500'
            }`}>
              {String(stepIndex + 1).padStart(2, '0')}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

