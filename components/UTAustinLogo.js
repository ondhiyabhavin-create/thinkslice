import { motion } from 'framer-motion'

export default function UTAustinLogo({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-4 ${className}`}
    >
      {/* Shield Emblem */}
      <div className="flex-shrink-0">
        <svg
          width="70"
          height="80"
          viewBox="0 0 70 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Shield Shape */}
          <path
            d="M35 0L0 18V42C0 58 12 70 35 80C58 70 70 58 70 42V18L35 0Z"
            fill="#BF5700"
          />
          
          {/* Top Rectangle Band */}
          <rect x="10" y="10" width="50" height="14" fill="#BF5700" />
          
          {/* Open Books in Top Section */}
          {/* Left Book */}
          <path
            d="M18 14 L18 20 M18 17 L22 17 M22 14 L22 20"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Book */}
          <path
            d="M28 14 L28 20 M28 17 L32 17 M32 14 L32 20"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Star */}
          <path
            d="M35 30L38 38L47 38L40 43L43 51L35 46L27 51L30 43L23 38L32 38L35 30Z"
            fill="#FFFFFF"
          />
          
          {/* Laurel Wreath Left */}
          <path
            d="M15 52 Q10 58 12 64 Q14 58 15 52"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M12 58 Q10 56 8 58"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M12 60 Q10 62 8 60"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Laurel Wreath Right */}
          <path
            d="M55 52 Q60 58 58 64 Q56 58 55 52"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M58 58 Q60 56 62 58"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M58 60 Q60 62 62 60"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Text Content */}
      <div className="hidden sm:block">
        <div className="text-[#BF5700] text-sm font-medium leading-tight">
          The University of Texas at Austin
        </div>
        <div className="text-[#2D404F] dark:text-[#E0E0E0] text-lg font-bold leading-tight mt-1">
          Bureau of Economic Geology
        </div>
        <div className="text-[#4A5F6F] dark:text-[#B0B0B0] text-sm italic leading-tight">
          Jackson School of Geosciences
        </div>
      </div>
    </motion.div>
  )
}

