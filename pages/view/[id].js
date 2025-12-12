import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { getGeologicalData } from '../../lib/geologicalData'
import TileViewer from '../../components/TileViewer'
import DownloadManager from '../../components/DownloadManager'
import { SkeletonDetailPage } from '../../components/SkeletonLoader'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Award, ExternalLink, Image, BarChart3, Layers, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Viewer(){
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageScrollIndex, setImageScrollIndex] = useState(0)
  const [imagesPerView, setImagesPerView] = useState(3)
  const scrollContainerRef = useRef(null)
  const [mainImageIndex, setMainImageIndex] = useState(0)

  useEffect(() => {
    const updateImagesPerView = () => {
      setImagesPerView(window.innerWidth >= 768 ? 3 : 2)
    }
    updateImagesPerView()
    window.addEventListener('resize', updateImagesPerView)
    return () => window.removeEventListener('resize', updateImagesPerView)
  }, [])

  useEffect(() => {
    // Reset scroll index when item changes
    setImageScrollIndex(0)
    setMainImageIndex(0)
  }, [item])

  // Sync main image index with additional views scroll
  useEffect(() => {
    if (!item || !item.thumbnails || item.thumbnails.length <= 1) return
    const additionalImages = item.thumbnails.slice(1)
    if (additionalImages.length > 0) {
      const newScrollIndex = Math.floor(mainImageIndex / imagesPerView)
      if (newScrollIndex !== imageScrollIndex && newScrollIndex < Math.ceil(additionalImages.length / imagesPerView)) {
        setImageScrollIndex(newScrollIndex)
      }
    }
  }, [mainImageIndex, imagesPerView, item, imageScrollIndex])

  // Keyboard navigation for main image
  useEffect(() => {
    if (!item || !item.thumbnails || item.thumbnails.length <= 1) return
    const additionalImages = item.thumbnails.slice(1)

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && mainImageIndex > 0) {
        setMainImageIndex(prev => prev - 1)
      } else if (e.key === 'ArrowRight' && mainImageIndex < additionalImages.length - 1) {
        setMainImageIndex(prev => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [item, mainImageIndex])

  useEffect(()=>{
    if (!id) return
    ;(async ()=>{
      setLoading(true)
      await new Promise(r => setTimeout(r, 800))
      const data = await getGeologicalData()
      const found = data.find(r => String(r.id) === String(id))
      setItem(found || null)
      setLoading(false)
    })()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary py-12">
        <SkeletonDetailPage />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Sample Not Found</h1>
          <p className="text-gray-400">The requested sample could not be found in the database.</p>
        </div>
      </div>
    )
  }

  // Get additional images (excluding first thumbnail)
  const additionalImages = item.thumbnails && item.thumbnails.length > 1 ? item.thumbnails.slice(1) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary py-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl font-bold text-white mb-2">{item.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={18} /> {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={18} /> {new Date(item.scan_date).getFullYear()}
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">{item.rock_type}</span>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-3 gap-6 lg:gap-6 mb-6"
        >
          {/* Image Viewer */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm mb-4 relative">
              {/* Left Arrow for Main Image */}
              {additionalImages.length > 0 && mainImageIndex > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setMainImageIndex(prev => Math.max(0, prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </motion.button>
              )}

              {/* Main Image Viewer */}
              <motion.div
                key={mainImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TileViewer pyramidBase={additionalImages.length > 0 ? additionalImages[mainImageIndex] : (item.tiled_preview || item.thumbnails[0])} />
              </motion.div>

              {/* Right Arrow for Main Image */}
              {additionalImages.length > 0 && mainImageIndex < additionalImages.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setMainImageIndex(prev => Math.min(additionalImages.length - 1, prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </motion.button>
              )}

              {/* Image Counter */}
              {additionalImages.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg">
                  {mainImageIndex + 1} / {additionalImages.length}
                </div>
              )}
            </div>

            {/* Multiple Images Viewer */}
            {additionalImages.length > 0 ? (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4 lg:p-6 mb-0">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Image size={24} />
                  Additional Views ({additionalImages.length})
                </h3>
                <div className="relative">
                  {/* Left Arrow */}
                  {imageScrollIndex > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setImageScrollIndex(prev => Math.max(0, prev - 1))}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                  )}

                  {/* Scrollable Image Container */}
                  <div className="overflow-hidden" ref={scrollContainerRef}>
                    <motion.div
                      className="flex gap-4"
                      animate={{ 
                        x: `-${imageScrollIndex * (100 / imagesPerView)}%` 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {additionalImages.map((thumb, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, y: -5 }}
                          onClick={() => setMainImageIndex(idx)}
                          className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-all group flex-shrink-0 ${
                            mainImageIndex === idx 
                              ? 'border-accent shadow-lg shadow-accent/50' 
                              : 'border-white/10 hover:border-accent/50'
                          }`}
                          style={{ 
                            width: `calc(${100 / imagesPerView}% - ${(imagesPerView - 1) * 1}rem / ${imagesPerView})`
                          }}
                        >
                          <div className="relative aspect-square">
                            <img 
                              src={thumb} 
                              alt={`Additional view ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                              <span className="text-white text-xs font-semibold">View {idx + 1}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right Arrow */}
                  {imageScrollIndex < Math.ceil(additionalImages.length / imagesPerView) - 1 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setImageScrollIndex(prev => {
                        const maxIndex = Math.ceil(additionalImages.length / imagesPerView) - 1
                        return Math.min(maxIndex, prev + 1)
                      })}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-0">
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 border border-accent/40 mb-4">
                    <Image className="text-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Image Gallery</h3>
                  <p className="text-gray-400 text-sm">
                    Additional views and images will appear here when available
                  </p>
                </div>
              </div>
            )}

            {/* Description and Geological Context - Left Side */}
            <div className="space-y-4 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-3">Geological Context</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Depositional Environment</p>
                    <p className="text-white font-semibold">{item.depositional_environment}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Deformation Features</p>
                    <p className="text-white font-semibold">{item.deformation_features}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Depth</p>
                    <p className="text-white font-semibold">{item.depth_m} meters</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Permeability</p>
                    <p className="text-white font-semibold">{item.permeability_md} mD</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Formation</p>
                  <p className="text-white font-semibold">{item.formation}</p>
                </div>
                <div>
                  <p className="text-gray-400">Age</p>
                  <p className="text-white font-semibold">{item.age_mya} Million Years Ago ({item.geological_age})</p>
                </div>
                <div>
                  <p className="text-gray-400">Grain Size</p>
                  <p className="text-white font-semibold">{item.grain_size_mm} mm</p>
                </div>
                <div>
                  <p className="text-gray-400">Porosity</p>
                  <p className="text-white font-semibold">{item.porosity_percent}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Density</p>
                  <p className="text-white font-semibold">{item.density_g_cm3} g/cm³</p>
                </div>
              </div>
            </motion.div>

            {/* Analysis Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users size={20} /> Analysis & Scanning
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Analyst</p>
                  <p className="text-white font-semibold">{item.analyst}</p>
                </div>
                <div>
                  <p className="text-gray-400">Institution</p>
                  <p className="text-white font-semibold text-xs">{item.institution}</p>
                </div>
                <div>
                  <p className="text-gray-400">Scanner</p>
                  <p className="text-white font-semibold">{item.scanner}</p>
                </div>
                <div>
                  <p className="text-gray-400">Analysis Date</p>
                  <p className="text-white font-semibold">{new Date(item.analysis_date).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Minerals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-white mb-4">Mineral Composition</h3>
              <div className="flex flex-wrap gap-2">
                {item.minerals.map((mineral, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-semibold border border-accent/40">
                    {mineral}
                  </span>
                ))}
              </div>
              {item.derived_metadata && (
                <div className="mt-4 space-y-2 text-xs">
                  {Object.entries(item.derived_metadata).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-semibold">{typeof val === 'number' ? val.toFixed(1) : val}%</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Visual Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={20} />
                Sample Statistics
              </h3>
              <div className="space-y-4">
                {/* Porosity Visual */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Porosity</span>
                    <span className="text-sm font-bold text-white">{item.porosity_percent}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.porosity_percent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
                    />
                  </div>
                </div>

                {/* Density Visual */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Layers size={14} />
                      Density
                    </span>
                    <span className="text-sm font-bold text-white">{item.density_g_cm3} g/cm³</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.density_g_cm3 / 3) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Grain Size Visual */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Zap size={14} />
                      Grain Size
                    </span>
                    <span className="text-sm font-bold text-white">{item.grain_size_mm} mm</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((item.grain_size_mm / 2) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Permeability Badge */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Permeability</span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold border border-accent/40">
                      {item.permeability_md} mD
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DOI & License */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/40"
            >
              <p className="text-xs text-gray-300 mb-2 flex items-center gap-2">
                <Award size={16} /> Citation Information
              </p>
              <p className="text-xs text-white font-mono mb-2">{item.doi}</p>
              <p className="text-xs text-gray-400">{item.usage_rights}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Download Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <DownloadManager formats={item.file_formats} sampleName={item.name} sampleId={item.thin_section_id} />
        </motion.div>

        {/* Citations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 mb-4 p-4 lg:p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center"
        >
          <h4 className="font-bold text-white mb-2">Recommended Citation</h4>
          <p className="text-gray-400 text-sm italic mb-4">{item.citations}</p>
          <p className="text-xs text-gray-500">DOI: <a href={`https://doi.org/${item.doi.split('/')[1]}`} className="text-accent hover:text-accent2 transition" target="_blank" rel="noopener noreferrer">{item.doi}</a></p>
        </motion.div>
      </div>
    </div>
  )
}
