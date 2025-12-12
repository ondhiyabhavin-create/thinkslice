import { useState } from 'react'

export default function FilterDrawer({ open=false, onClose, filters, onChange }){
  const [local, setLocal] = useState(filters || {})
  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform`} aria-hidden={!open}>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <button onClick={onClose} aria-label="close" className="px-2 py-1">Close</button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Rock type</label>
          <select value={local.rock_type||''} onChange={e=>{ setLocal({...local, rock_type:e.target.value}); onChange && onChange({...local, rock_type:e.target.value}) }} className="w-full mt-1 p-2 border rounded">
            <option value="">Any</option>
            <option>Igneous</option>
            <option>Metamorphic</option>
            <option>Clastic</option>
            <option>Carbonate</option>
            <option>Shale</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Min size (GB)</label>
          <input type="number" value={local.min_size_gb||''} onChange={e=>{ setLocal({...local, min_size_gb:e.target.value}); onChange && onChange({...local, min_size_gb:e.target.value})}} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma)</label>
          <input value={local.tags||''} onChange={e=>{ setLocal({...local, tags:e.target.value}); onChange && onChange({...local, tags:e.target.value})}} className="w-full mt-1 p-2 border rounded" />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-primary text-white rounded" onClick={()=>onClose()}>Apply</button>
          <button className="px-3 py-2 bg-neutral-100 rounded" onClick={()=>{ setLocal({}); onChange && onChange({}) }}>Reset</button>
        </div>
      </div>
    </div>
  )
}
