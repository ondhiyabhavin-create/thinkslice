import { motion } from 'framer-motion'

export function SkeletonText({ width = '100%', height = '20px', className = '' }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ width, height }}
      className={`rounded-md bg-gradient-to-r from-white/10 to-white/5 ${className}`}
    />
  )
}

export function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden"
    >
      <div className="aspect-video bg-gradient-to-r from-white/10 to-white/5" />
      <div className="p-5 space-y-3">
        <SkeletonText width="80%" height="20px" />
        <SkeletonText width="100%" height="16px" />
        <SkeletonText width="60%" height="16px" />
        <div className="flex gap-2 pt-2">
          <SkeletonText width="25%" height="24px" />
          <SkeletonText width="25%" height="24px" />
        </div>
      </div>
    </motion.div>
  )
}

export function SkeletonDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <SkeletonText width="60%" height="40px" className="mb-4" />
        <div className="flex flex-wrap items-center gap-4">
          <SkeletonText width="30%" height="18px" />
          <SkeletonText width="20%" height="18px" />
          <SkeletonText width="15%" height="32px" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Image Viewer */}
        <div className="lg:col-span-2">
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 h-96 mb-6"
          />

          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 p-6 h-80"
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 space-y-3"
            >
              <SkeletonText width="50%" height="20px" />
              <SkeletonText width="100%" height="16px" />
              <SkeletonText width="100%" height="16px" />
              <SkeletonText width="70%" height="16px" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {[1, 2].map((idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 space-y-4"
          >
            <SkeletonText width="40%" height="24px" />
            <SkeletonText width="100%" height="16px" />
            <SkeletonText width="100%" height="16px" />
            <SkeletonText width="80%" height="16px" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonSearchGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  )
}
