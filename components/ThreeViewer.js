import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Lightweight, dependency-free 3D placeholder using SVG + CSS animations.
export default function ThreeViewer(){
  const [running, setRunning] = useState(false)
  useEffect(()=>{
    // placeholder side-effects can be added here
  }, [])

  return (
    <div className="w-full h-96 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.svg animate={running ? { scale: [1, 1.05, 1] } : { scale: 1 }} transition={{ repeat: running ? Infinity : 0, duration: 2, ease: 'easeInOut' }} width="280" height="220" viewBox="0 0 280 220" role="img" aria-label="3D placeholder model">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#a87c55" />
              <stop offset="100%" stopColor="#73523a" />
            </linearGradient>
          </defs>
          <ellipse cx="140" cy="110" rx="90" ry="60" fill="url(#g)" opacity="0.95" />
          <path d="M60 90 C80 40, 200 30, 220 90 C200 150, 80 160, 60 90 Z" fill="#8a5f3e" opacity="0.95" />
          <circle cx="130" cy="85" r="6" fill="#ffd89b" opacity="0.9" />
        </motion.svg>
      </div>
      <div className="p-3 flex items-center gap-2 bg-white">
        <button className="px-3 py-2 bg-primary text-white rounded" onClick={()=>setRunning(r=>!r)}>{running ? 'Stop Scan' : 'Run Scan Simulation'}</button>
        <div className="text-sm text-neutral-600">Interactive 3D placeholder (lightweight)</div>
      </div>
    </div>
  )
}
