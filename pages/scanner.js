import { useState, useEffect } from 'react'
import Head from 'next/head'
import ScannerDashboard from '../components/scanner/ScannerDashboard'
import ScanSimulationScreen from '../components/scanner/ScanSimulationScreen'
import ScanComplete from '../components/scanner/ScanComplete'
import { generateFakeScanData, saveScanToLocal } from '../lib/scanner/generateFakeScanData'
import useScanStore from '../lib/scanner/useScanStore'

export default function ScannerPage() {
  // Load recent scans from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('thinslice_scans')
      if (stored) {
        const scans = JSON.parse(stored)
        // Update store with recent scans (limit to 10)
        useScanStore.setState({ recentScans: scans.slice(0, 10) })
      }
    } catch (e) {
      console.error('Failed to load scans from localStorage', e)
    }
  }, [])
  const [currentView, setCurrentView] = useState('dashboard') // dashboard, scanning, complete
  const [batchConfig, setBatchConfig] = useState(null)
  const [scanData, setScanData] = useState(null)
  const startBatch = useScanStore(state => state.startBatch)
  const completeScan = useScanStore(state => state.completeScan)
  const resetScan = useScanStore(state => state.resetScan)

  const handleStartScan = (config) => {
    setBatchConfig(config)
    startBatch(config)
    setCurrentView('scanning')
  }

  const handleScanComplete = () => {
    // Generate fake scan data
    const fakeData = generateFakeScanData(batchConfig)
    
    // Save to store
    const completed = completeScan(fakeData)
    
    // Save to localStorage
    saveScanToLocal(fakeData)
    
    // Set scan data and show complete screen
    setScanData(fakeData)
    setCurrentView('complete')
  }

  const handleScanAnother = () => {
    resetScan()
    setBatchConfig(null)
    setScanData(null)
    setCurrentView('dashboard')
  }

  return (
    <>
      <Head>
        <title>Scanner Dashboard — ThinSLICE</title>
      </Head>
      
      {currentView === 'dashboard' && (
        <ScannerDashboard onStartScan={handleStartScan} />
      )}
      
      {currentView === 'scanning' && batchConfig && (
        <ScanSimulationScreen
          batchConfig={batchConfig}
          onComplete={handleScanComplete}
        />
      )}
      
      {currentView === 'complete' && scanData && (
        <ScanComplete
          scanData={scanData}
          onScanAnother={handleScanAnother}
        />
      )}
    </>
  )
}

