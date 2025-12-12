import Link from 'next/link'
import { Menu, Search, Microscope, X, Scan } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import SearchBar from './SearchBar'
import ResultCard from './ResultCard'
import { getGeologicalData } from '../lib/geologicalData'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allRecords, setAllRecords] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load all records for search
    ;(async () => {
      const data = await getGeologicalData()
      setAllRecords(data)
    })()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allRecords.filter(r => {
        const q = searchQuery.toLowerCase()
        return r.name.toLowerCase().includes(q) || 
               r.formation.toLowerCase().includes(q) || 
               r.location.toLowerCase().includes(q) || 
               (r.minerals||[]).join(' ').toLowerCase().includes(q) ||
               r.rock_type.toLowerCase().includes(q)
      })
      setSearchResults(filtered)
      setShowSearchResults(filtered.length > 0)
    } else {
      setShowSearchResults(false)
      setSearchResults([])
    }
  }, [searchQuery, allRecords])

  const suggestions = useMemo(() => {
    const tags = new Set()
    allRecords.forEach(r => r.tags && r.tags.slice(0, 5).forEach(t => tags.add(t)))
    return Array.from(tags)
  }, [allRecords])

  const navItems = [
    { label: 'Browse', href: '/search', icon: Search }
  ]

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-primary/80 border-b border-white/10 shadow-lg" style={{ overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 py-4" style={{ overflow: 'visible' }}>
          <div className="flex items-center justify-between gap-4" style={{ overflow: 'visible' }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-visible flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-3 group overflow-visible">
                {/* UT Austin Logo */}
                <div className="relative flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="UT Austin Logo" 
                    className="h-10 md:h-12 w-auto drop-shadow-md"
                  />
                </div>
                <div className="block" style={{ overflow: 'visible', lineHeight: '1.7', paddingBottom: '6px' }}>
                  <h1 className="text-base sm:text-xl font-bold text-white whitespace-nowrap leading-tight mb-0.5">ThinSLICE</h1>
                  <p className="text-xs text-gray-400 whitespace-nowrap" style={{ lineHeight: '2.2', display: 'block', overflow: 'visible', paddingBottom: '16px', paddingTop: '2px', marginBottom: '0', height: 'auto' }}>Digital Repository</p>
                </div>
              </Link>
            </motion.div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-xl mx-4 relative">
              <SearchBar 
                onSearch={setSearchQuery} 
                suggestions={suggestions}
                compact={true}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
              {navItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition duration-300 flex items-center gap-2 font-medium"
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition text-gray-300 flex-shrink-0"
              aria-label="menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4">
            <SearchBar 
              onSearch={setSearchQuery} 
              suggestions={suggestions}
            />
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 mt-4 pt-4 flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition duration-300 flex items-center gap-2 font-medium"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </motion.nav>
          )}
        </div>
      </header>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showSearchResults && searchQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-xl max-h-[calc(100vh-73px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowSearchResults(false)
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                  {searchResults.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        router.push(`/view/${item.id}`)
                        setSearchQuery('')
                        setShowSearchResults(false)
                      }}
                      className="cursor-pointer"
                    >
                      <ResultCard item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="text-gray-500 mx-auto mb-2" size={32} />
                  <p className="text-gray-400">No results found</p>
                </div>
              )}

              {searchResults.length > 6 && (
                <div className="text-center pt-4 border-t border-white/10">
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setSearchQuery('')
                      setShowSearchResults(false)
                    }}
                    className="text-accent hover:text-accent2 font-semibold"
                  >
                    View all {searchResults.length} results →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
