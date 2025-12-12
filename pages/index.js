import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Search, Database, Globe, BookOpen, Users, Zap as Spark } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-6 md:px-12" style={{ overflow: 'visible' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8" style={{ overflow: 'visible' }}>
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute bottom-20 right-10 w-72 h-72 bg-accent2/20 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
            style={{ overflow: 'visible' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 text-accent">
                <Zap size={16} />
                <span className="text-sm font-semibold">Digital Thin-Section Repository</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
                ThinSLICE
              </span>
            </motion.h1>

            {/* Subtitle */}
            <div className="w-full" style={{ overflow: 'visible', paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '5rem', paddingRight: '5rem' }}>
              <motion.p 
                variants={itemVariants} 
                className="text-lg md:text-xl text-gray-400 mb-8 mx-auto" 
                style={{ 
                  overflow: 'visible', 
                  paddingLeft: '2rem', 
                  paddingRight: '2rem', 
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  lineHeight: '1.9', 
                  wordWrap: 'break-word',
                  maxWidth: '50rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'block'
                }}
              >
                Explore a comprehensive collection of 100,000+ digitized thin-section specimens with advanced search and detailed geological metadata. The largest publicly accessible thin section collection in the U.S. and possibly the world.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/search" className="group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/50 transition-all"
                >
                  Explore Collection
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </motion.button>
              </Link>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 border-2 border-accent2 text-accent2 font-bold rounded-lg hover:bg-accent2/10 transition-all"
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Database, label: '100,000+', desc: 'Physical Specimens' },
                { icon: Search, label: 'Full Search', desc: 'Advanced Filtering' },
                { icon: Globe, label: 'Global Access', desc: 'Publicly Available' },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <Icon className="text-accent mx-auto mb-3" size={32} />
                    <h3 className="font-bold text-white mb-1">{stat.label}</h3>
                    <p className="text-sm text-gray-400">{stat.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              ThinSLICE (Thin Section Library for Imaging, Characterization, & Education) preserves and shares the UT Austin Jackson School of Geosciences' irreplaceable collection of 100,000+ thin sections, making them available for research, education, and industry use worldwide.
            </p>
          </motion.div>

          {/* Mission Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {[
              {
                title: 'Advanced Search & Filtering',
                desc: 'Filter by rock type, formation, minerals, age, location, and detailed geological properties with real-time results',
                icon: Search
              },
              {
                title: 'High-Resolution Imaging',
                desc: 'Zoomable tiled images with detailed examination capabilities for comprehensive analysis',
                icon: Globe
              },
              {
                title: 'Rich Metadata',
                desc: 'Complete petrographic analysis, mineral composition, grain size, porosity, and comprehensive geological documentation',
                icon: Database
              },
              {
                title: 'Educational & Research',
                desc: 'World-class datasets for teaching fundamentals, training machine learning algorithms, and enabling novel research studies',
                icon: BookOpen
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="h-full p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 transition-all group flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-accent/30 transition flex-shrink-0">
                  <feature.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex-shrink-0">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed flex-1">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Background & Impact Section */}
      <section className="relative px-4 py-12 md:py-16 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Why ThinSLICE Matters</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Thin sections are wafer-thin slices of rock mounted on glass slides and viewed using petrographic microscopes. They are crucial for characterizing rock properties and are used across geoscience, engineering, and paleontology.
                </p>
                <p>
                  The UT Austin Jackson School of Geosciences retains more than 100,000 thin sections—an incredibly valuable, irreplaceable resource collected over a century. These specimens have been underutilized because they were managed individually and not archived digitally.
                </p>
                <p className="font-semibold text-accent text-lg pt-2">
                  ThinSLICE solves this by creating the largest publicly accessible digital thin section collection, making these specimens available forever—not just for UT researchers, but for everyone.
                </p>
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Research & Teaching Impact</h3>
              <div className="space-y-3">
                {[
                  { emoji: '🤖', text: 'Machine learning & AI training for automated thin section analysis' },
                  { emoji: '🔬', text: 'Advanced research on pore networks, fluid flow, and mineral identification' },
                  { emoji: '📚', text: 'World-class educational datasets for training geoscientists globally' },
                  { emoji: '🌍', text: 'Paleontology & sedimentology research covering large areas impossible to study before' },
                  { emoji: '🏆', text: 'Cutting-edge image recognition and segmentation development' },
                  { emoji: '🤝', text: 'Industry partnerships advancing exploration and resource characterization' }
                ].map((impact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition"
                  >
                    <span className="text-2xl flex-shrink-0">{impact.emoji}</span>
                    <span className="text-gray-300 leading-relaxed">{impact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Involved with ThinSLICE</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Researchers, educators, students, and industry professionals can all benefit from our growing collection. Whether you want to explore specimens, contribute data, or establish a partnership, we'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 transition-all group flex flex-col"
            >
              <h3 className="text-xl font-bold text-white mb-2 flex-shrink-0">For Researchers & Educators</h3>
              <p className="text-gray-400 leading-relaxed flex-1">
                Access our collection free of charge. Use specimens for research, teaching, and student training globally.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 transition-all group flex flex-col"
            >
              <h3 className="text-xl font-bold text-white mb-2 flex-shrink-0">For Industry Partners</h3>
              <p className="text-gray-400 leading-relaxed flex-1">
                Help us develop cloud infrastructure and database architecture. Contact PI Kelly Hattori to discuss partnerships.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 text-center"
          >
            <p className="text-gray-400 mb-4">
              <strong>Principal Investigator:</strong> Kelly Hattori
            </p>
            <a
              href="mailto:kelly.hattori@beg.utexas.edu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent2 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all"
            >
              <span>kelly.hattori@beg.utexas.edu</span>
              <ArrowRight size={18} />
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Jackson School of Geosciences, University of Texas at Austin<br/>
              Bureau of Economic Geology, J. J. Pickle Research Campus
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
