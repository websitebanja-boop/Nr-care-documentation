import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

const DAMAGE_CODES = [
  { code: 'S', label: 'Scratch' },
  { code: 'D', label: 'Dent' },
  { code: 'C', label: 'Chip' },
  { code: 'X', label: 'Crack' },
  { code: 'B', label: 'Broken' },
  { code: 'M', label: 'Missing' },
  { code: 'O', label: 'Other' }
];

interface Marker {
  id: string;
  x: number;
  y: number;
  code: string;
}

interface DamageDiagramProps {
  name: string;
}

const CarSVG = () => (
  <svg viewBox="0 0 660 300" className="w-full h-full text-slate-600 pointer-events-none select-none">
    {/* TOP VIEW */}
    <g transform="translate(60, 40)">
      <text x="50" y="-15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">TOP</text>
      {/* Body */}
      <rect x="15" y="0" width="70" height="180" rx="20" stroke="currentColor" strokeWidth="2" fill="#f8fafc" />
      {/* Front windshield */}
      <path d="M 22 45 Q 50 35 78 45 L 75 70 L 25 70 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      {/* Rear windshield */}
      <path d="M 22 135 Q 50 145 78 135 L 75 110 L 25 110 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      {/* Roof */}
      <rect x="25" y="70" width="50" height="40" stroke="currentColor" strokeWidth="2" fill="none" />
    </g>

    {/* DRIVER SIDE */}
    <g transform="translate(220, 30)">
      <text x="100" y="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">DRIVER SIDE</text>
      <path d="M 10 90 L 10 65 Q 15 50 40 45 L 70 20 L 130 20 L 170 45 Q 190 50 190 65 L 190 90 Z" stroke="currentColor" strokeWidth="2" fill="#f8fafc" />
      <path d="M 45 45 L 70 22 L 100 22 L 100 45 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <path d="M 100 22 L 125 22 L 160 45 L 100 45 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <circle cx="45" cy="90" r="16" stroke="currentColor" strokeWidth="2" fill="#cbd5e1" />
      <circle cx="155" cy="90" r="16" stroke="currentColor" strokeWidth="2" fill="#cbd5e1" />
    </g>

    {/* PASSENGER SIDE */}
    <g transform="translate(220, 160)">
      <text x="100" y="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">PASSENGER SIDE</text>
      <path d="M 10 90 L 10 65 Q 15 50 40 45 L 70 20 L 130 20 L 170 45 Q 190 50 190 65 L 190 90 Z" stroke="currentColor" strokeWidth="2" fill="#f8fafc" />
      <path d="M 45 45 L 70 22 L 100 22 L 100 45 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <path d="M 100 22 L 125 22 L 160 45 L 100 45 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <circle cx="45" cy="90" r="16" stroke="currentColor" strokeWidth="2" fill="#cbd5e1" />
      <circle cx="155" cy="90" r="16" stroke="currentColor" strokeWidth="2" fill="#cbd5e1" />
    </g>

    {/* FRONT VIEW */}
    <g transform="translate(480, 40)">
      <text x="45" y="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">FRONT</text>
      <path d="M 10 90 L 10 50 Q 15 35 25 30 L 35 10 L 55 10 L 65 30 Q 75 35 80 50 L 80 90 Z" stroke="currentColor" strokeWidth="2" fill="#f8fafc" />
      <path d="M 25 30 L 35 12 L 55 12 L 65 30 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <rect x="15" y="60" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="60" y="60" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="35" y="65" width="20" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
    </g>

    {/* REAR VIEW */}
    <g transform="translate(480, 160)">
      <text x="45" y="-10" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">REAR</text>
      <path d="M 10 90 L 10 50 Q 15 35 25 30 L 35 10 L 55 10 L 65 30 Q 75 35 80 50 L 80 90 Z" stroke="currentColor" strokeWidth="2" fill="#f8fafc" />
      <path d="M 25 30 L 35 12 L 55 12 L 65 30 Z" stroke="currentColor" strokeWidth="2" fill="#e2e8f0" />
      <rect x="15" y="60" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="2" fill="#f87171" />
      <rect x="60" y="60" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="2" fill="#f87171" />
      <rect x="30" y="75" width="30" height="10" stroke="currentColor" strokeWidth="1" fill="#cbd5e1" />
    </g>
  </svg>
);

export default function DamageDiagram({ name }: DamageDiagramProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  
  const markers = (field.value as Marker[]) || [];
  const [selectedCode, setSelectedCode] = useState('S');

  const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    field.onChange([
      ...markers,
      { id: Date.now().toString(), x, y, code: selectedCode }
    ]);
  };

  const removeMarker = (id: string, e: any) => {
    e.stopPropagation();
    field.onChange(markers.filter((m: Marker) => m.id !== id));
  };

  return (
    <div className="w-full">
      <div className="bg-[#205072] text-white text-center py-1.5 font-bold mb-3 rounded-t text-sm tracking-wide">
        PLEASE MARK ANY EXISTING DAMAGE ON THE DIAGRAMS
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {DAMAGE_CODES.map(dc => (
          <button
            type="button"
            key={dc.code}
            onClick={() => setSelectedCode(dc.code)}
            className={`px-3 py-1 text-xs font-semibold rounded border ${
              selectedCode === dc.code 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {dc.code} = {dc.label}
          </button>
        ))}
      </div>

      <div 
        className="relative w-full h-[260px] border-2 border-dashed border-slate-300 bg-white flex items-center justify-center cursor-crosshair overflow-hidden rounded"
        onClick={handleDiagramClick}
      >
        <CarSVG />

        {markers.map((marker: Marker) => (
          <div
            key={marker.id}
            onClick={(e) => removeMarker(marker.id, e)}
            className="absolute w-6 h-6 -ml-3 -mt-3 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md cursor-pointer hover:bg-red-600 transition-colors z-10"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            title="Click to remove"
          >
            {marker.code}
          </div>
        ))}
      </div>

      <div className="text-center text-xs font-semibold mt-3 text-slate-600 pb-3 border-b border-slate-200">
        Damage codes: {DAMAGE_CODES.map(dc => `${dc.code} = ${dc.label}`).join(' | ')}
      </div>
    </div>
  );
}
