import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const ColorGradientGenerator = () => {
  const [color1, setColor1] = useState('#EC4899'); // Pink-500
  const [color2, setColor2] = useState('#6366F1'); // Indigo-500
  const [direction, setDirection] = useState('to right');

  const gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2})`;

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
    toast.success('CSS copied to clipboard!');
  };

  const swapColors = () => {
    setColor1(color2);
    setColor2(color1);
  };

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">
        Color Gradient Generator
      </h2>
      <p className="text-white/70 text-center text-sm mb-6 max-w-xs mx-auto">
        Create smooth and modern color gradients for backgrounds, buttons,
        and UI elements.
      </p>
      <small>
        Generate gradients automatically from a color.
      </small>

      {/* Preview */}
      <div 
        className="w-full h-48 rounded-3xl shadow-xl mb-8 border-4 border-white/20"
        style={{ background: gradientCSS }}
      />

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-white/70 uppercase">Start Color</label>
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded-xl border border-white/10">
              <input 
                type="color" 
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none p-0"
              />
              <span className="font-mono text-white text-sm">{color1.toUpperCase()}</span>
            </div>
          </div>

          <button 
            onClick={swapColors}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <RefreshCw size={20} />
          </button>

          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-white/70 uppercase">End Color</label>
             <div className="flex items-center gap-2 bg-black/20 p-2 rounded-xl border border-white/10">
              <input 
                type="color" 
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none p-0"
              />
              <span className="font-mono text-white text-sm">{color2.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-white/70 uppercase">Direction</label>
          <select 
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full bg-black/20 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="to right">Left to Right →</option>
            <option value="to left">Right to Left ←</option>
            <option value="to bottom">Top to Bottom ↓</option>
            <option value="to top">Bottom to Top ↑</option>
            <option value="to bottom right">Diagonal ↘</option>
            <option value="to top left">Diagonal ↖</option>
          </select>
        </div>
      </div>

      {/* Code Output */}
      <div 
        onClick={copyCSS}
        className="group relative bg-black/40 p-4 rounded-xl cursor-pointer hover:bg-black/50 transition-colors border border-white/10"
      >
        <p className="font-mono text-teal-300 text-sm break-all pr-8">
          background: {gradientCSS};
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors">
          <Copy size={20} />
        </div>
      </div>
    </div>
  );
};
