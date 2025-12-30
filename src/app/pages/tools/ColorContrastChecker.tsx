import React, { useState } from 'react';
import { colord } from 'colord';

/* ---------- Contrast Helpers ---------- */

const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (c1: string, c2: string) => {
  const a = colord(c1).toRgb();
  const b = colord(c2).toRgb();

  const l1 = getLuminance(a.r, a.g, a.b);
  const l2 = getLuminance(b.r, b.g, b.b);

  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);

  return (bright + 0.05) / (dark + 0.05);
};

const getRating = (ratio: number) => {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
};

/* ---------- Component ---------- */

export const ColorContrastChecker = () => {
  const [text, setText] = useState('Color Solution');
  const [textColor, setTextColor] = useState('#000000');

  /* Candidate background colors */
  const backgroundCandidates = [
    '#FFFFFF',
    '#000000',
    '#F3F4F6',
    '#1F2937',
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
  ];

  const results = backgroundCandidates
    .map((bg) => {
      const ratio = getContrastRatio(textColor, bg);
      return {
        bg,
        ratio,
        rating: getRating(ratio),
      };
    })
    .filter((r) => r.rating !== 'Fail'); // show only usable pairs

  return (
    <div className="px-6 py-8 pb-20 animate-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-black text-white mb-2 uppercase text-center">
        Color Contrast Checker
      </h2>

      <p className="text-white/70 text-center text-sm mb-6 max-w-xs mx-auto">
        Enter your text and text color. We’ll generate readable background color
        options automatically.
      </p>

      {/* Inputs */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg mb-8 space-y-4">
        <div>
          <label className="block text-sm font-bold text-white/80 mb-2">
            Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-black/20 text-white p-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
            placeholder="Type something..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white/80 mb-2">
            Text Color
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-14 rounded-xl border border-white/10 bg-black/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.map(({ bg, ratio, rating }) => (
          <div
            key={bg}
            className="rounded-2xl p-6 shadow-lg relative overflow-hidden"
            style={{ backgroundColor: bg, color: textColor }}
          >
            <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded bg-black/10 backdrop-blur-sm border border-current opacity-70">
              {rating}
            </div>

            <h3 className="text-xl font-bold truncate pr-16">
              {text || 'Preview Text'}
            </h3>

            <div className="flex gap-4 text-xs opacity-80 font-mono mt-2">
              <span>BG: {bg}</span>
              <span>TXT: {textColor}</span>
              <span>{ratio.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
