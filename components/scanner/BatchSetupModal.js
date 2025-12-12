import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Scan, Zap } from 'lucide-react'

export default function BatchSetupModal({ isOpen, onClose, onStartScan }) {
  const [numSections, setNumSections] = useState(1)
  const [lightMode, setLightMode] = useState('Both')
  const [resolution, setResolution] = useState('High')

  const handleStart = () => {
    onStartScan({
      numSections,
      lightMode,
      resolution
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-primary/95 via-secondary/95 to-primary/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-accent/20 border border-accent/40">
                <Scan className="text-accent" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white">Configure Scan Batch</h2>
            </div>
            <p className="text-gray-400 mt-2">Set up your scanning parameters for the batch</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Number of Sections */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Number of Thin Sections
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={numSections}
                  onChange={(e) => setNumSections(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="w-20 text-center">
                  <div className="text-2xl font-bold text-accent">{numSections}</div>
                  <div className="text-xs text-gray-400">sections</div>
                </div>
              </div>
            </div>

            {/* Light Mode */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Light Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Plane Light', 'Polarized Light', 'Both'].map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLightMode(mode)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      lightMode === mode
                        ? 'bg-accent/20 border-accent text-white shadow-lg shadow-accent/20'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold">{mode}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Scan Resolution
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'High', desc: 'Standard' },
                  { value: 'Ultra', desc: 'Enhanced' },
                  { value: 'Research Grade', desc: 'Maximum' }
                ].map((res) => (
                  <motion.button
                    key={res.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResolution(res.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      resolution === res.value
                        ? 'bg-accent/20 border-accent text-white shadow-lg shadow-accent/20'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold mb-1">{res.value}</div>
                    <div className="text-xs opacity-75">{res.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Estimated Info */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Estimated Time</div>
                  <div className="text-white font-semibold">
                    {Math.ceil((numSections * (lightMode === 'Both' ? 2 : 1) * (resolution === 'Research Grade' ? 2.5 : resolution === 'Ultra' ? 1.5 : 1)) / 2)} min
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Estimated Size</div>
                  <div className="text-white font-semibold">
                    {(numSections * 25 * (resolution === 'Research Grade' ? 2.5 : resolution === 'Ultra' ? 1.5 : 1)).toFixed(0)} GB
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/50 transition"
              >
                <Zap size={20} />
                Start Scan Batch
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

