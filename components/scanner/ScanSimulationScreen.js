import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scan, Zap } from 'lucide-react'
import ProgressBar from './ProgressBar'
import ScanStepTimeline from './ScanStepTimeline'
import useScanStore from '../../lib/scanner/useScanStore'

const scanSteps = [
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

export default function ScanSimulationScreen({ batchConfig, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const updateProgress = useScanStore(state => state.updateProgress)

  useEffect(() => {
    let totalDuration = scanSteps.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0
    let stepIndex = 0

    const interval = setInterval(() => {
      elapsed += 100
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)
      updateProgress(newProgress, scanSteps[stepIndex]?.id)

      // Check if we should move to next step
      let stepElapsed = 0
      for (let i = 0; i <= stepIndex; i++) {
        stepElapsed += scanSteps[i]?.duration || 0
      }

      if (elapsed >= stepElapsed && stepIndex < scanSteps.length - 1) {
        setCompletedSteps(prev => [...prev, scanSteps[stepIndex].id])
        stepIndex++
        setCurrentStepIndex(stepIndex)
      }

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, scanSteps[stepIndex].id])
          onComplete()
        }, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 border border-accent/40 mb-4"
          >
            <Scan className="text-accent" size={40} />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Scanning in Progress</h1>
          <p className="text-gray-400">
            Processing {batchConfig.numSections} thin section{batchConfig.numSections > 1 ? 's' : ''} • {batchConfig.resolution} • {batchConfig.lightMode}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ProgressBar progress={progress} />
        </motion.div>

        {/* Scanner Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-8">
            {/* Scanner Line Art Animation */}
            <div className="relative">
              <div className="w-32 h-32 border-2 border-accent/40 rounded-lg relative overflow-hidden">
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/40 to-accent/20"
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="text-accent" size={48} />
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-4 border-2 border-accent/30 rounded-lg"
              />
            </div>

            {/* Status Info */}
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-2">Current Operation</div>
              <div className="text-xl font-bold text-white mb-1">
                {scanSteps[currentStepIndex]?.label || 'Initializing...'}
              </div>
              <div className="text-sm text-gray-400">
                Step {currentStepIndex + 1} of {scanSteps.length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ScanStepTimeline
            currentStep={scanSteps[currentStepIndex]?.id}
            completedSteps={completedSteps}
          />
        </motion.div>
      </div>
    </div>
  )
}

