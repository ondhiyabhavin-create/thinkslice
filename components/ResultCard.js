import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Calendar, Layers } from 'lucide-react'

export default function ResultCard({ item }){
  const [imageError, setImageError] = useState(false)
  
  return (
    <Link href={`/view/${item.id}`} className="block group">
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="relative h-full flex flex-col rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-accent2/20">
          {!imageError ? (
            <img
              src={item.thumbnails[0]}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/30 to-accent2/30">
              <div className="text-center">
                <Layers className="text-accent/50 mx-auto mb-2" size={32} />
                <p className="text-xs text-gray-400">{item.rock_type}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <span className="inline-flex items-center gap-1 text-white text-sm font-semibold">
              View Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-accent transition min-h-[3.5rem]">
            {item.name}
          </h3>

          {/* Metadata */}
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-400 line-clamp-1">
              {item.formation} • <span className="text-accent">{item.rock_type}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={14} />
              <span>{new Date(item.scan_date).getFullYear()}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
            <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold border border-accent/30">
              {(item.size_bytes/1e6).toFixed(0)} MB
            </div>
            {item.minerals && item.minerals.slice(0, 1).map((mineral, idx) => (
              <div key={idx} className="px-3 py-1 bg-accent2/20 text-accent2 rounded-full text-xs font-semibold border border-accent2/30">
                {mineral}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.tags && item.tags.slice(0, 2).length > 0 ? (
              item.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="px-2 py-1 bg-transparent text-transparent rounded text-xs">placeholder</span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent2 to-accent3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </motion.div>
    </Link>
  )
}
