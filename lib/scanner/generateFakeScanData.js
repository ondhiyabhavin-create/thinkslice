// Generate fake scan data for simulation

const rockTypes = ['Sandstone', 'Limestone', 'Granite', 'Basalt', 'Shale', 'Marble', 'Quartzite']
const formations = ['Bakken', 'Eagle Ford', 'Permian', 'Marcellus', 'Haynesville', 'Utica']
const minerals = [
  ['Quartz', 'Feldspar', 'Mica'],
  ['Calcite', 'Dolomite', 'Quartz'],
  ['Quartz', 'Feldspar', 'Biotite'],
  ['Plagioclase', 'Pyroxene', 'Olivine'],
  ['Clay', 'Quartz', 'Feldspar']
]

export function generateFakeScanData(batchConfig) {
  const numSections = batchConfig.numSections || 1
  const lightMode = batchConfig.lightMode || 'Both'
  const resolution = batchConfig.resolution || 'High'
  
  // Calculate data sizes based on resolution
  const sizeMultipliers = {
    'High': 1,
    'Ultra': 1.5,
    'Research Grade': 2.5
  }
  const baseSizeGB = 25 // Base size per section
  const totalSizeGB = baseSizeGB * numSections * sizeMultipliers[resolution]
  
  // Calculate number of frames
  const framesPerMode = {
    'Plane Light': 1,
    'Polarized Light': 1,
    'Both': 2
  }
  const totalFrames = numSections * framesPerMode[lightMode]
  
  // Generate metadata for each section
  const sections = Array.from({ length: numSections }, (_, i) => {
    const rockType = rockTypes[Math.floor(Math.random() * rockTypes.length)]
    const formation = formations[Math.floor(Math.random() * formations.length)]
    const sectionMinerals = minerals[Math.floor(Math.random() * minerals.length)]
    
    return {
      id: `section-${Date.now()}-${i}`,
      thinSectionId: `TS-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
      name: `${formation} ${rockType} Sample ${i + 1}`,
      rockType,
      formation,
      minerals: sectionMinerals,
      location: {
        lat: 30.2672 + (Math.random() - 0.5) * 0.1,
        lng: -97.7431 + (Math.random() - 0.5) * 0.1,
        state: 'Texas',
        county: 'Travis'
      },
      scanDate: new Date().toISOString(),
      scanner: 'Zeiss Axioscan 7',
      resolution,
      lightMode,
      metadata: {
        grainSize: `${(Math.random() * 2 + 0.1).toFixed(2)} mm`,
        porosity: `${(Math.random() * 15 + 2).toFixed(1)}%`,
        texture: ['Fine-grained', 'Medium-grained', 'Coarse-grained'][Math.floor(Math.random() * 3)],
        color: ['Gray', 'Brown', 'Red', 'White', 'Black'][Math.floor(Math.random() * 5)]
      }
    }
  })
  
  return {
    batchId: `batch-${Date.now()}`,
    numSections,
    lightMode,
    resolution,
    totalSizeGB: totalSizeGB.toFixed(2),
    totalFrames,
    sections,
    scanTime: `${(Math.random() * 15 + 15).toFixed(1)}s`,
    checksum: `sha256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    timestamp: new Date().toISOString()
  }
}

export function saveScanToLocal(scanData) {
  // Save to localStorage for persistence
  try {
    const existing = JSON.parse(localStorage.getItem('thinslice_scans') || '[]')
    existing.push(scanData)
    localStorage.setItem('thinslice_scans', JSON.stringify(existing))
  } catch (e) {
    console.error('Failed to save scan to localStorage', e)
  }
  
  // Return JSON string for file download simulation
  return JSON.stringify(scanData, null, 2)
}

