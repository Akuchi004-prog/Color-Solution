import React, { useState, useRef } from 'react';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { getDominantColor } from '../../utils/colorUtils';
import { Upload, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

extend([mixPlugin]);

export const ColorPaletteGenerator = () => {
  const [baseColor,QHSetBaseColor] = useState<string>('#34D399'); // Default teal
  const [palette, setPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    generatePalette(baseColor);
  }, [baseColor]);

  const generatePalette = (color: string) => {
    if (!colord(color).isValid()) return;
    
    // Generate a monochromatic-ish palette: 2 lighter, base, 2 darker
    const c = colord(color);
    const p = [
      c.lighten(0.4).toHex(),
      c.lighten(0.2).toHex(),
      c.toHex(),
      c.darken(0.2).toHex(),
      c.darken(0.4).toHex(),
    ];
    setPalette(p);
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
        QHSetBaseColor(domColor);
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">
        Color Palette Generator
      </h2>
      <p className="text-white/70 text-center text-sm mb-6 max-w-xs mx-auto">
        Generate beautiful color palettes from a single color or image.
        Perfect for branding, UI design, and creative projects.
      </p>
      <small>
        Upload an image or enter a HEX color to get matching colors instantly.
      </small>

      {/* Input Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8">
        <label className="block text-sm font-bold text-white/80 mb-2">
          Upload Image or Enter HEX
        </label>
        
        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Upload size={20} />
            {loading ? 'Analyzing...' : 'Upload Image'}
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
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: baseColor }} />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => QHSetBaseColor(e.target.value)}
            className="w-full bg-black/20 text-white font-mono pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 uppercase"
            placeholder="#HEXCODE"
            maxLength={7}
          />
        </div>
      </div>

      {/* Palette Display */}
      <div className="space-y-4">
        {palette.map((color, index) => (
          <div 
            key={`${color}-${index}`}
            onClick={() => copyToClipboard(color)}
            className="group relative h-20 rounded-2xl shadow-lg cursor-pointer transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between px-6"
            style={{ backgroundColor: color }}
          >
            <span className={`font-mono font-bold text-lg ${colord(color).isDark() ? 'text-white/90' : 'text-black/80'}`}>
              {color.toUpperCase()}
            </span>
            <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${colord(color).isDark() ? 'text-white' : 'text-black'}`}>
              <Copy size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
