import { useState, useRef } from 'react'

// Simulated chunked downloader. All runs client-side and uses sizeBytes to simulate time.
export default function ChunkedDownloader({ sizeBytes = 1e9, onClose }){
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mbps, setMbps] = useState(50)
  const intervalRef = useRef(null)

  const start = () => {
    setRunning(true)
    const totalMb = sizeBytes / 1e6
    intervalRef.current = setInterval(()=>{
      // bytes per second = mbps * 125000
      const bytesPerTick = (mbps * 125000) * 0.5 // tick every 500ms
      setProgress(p => {
        const newP = Math.min(100, p + (bytesPerTick / sizeBytes)*100)
        if (newP >= 100) {
          clearInterval(intervalRef.current)
          setRunning(false)
        }
        return newP
      })
    }, 500)
  }
  const cancel = () => { clearInterval(intervalRef.current); setRunning(false); }

  return (
    <div className="p-4 bg-white rounded-2xl shadow max-w-md">
      <h3 className="font-semibold">Download Original (simulated)</h3>
      <div className="text-sm text-neutral-600">Size: {(sizeBytes/1e9).toFixed(2)} GB</div>
      <div className="mt-3">
        <label className="text-sm">Bandwidth (Mbps)</label>
        <input type="range" min="1" max="200" value={mbps} onChange={e=>setMbps(Number(e.target.value))} className="w-full" />
        <div className="text-xs text-neutral-500">{mbps} Mbps</div>
      </div>
      <div className="mt-3">
        <div className="h-3 bg-neutral-200 rounded"> 
          <div style={{width: `${progress}%`}} className="h-3 bg-accent rounded" />
        </div>
        <div className="text-sm mt-1">{progress.toFixed(1)}% {running ? 'downloading...' : progress>=100 ? 'complete — checksum verified' : ''}</div>
      </div>
      <div className="mt-3 flex gap-2">
        {!running && progress<100 && <button className="px-3 py-2 bg-primary text-white rounded" onClick={start}>Start</button>}
        {running && <button className="px-3 py-2 bg-neutral-100 rounded" onClick={cancel}>Cancel</button>}
        <button className="px-3 py-2 bg-neutral-100 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
