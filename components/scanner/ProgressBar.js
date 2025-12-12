import { motion } from 'framer-motion'

export default function ProgressBar({ progress, label, showPercentage = true }) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-accent">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-accent via-accent2 to-accent3 rounded-full relative overflow-hidden"
        >
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
          />
        </motion.div>
      </div>
    </div>
  )
}

