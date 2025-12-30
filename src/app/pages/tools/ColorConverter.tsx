import React, { useState, useEffect } from 'react';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { Copy, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

extend([namesPlugin]);

export const ColorConverter = () => {
  const [input, setInput] = useState('#6366F1');
  const [result, setResult] = useState<null | { hex: string, rgb: string }>(null);

  useEffect(() => {
    convertColor(input);
  }, [input]);

  const convertColor = (val: string) => {
    // Basic cleaning
    let cleaned = val.trim();
    
    // Check for RGB input (comma or space separated)
    if (cleaned.match(/[\s,]/)) {
       const parts = cleaned.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
       if (parts.length === 3 && parts.every(n => n >= 0 && n <= 255)) {
          const rgbC = colord({ r: parts[0], g: parts[1], b: parts[2] });
          if (rgbC.isValid()) {
             setResult({
                hex: rgbC.toHex(),
                rgb: rgbC.toRgbString(),
             });
             return;
          }
       }
    }
    
    // If it looks like hex but missing #, add it
    if (/^[0-9A-F]{3,6}$/i.test(cleaned)) {
      cleaned = '#' + cleaned;
    }

    const c = colord(cleaned);
    if (c.isValid()) {
      setResult({
        hex: c.toHex(),
        rgb: c.toRgbString(),
      });
    } else {
       if (!input) setResult(null);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${text}`);
  };

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">
        Color Converter
      </h2>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8">
        <label className="block text-sm font-bold text-white/80 mb-2">
          Enter Color (HEX or RGB)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-black/20 text-white p-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 font-mono text-lg"
          placeholder="#FFFFFF or 255, 255, 255"
        />
        <p className="text-xs text-white/50 mt-2 pl-1">
          Try: "purple", "rgb(0,0,0)", "#f00"
        </p>
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex justify-center mb-4">
              <ArrowDown className="text-white/50 animate-bounce" />
           </div>

           <div 
             className="w-full h-16 rounded-xl shadow-inner border border-white/10 mb-4 transition-colors"
             style={{ backgroundColor: result.hex }}
           />

           <div 
             onClick={() => copy(result.hex)}
             className="bg-black/40 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-black/50 transition-colors border border-white/10"
           >
             <span className="text-white/60 font-bold text-sm">HEX</span>
             <span className="text-teal-300 font-mono font-bold text-lg">{result.hex.toUpperCase()}</span>
             <Copy size={18} className="text-white/60" />
           </div>

           <div 
             onClick={() => copy(result.rgb)}
             className="bg-black/40 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-black/50 transition-colors border border-white/10"
           >
             <span className="text-white/60 font-bold text-sm">RGB</span>
             <span className="text-teal-300 font-mono font-bold text-lg">{result.rgb}</span>
             <Copy size={18} className="text-white/60" />
           </div>
        </div>
      )}
    </div>
  );
};
