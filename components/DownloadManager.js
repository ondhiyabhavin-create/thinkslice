import { motion } from 'framer-motion'
import { Download, FileText, Package, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function DownloadManager({ formats, sampleName, sampleId }) {
  const [downloads, setDownloads] = useState({})
  const [selectedFormats, setSelectedFormats] = useState(new Set())

  const toggleFormat = (formatName) => {
    const newSelected = new Set(selectedFormats)
    if (newSelected.has(formatName)) {
      newSelected.delete(formatName)
    } else {
      newSelected.add(formatName)
    }
    setSelectedFormats(newSelected)
  }

  const handleDownload = async (format) => {
    setDownloads(prev => ({ ...prev, [format.name]: 'downloading' }))
    
    // Simulate download with progress
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create a blob and trigger download
    const element = document.createElement('a')
    const file = new Blob(['Sample: ' + sampleName + '\nFormat: ' + format.name], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${sampleId}-${format.name.replace(/\s+/g, '-')}.zip`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setDownloads(prev => ({ ...prev, [format.name]: 'completed' }))
    setTimeout(() => {
      setDownloads(prev => {
        const updated = { ...prev }
        delete updated[format.name]
        return updated
      })
    }, 3000)
  }

  const handleBulkDownload = async () => {
    if (selectedFormats.size === 0) return

    setDownloads(prev => ({ ...prev, bulk: 'downloading' }))
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Create bulk download
    const selectedFilesInfo = formats
      .filter(f => selectedFormats.has(f.name))
      .map(f => `${f.name}: ${f.size} (${f.format})`)
      .join('\n')

    const element = document.createElement('a')
    const file = new Blob([
      `ThinSLICE Sample Download Package\n`,
      `Sample: ${sampleName}\n`,
      `Sample ID: ${sampleId}\n`,
      `Downloaded: ${new Date().toISOString()}\n\n`,
      `Included Files:\n${selectedFilesInfo}`
    ], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${sampleId}-bulk-download.zip`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setDownloads(prev => ({ ...prev, bulk: 'completed' }))
    setSelectedFormats(new Set())
    setTimeout(() => {
      setDownloads(prev => {
        const updated = { ...prev }
        delete updated.bulk
        return updated
      })
    }, 3000)
  }

  return (
    <div className="w-full space-y-4">
      {/* Available Formats */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
          <Package className="text-accent" size={28} />
          Available Download Formats
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formats.map((format, idx) => {
            const isDownloading = downloads[format.name] === 'downloading'
            const isCompleted = downloads[format.name] === 'completed'
            const isSelected = selectedFormats.has(format.name)

            return (
              <motion.div
                key={idx}
                whileHover={!isDownloading ? { y: -4 } : {}}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-accent/20 border-accent'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                onClick={() => !isDownloading && toggleFormat(format.name)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{format.name}</h4>
                    <p className="text-sm text-gray-400">
                      {format.size} • {format.format}{format.dpi && format.dpi !== 'N/A' ? ` • ${format.dpi} DPI` : ''}
                    </p>
                    {format.format === 'CZI' && (
                      <p className="text-xs text-accent mt-1 flex items-center gap-1">
                        <ExternalLink size={12} />
                        <a 
                          href="https://www.zeiss.com/microscopy/us/products/software/zeiss-zen/czi-image-file-format.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline"
                        >
                          Learn about CZI format
                        </a>
                      </p>
                    )}
                  </div>
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-accent border-accent'
                      : 'border-gray-400'
                  }`}>
                    {isSelected && <div className="w-3 h-3 bg-white rounded-sm"></div>}
                  </div>
                </div>

                {/* Individual Download Button */}
                {!isDownloading && !isCompleted && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(format)
                    }}
                    className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-accent to-accent2 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                )}

                {/* Downloading State */}
                {isDownloading && (
                  <div className="mt-3 w-full">
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                        className="h-full bg-gradient-to-r from-accent to-accent2"
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Downloading...</p>
                  </div>
                )}

                {/* Completed State */}
                {isCompleted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 flex items-center justify-center gap-2 text-success"
                  >
                    <CheckCircle size={18} />
                    <span className="text-sm font-semibold">Downloaded</span>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bulk Download */}
      {selectedFormats.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-r from-accent/20 via-accent2/20 to-accent3/20 border border-accent/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white mb-1">Bulk Download Package</h4>
              <p className="text-sm text-gray-300">
                {selectedFormats.size} file{selectedFormats.size !== 1 ? 's' : ''} selected
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBulkDownload}
              disabled={downloads.bulk === 'downloading'}
              className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                downloads.bulk === 'downloading'
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-success to-accent text-white hover:shadow-lg hover:shadow-success/30'
              }`}
            >
              {downloads.bulk === 'downloading' ? (
                <>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Download size={20} />
                  </motion.div>
                  Preparing...
                </>
              ) : downloads.bulk === 'completed' ? (
                <>
                  <CheckCircle size={20} />
                  Downloaded
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download All ({selectedFormats.size})
                </>
              )}
            </motion.button>
          </div>

          {downloads.bulk === 'downloading' && (
            <div className="mt-4 w-full">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                  className="h-full bg-gradient-to-r from-success to-accent"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Preparing your download package...</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-xl bg-info/10 border border-accent/30 flex items-start gap-3"
      >
        <AlertCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm">
          <p className="text-white font-semibold mb-1">Download Information</p>
          <ul className="text-gray-400 space-y-1 text-xs">
            <li>• All files include complete metadata and geospatial information</li>
            <li>• GeoTIFF format is optimized for GIS software compatibility</li>
            <li>• Files are licensed under Creative Commons Attribution 4.0</li>
            <li>• Download speeds are simulated; actual speeds depend on your connection</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
