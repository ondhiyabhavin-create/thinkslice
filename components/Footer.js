import { motion } from 'framer-motion'

export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-primary/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          <div>
            <h3 className="font-bold text-white mb-2">ThinSLICE</h3>
            <p className="text-sm text-gray-400">Digital thin-section repository for geological research and education</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/search" className="hover:text-accent transition">Browse Samples</a></li>
              <li><a href="/admin" className="hover:text-accent transition">Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm text-gray-400 mb-3">
              Jackson School of Geosciences<br />
              <a href="mailto:kelly.hattori@beg.utexas.edu" className="text-accent hover:text-accent2 transition">kelly.hattori@beg.utexas.edu</a>
            </p>
            <img 
              src="/footer.png" 
              alt="Footer Logo" 
              className="h-12 w-auto mt-2 opacity-90"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 text-center text-sm text-gray-500"
        >
          <p>© 2025 ThinSLICE. Powered by The University of Texas at Austin.</p>
        </motion.div>
      </div>
    </footer>
  )
}
