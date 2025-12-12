import { motion } from 'framer-motion'
import { CheckCircle, Download, Eye, RotateCcw, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ScanComplete({ scanData, onScanAnother }) {
  const router = useRouter()

  const handleViewDataset = () => {
    // Navigate to view page (simulated)
    if (scanData.sections && scanData.sections[0]) {
      router.push(`/view/${scanData.sections[0].id}`).catch(() => {
        // Fallback if route doesn't exist
        window.location.href = `/search`
      })
    } else {
      router.push('/search')
    }
  }

  const handleDownload = () => {
    // Simulate download
    const jsonData = JSON.stringify(scanData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scan-${scanData.batchId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="max-w-3xl w-full"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-success/20 border-4 border-success mb-6 relative">
            <CheckCircle className="text-success" size={64} />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-success/30"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">Scan Complete!</h1>
          <p className="text-xl text-gray-400">All thin sections processed successfully</p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Scan Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Scan Time</div>
              <div className="text-xl font-bold text-white">{scanData.scanTime}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Resolution</div>
              <div className="text-xl font-bold text-white">{scanData.resolution}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Frames</div>
              <div className="text-xl font-bold text-white">{scanData.totalFrames}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Sections</div>
              <div className="text-xl font-bold text-white">{scanData.numSections}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Data Size</div>
              <div className="text-xl font-bold text-white">{scanData.totalSizeGB} GB</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Light Mode</div>
              <div className="text-xl font-bold text-white">{scanData.lightMode}</div>
            </div>
          </div>

          {/* Checksum */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-gray-400 mb-1">Checksum</div>
            <div className="text-xs font-mono text-gray-300 break-all">{scanData.checksum}</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDataset}
            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/50 transition"
          >
            <Eye size={20} />
            View Dataset
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-accent2 text-accent2 font-bold flex items-center justify-center gap-2 hover:bg-accent2/10 transition"
          >
            <Download size={20} />
            Download ({scanData.totalSizeGB} GB)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onScanAnother}
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition"
          >
            <RotateCcw size={20} />
            Scan Another Batch
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

