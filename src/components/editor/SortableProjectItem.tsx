'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Garnish, GripVertical, Image as ImageIcon } from 'lucide-react';
import { Project } from '@/store/usePortfolioStore';

export function SortableProjectItem({ project }: { project: Project }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-4 p-3 mb-2 bg-white border rounded-xl shadow-sm transition-all ${
        isDragging ? 'opacity-50 scale-105 border-blue-500' : 'hover:border-gray-400'
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400">
        <GripVertical size={20} />
      </button>
      
      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{project.title}</h4>
        <p className="text-xs text-gray-500">{project.category}</p>
      </div>
    </div>
  );
}