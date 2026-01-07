import React, { useState, useRef } from 'react';
import namer from 'color-namer';
import { getDominantColor } from '../../utils/colorUtils';
import { Upload, Copy, Search } from 'lucide-react';
import { toast } from 'sonner';

export const ColorNamer = () => {
  const [color, setColor] = useState('#3B82F6');
  const [name, setName] = useState('Blue Ribbon'); // Example default
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    findName(color);
  }, [color]);

  const findName = (hex: string) => {
    try {
      const names = namer(hex);
      // Prefer 'ntc' list as it has good common names
      const bestMatch = names.ntc[0]; 
      setName(bestMatch.name);
    } catch (e) {
      // If invalid color, ignore
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const domColor = getDominantColor(img);
        setColor(domColor);
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyName = () => {
    navigator.clipboard.writeText(name);
    toast.success(`Copied "${name}"`);
  };

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">
        Color Namer
      </h2>
      <p className="text-white/70 text-center text-sm mb-6 max-w-xs mx-auto">
        Discover simple, human-friendly names for any color.
      </p>
      <small>
        Upload an image or enter a color to get a close and recognizable name.
      </small>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8">
        <label className="block text-sm font-bold text-white/80 mb-2">
          Image or Hex
        </label>

        <div className="flex gap-3 mb-4">
           <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Upload size={20} />
            {loading ? '...' : 'Image'}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/20 shadow-sm transition-colors" style={{ backgroundColor: color }} />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full bg-black/20 text-white font-mono pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 uppercase"
            placeholder="#HEXCODE"
            maxLength={7}
          />
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-block p-1 rounded-full border-4 border-white/10 shadow-2xl">
           <div 
             className="w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-500"
             style={{ backgroundColor: color }}
           />
        </div>

        <div 
          onClick={copyName}
          className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl cursor-pointer hover:bg-black/40 transition-all active:scale-95 border border-white/5"
        >
           <p className="text-white/50 text-sm font-bold mb-1 uppercase tracking-wider">Closest Match</p>
           <h3 className="text-3xl font-black text-teal-300 drop-shadow-md flex items-center justify-center gap-2">
             {name}
             <Copy size={20} className="text-white/20" />
           </h3>
        </div>
      </div>
    </div>
  );
};
