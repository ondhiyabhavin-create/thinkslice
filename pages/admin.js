import { motion } from 'framer-motion'
import { CheckCircle, Code, Image, Database, Zap } from 'lucide-react'

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
    transition: { duration: 0.6 },
  },
}

export default function Admin(){
  const steps = [
    {
      icon: Image,
      title: 'Scan & Capture',
      desc: 'Scan thin sections using professional microscopy equipment'
    },
    {
      icon: Code,
      title: 'Generate Pyramids',
      desc: 'Create tiled image pyramids using VIPS: vips dzsave input.tif output_prefix --tile-size=256'
    },
    {
      icon: Image,
      title: 'Extract Thumbnails',
      desc: 'Generate thumbnail images at multiple sizes (256x256, 512x512) for fast preview loading'
    },
    {
      icon: Database,
      title: 'Compose Metadata',
      desc: 'Create JSON record with specimen details and add to /public/data/records.json'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Scanning Guidelines</h1>
          <p className="text-xl text-gray-400">Complete workflow for creating high-quality thin-section digital archives</p>
        </motion.div>

        {/* Workflow Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        {step.title}
                        <span className="text-sm text-gray-400 font-normal">Step {idx + 1}</span>
                      </h3>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Metadata Schema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">JSON Metadata Schema</h2>
          <div className="p-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono">
{`{
  "id": "unique-identifier",
  "name": "Sample Name",
  "formation": "Geological Formation",
  "rock_type": "Rock Type",
  "minerals": ["quartz", "feldspar"],
  "location": "Geographic Location",
  "thin_section_id": "TS-2025-001",
  "thumbnails": [
    "/media/thumbs/thumb-1.svg",
    "/media/thumbs/thumb-2.svg"
  ],
  "tiffUrl": "/media/pyramids/sample1/0_0.jpg",
  "tiled_preview": "/media/pyramids/sample1/",
  "scan_date": "2025-01-15",
  "scanner": "Scanner Model",
  "size_bytes": 50000000,
  "tags": ["metamorphic", "microscopy"],
  "derived_metadata": {
    "grain_size_um": 2.5,
    "porosity_percent": 15
  }
}`}
            </pre>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Key Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'TIFF pyramids with 256x256 tile size',
              'Multiple thumbnail sizes (256, 512 pixels)',
              'Complete geological metadata in JSON',
              'Optimized file sizes for web delivery',
              'Consistent naming conventions'
            ].map((req, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-lg bg-success/20 border border-success/40"
              >
                <CheckCircle className="text-success flex-shrink-0" size={24} />
                <span className="text-white">{req}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/40 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <Zap className="text-accent flex-shrink-0 mt-1" size={28} />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Best Practices</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use professional-grade scanning equipment for consistent quality</li>
                <li>• Compress TIFF pyramids without quality loss using DEFLATE</li>
                <li>• Store metadata in a version-controlled JSON file for easy updates</li>
                <li>• Test pyramid tiles before deployment to ensure proper rendering</li>
                <li>• Document all scanning parameters for reproducibility</li>
                <li>• Organize media files in a consistent directory structure</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
