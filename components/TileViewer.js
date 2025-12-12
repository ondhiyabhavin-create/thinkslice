import { useState } from 'react'

// Very small, client-side tile viewer simulation. Real tile-based viewers (OpenSeadragon) can be integrated later.
export default function TileViewer({ pyramidBase = '/media/pyramids/sample1/0_0.jpg' }){
  const [zoom, setZoom] = useState(1)
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden">
      <div className="w-full h-96 relative bg-black flex items-center justify-center">
        <img src={pyramidBase} alt="tile" style={{transform: `scale(${zoom})`}} className="transition-transform" />
      </div>
      <div className="p-2 bg-white flex items-center gap-2">
        <button onClick={()=>setZoom(z=>Math.max(0.5,z-0.25))} className="px-2 py-1 bg-neutral-100 rounded">-</button>
        <div className="text-sm">Zoom: {zoom.toFixed(2)}</div>
        <button onClick={()=>setZoom(z=>Math.min(8,z+0.25))} className="px-2 py-1 bg-neutral-100 rounded">+</button>
      </div>
    </div>
  )
}
