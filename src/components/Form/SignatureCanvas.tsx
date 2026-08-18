import { useRef, useState } from 'react';
import { Undo2, Check, X } from 'lucide-react';
import { useController, useFormContext } from 'react-hook-form';

interface SignatureProps {
  name: string;
  label?: string;
}

export default function SignatureField({ name, label }: SignatureProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const isDrawing = useRef(false);

  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 120;

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Account for CSS scale / bounding rect vs canvas coordinate space
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCanvasPoint(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasPoint(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    field.onChange('');
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const data = canvas.toDataURL('image/png');
      field.onChange(data);
    }
  };

  if (field.value) {
    return (
      <div className="relative border border-slate-200 bg-slate-50/50 rounded-sm h-32 flex items-center justify-center p-2 group">
        <img src={field.value} alt="Signature" className="max-h-full max-w-full" style={{ mixBlendMode: 'multiply' }} />
        <button 
          type="button"
          onClick={handleClear}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-500"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative border border-dashed border-blue-300 bg-blue-50/30 rounded-sm h-32 w-full touch-none overflow-hidden flex items-center justify-center">
        <canvas 
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {!hasSignature && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 font-sans italic">
            {label || "Sign here"}
          </div>
        )}
      </div>
      
      {hasSignature && (
        <div className="flex justify-end gap-2">
          <button 
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans"
          >
            <Undo2 size={14} /> Clear
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-sans"
          >
            <Check size={14} /> Apply
          </button>
        </div>
      )}
    </div>
  );
}
