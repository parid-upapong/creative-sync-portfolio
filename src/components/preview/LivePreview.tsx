'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function LivePreview() {
  const { projects, theme } = usePortfolioStore();

  const containerVariants = {
    minimal: "max-w-4xl mx-auto px-8 py-20 font-sans",
    brutalist: "max-w-full p-4 font-mono uppercase",
    classic: "max-w-5xl mx-auto px-12 py-24 font-serif"
  };

  return (
    <div className="w-full h-full bg-[#f9f9f9] overflow-y-auto custom-scrollbar">
      <div className={containerVariants[theme]}>
        <motion.header 
          layout
          className="mb-20 border-b border-black/10 pb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight">Portfolio Registry</h1>
          <p className="text-gray-500 mt-2">Curated by AI Art Director v1.0</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="group relative"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-200 mb-4">
                  <motion.img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <span className="text-xs text-gray-400">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-500">{project.category}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}