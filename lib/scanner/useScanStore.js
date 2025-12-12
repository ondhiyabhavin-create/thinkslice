import { create } from 'zustand'

const useScanStore = create((set, get) => ({
  // Scanner state
  scannerConnected: true,
  scannerModel: 'Zeiss Axioscan 7',
  scannerStatus: 'ready', // ready, scanning, error
  
  // Current scan batch
  currentBatch: null,
  scanProgress: 0,
  currentStep: null,
  scanSteps: [],
  
  // Scan history
  recentScans: [],
  
  // Actions
  setScannerStatus: (status) => set({ scannerStatus: status }),
  
  startBatch: (batchConfig) => {
    set({
      currentBatch: {
        ...batchConfig,
        id: `batch-${Date.now()}`,
        startTime: new Date().toISOString(),
        status: 'scanning'
      },
      scanProgress: 0,
      currentStep: null,
      scanSteps: []
    })
  },
  
  updateProgress: (progress, step) => {
    set({
      scanProgress: progress,
      currentStep: step,
      scanSteps: [...get().scanSteps, { step, progress, timestamp: Date.now() }]
    })
  },
  
  completeScan: (scanData) => {
    const batch = get().currentBatch
    const completedScan = {
      ...batch,
      ...scanData,
      endTime: new Date().toISOString(),
      status: 'completed'
    }
    
    set({
      currentBatch: null,
      scanProgress: 0,
      currentStep: null,
      recentScans: [completedScan, ...get().recentScans].slice(0, 10)
    })
    
    return completedScan
  },
  
  resetScan: () => {
    set({
      currentBatch: null,
      scanProgress: 0,
      currentStep: null,
      scanSteps: []
    })
  }
}))

export default useScanStore

