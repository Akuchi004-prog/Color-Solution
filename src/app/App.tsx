import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';

// Tools
import { ColorPaletteGenerator } from './pages/tools/ColorPaletteGenerator';
import { ColorGradientGenerator } from './pages/tools/ColorGradientGenerator';
import { ColorContrastChecker } from './pages/tools/ColorContrastChecker';
import { HexCodeGenerator } from './pages/tools/HexCodeGenerator';
import { ColorConverter } from './pages/tools/ColorConverter';
import { ColorNamer } from './pages/tools/ColorNamer';

// Legal / Info pages
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Landing */}
          <Route index element={<LandingPage />} />

          {/* Tools */}
          <Route path="palette" element={<ColorPaletteGenerator />} />
          <Route path="gradient" element={<ColorGradientGenerator />} />
          <Route path="contrast" element={<ColorContrastChecker />} />
          <Route path="hex" element={<HexCodeGenerator />} />
          <Route path="converter" element={<ColorConverter />} />
          <Route path="namer" element={<ColorNamer />} />

          {/* Info / Legal */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}
