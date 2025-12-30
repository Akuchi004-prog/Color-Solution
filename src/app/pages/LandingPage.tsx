import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Paintbrush } from 'lucide-react';

export const LandingPage = () => {
  const tools = [
    { name: 'Color Palette Generator', path: '/palette' },
    { name: 'Color Gradient Generator', path: '/gradient' },
    { name: 'Color Contrast Checker', path: '/contrast' },
    { name: 'HEX Code Generator', path: '/hex' },
    { name: 'Color Converter', path: '/converter' },
    { name: 'Color Namer', path: '/namer' },
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-8 text-center animate-in fade-in duration-500 text-white">
      {/* Header / Hero */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-4 shadow-lg mx-auto">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <Palette className="w-12 sm:w-16 h-12 sm:h-16 text-white" />
            <Paintbrush className="w-6 sm:w-10 h-6 sm:h-10 text-white absolute bottom-0 right-0 transform translate-x-2 translate-y-2 bg-white/20 rounded-full p-1.5" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-sm mb-2 uppercase tracking-tight">
          Color Solution
        </h2>

        <p className="text-sm sm:text-base font-medium text-white/90 max-w-md sm:max-w-lg mx-auto leading-relaxed">
          Access smart tools to solve everyday color problems.
        </p>
      </div>

      {/* Tools */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
        <p className="text-sm sm:text-base font-medium mb-2 text-white/80 col-span-full text-center">
          Choose a tool to get started
        </p>

        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="block w-full py-3 sm:py-4 px-4 sm:px-6 bg-white text-black font-bold text-base sm:text-lg rounded-full shadow-lg text-center truncate transform transition-transform active:scale-95 hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
