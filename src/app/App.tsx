import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ColorPaletteGenerator } from './pages/tools/ColorPaletteGenerator';
import { ColorGradientGenerator } from './pages/tools/ColorGradientGenerator';
import { ColorContrastChecker } from './pages/tools/ColorContrastChecker';
import { HexCodeGenerator } from './pages/tools/HexCodeGenerator';
import { ColorConverter } from './pages/tools/ColorConverter';
import { ColorNamer } from './pages/tools/ColorNamer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="palette" element={<ColorPaletteGenerator />} />
          <Route path="gradient" element={<ColorGradientGenerator />} />
          <Route path="contrast" element={<ColorContrastChecker />} />
          <Route path="hex" element={<HexCodeGenerator />} />
          <Route path="converter" element={<ColorConverter />} />
          <Route path="namer" element={<ColorNamer />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}
