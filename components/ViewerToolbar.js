export default function ViewerToolbar({ onZoomIn, onZoomOut, onFit }){
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow">
      <button onClick={onZoomIn} className="px-2 py-1 bg-neutral-100 rounded">Zoom In</button>
      <button onClick={onZoomOut} className="px-2 py-1 bg-neutral-100 rounded">Zoom Out</button>
      <button onClick={onFit} className="px-2 py-1 bg-neutral-100 rounded">Fit</button>
    </div>
  )
}
