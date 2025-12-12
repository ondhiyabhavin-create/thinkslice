import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SearchBar({ onSearch, suggestions = [], compact = false }) {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => onSearch(q), 400)
    return () => clearTimeout(t)
  }, [q, onSearch])

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Search Input */}
        <div className={`relative flex items-center ${compact ? 'rounded-lg border' : 'rounded-xl border-2'} transition-all duration-300 backdrop-blur-sm ${
          focused
            ? 'border-accent bg-white/10 shadow-lg shadow-accent/30'
            : 'border-white/20 bg-white/5 hover:bg-white/10'
        }`}>
          <Search className={`absolute text-accent ${compact ? 'left-3' : 'left-4'}`} size={compact ? 18 : 22} />
          <input
            id="q"
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={compact ? "Search stones, formations..." : "Search by name, formation, minerals, rock type..."}
            className={`w-full bg-transparent ${compact ? 'pl-9 pr-8 py-2 text-sm' : 'pl-12 pr-10 py-4 text-lg'} text-white placeholder-gray-400 focus:outline-none`}
          />
          {q && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQ('')}
              className={`absolute text-gray-400 hover:text-white transition ${compact ? 'right-2' : 'right-4'}`}
              aria-label="Clear search"
            >
              <X size={compact ? 16 : 20} />
            </motion.button>
          )}
        </div>

        {/* Suggestions */}
        {focused && q === '' && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 p-4 rounded-xl bg-secondary/95 border border-white/10 backdrop-blur-md z-10"
          >
            <p className="text-xs text-gray-400 mb-3 font-semibold">Popular Tags</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 6).map((tag, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQ(tag)}
                  className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-sm font-medium border border-accent/40 hover:bg-accent/30 transition"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
