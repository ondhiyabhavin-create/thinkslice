import { useEffect, useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { getGeologicalData } from '../lib/geologicalData'
import { SkeletonText, SkeletonCard, SkeletonSearchGrid } from '../components/SkeletonLoader'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp } from 'lucide-react'

export default function Search(){
  const [records, setRecords] = useState([])
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(20)
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')

  useEffect(()=>{
    let mounted = true
    ;(async ()=>{
      setLoading(true)
      // Simulate network delay
      await new Promise(r => setTimeout(r, 600))
      const data = await getGeologicalData()
      if (mounted) {
        setRecords(data)
        setLoading(false)
      }
    })()
    return ()=> mounted = false
  }, [])

  const suggestions = useMemo(()=>{
    const tags = new Set()
    records.forEach(r=>r.tags && r.tags.slice(0,5).forEach(t=>tags.add(t)))
    return Array.from(tags)
  }, [records])

  const filtered = records.filter(r => {
    if (!query && filterType === 'all') return true
    const q = query.toLowerCase()
    const matchesQuery = !query || 
      r.name.toLowerCase().includes(q) || 
      r.formation.toLowerCase().includes(q) || 
      r.location.toLowerCase().includes(q) || 
      (r.minerals||[]).join(' ').toLowerCase().includes(q) ||
      r.rock_type.toLowerCase().includes(q)
    
    const matchesFilter = filterType === 'all' || r.rock_type.toLowerCase().includes(filterType.toLowerCase())
    
    return matchesQuery && matchesFilter
  })

  const rockTypes = useMemo(() => {
    const types = new Set()
    records.forEach(r => {
      const primary = r.rock_type.split('-')[0].trim()
      types.add(primary)
    })
    return Array.from(types).sort()
  }, [records])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="text-accent" size={28} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Geological Database</h1>
          </div>
          <p className="text-gray-400 text-lg">Browse {records.length} premium thin-section samples with comprehensive geological analysis</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar onSearch={setQuery} suggestions={suggestions} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-accent text-white shadow-lg shadow-accent/50'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Types
          </button>
          {rockTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filterType === type
                  ? 'bg-accent text-white shadow-lg shadow-accent/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Samples', value: records.length, icon: TrendingUp },
            { label: 'Filtered Results', value: filtered.length, icon: MapPin },
            { label: 'Avg File Size', value: '110 MB', icon: TrendingUp },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"
              >
                <Icon className="text-accent mx-auto mb-2" size={20} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-white">
              {query ? `Search Results` : 'All Samples'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {loading ? 'Loading...' : `${filtered.length} ${query ? 'matching' : 'total'} samples`}
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header Skeleton */}
            <div className="mb-8">
              <SkeletonText width="40%" height="32px" className="mb-4" />
              <SkeletonText width="70%" height="18px" />
            </div>

            {/* Search Bar Skeleton */}
            <div className="rounded-xl bg-gradient-to-r from-white/10 to-white/5 h-14 border border-white/10" />

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 h-24"
                />
              ))}
            </div>

            {/* Grid Skeleton */}
            <SkeletonSearchGrid />
          </motion.div>
        )}

        {/* Results Grid */}
        {!loading && filtered.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {filtered.slice(0, visible).map(item => (
              <motion.div key={item.id} variants={itemVariants} className="h-full">
                <ResultCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No samples found for "{query}"</p>
            <p className="text-gray-500 text-sm mt-2">Try a different search term or filter</p>
          </motion.div>
        )}

        {/* Load More */}
        {!loading && visible < filtered.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>setVisible(v=>v+20)}
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all"
            >
              Load More Samples
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
