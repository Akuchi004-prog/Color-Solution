import React, { useState, useRef } from 'react';
import { getDominantColor } from '../../utils/colorUtils';
import { Upload, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export const HexCodeGenerator = () => {
  const [color, setColor] = useState<string>('#000000');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      
      const img = new Image();
      img.onload = () => {
        const domColor = getDominantColor(img);
        setColor(domColor);
        setLoading(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">
        HEX Extractor
      </h2>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8 text-center">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mb-6 border-2 border-dashed border-white/30"
        >
          <Upload size={24} />
          {loading ? 'Processing...' : 'Upload Image'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {imageSrc && (
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 max-h-64 mx-auto">
             <img src={imageSrc} alt="Uploaded" className="w-full h-full object-contain bg-black/50" />
          </div>
        )}

        <div className="space-y-4">
           <div 
             className="w-full h-32 rounded-2xl shadow-inner border border-white/10 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
             style={{ backgroundColor: color }}
             onClick={copyToClipboard}
           >
              <span className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg text-white font-mono font-bold flex items-center gap-2">
                {color} <Copy size={16} />
              </span>
           </div>
           
           <p className="text-sm text-white/60">
             Detected dominant color from image
           </p>
        </div>
      </div>
    </div>
  );
};
