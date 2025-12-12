import { motion } from 'framer-motion'
import { useState } from 'react'
import { Scan, Zap, CheckCircle, Clock, HardDrive } from 'lucide-react'
import BatchSetupModal from './BatchSetupModal'
import useScanStore from '../../lib/scanner/useScanStore'

export default function ScannerDashboard({ onStartScan }) {
  const [showModal, setShowModal] = useState(false)
  const scannerConnected = useScanStore(state => state.scannerConnected)
  const scannerModel = useScanStore(state => state.scannerModel)
  const recentScans = useScanStore(state => state.recentScans)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Scanner Dashboard</h1>
          <p className="text-gray-400">Manage and monitor your thin section scanning operations</p>
        </motion.div>

        {/* Scanner Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  boxShadow: scannerConnected
                    ? ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)']
                    : []
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`p-4 rounded-xl ${
                  scannerConnected
                    ? 'bg-success/20 border-2 border-success'
                    : 'bg-gray-500/20 border-2 border-gray-500'
                }`}
              >
                <Scan className={scannerConnected ? 'text-success' : 'text-gray-500'} size={32} />
              </motion.div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Scanner Status</div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  {scannerConnected ? (
                    <>
                      <CheckCircle className="text-success" size={20} />
                      Connected
                    </>
                  ) : (
                    'Disconnected'
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">{scannerModel}</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              disabled={!scannerConnected}
              className={`px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition ${
                scannerConnected
                  ? 'bg-gradient-to-r from-accent to-accent2 text-white hover:shadow-lg hover:shadow-accent/50'
                  : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Zap size={24} />
              Start Scan Batch
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recent Scans</h2>
          {recentScans.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <Scan className="text-gray-500 mx-auto mb-4" size={48} />
              <p className="text-gray-400">No scans yet. Start your first batch to begin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={scan.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Batch ID</div>
                      <div className="text-lg font-bold text-white">{scan.batchId || scan.id}</div>
                    </div>
                    <CheckCircle className="text-success" size={24} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} />
                      {scan.scanTime || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <HardDrive size={16} />
                      {scan.totalSizeGB || 'N/A'} GB
                    </div>
                    <div className="text-sm text-gray-400">
                      {scan.numSections || 0} section{scan.numSections !== 1 ? 's' : ''} • {scan.resolution || 'N/A'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Batch Setup Modal */}
        <BatchSetupModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onStartScan={onStartScan}
        />
      </div>
    </div>
  )
}

