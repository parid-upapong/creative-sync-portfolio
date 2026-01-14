'use client';
import React from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { SortableProjectItem } from '@/components/editor/SortableProjectItem';
import { LivePreview } from '@/components/preview/LivePreview';
import { LayoutPanelLeft, Sparkles, Send } from 'lucide-react';

export default function EditorPage() {
  const { projects, reorderProjects, theme, updateTheme } = usePortfolioStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      reorderProjects(active.id, over.id);
    }
  };

  return (
    <main className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Editor */}
      <aside className="w-80 border-r bg-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <span>GENESIS</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-8">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
              Visual Direction
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['minimal', 'brutalist', 'classic'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => updateTheme(t)}
                  className={`py-2 text-[10px] border rounded-md capitalize transition-all ${
                    theme === t ? 'bg-black text-white border-black' : 'hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
            Project Structure
          </label>
          
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={projects} strategy={verticalListSortingStrategy}>
              {projects.map((project) => (
                <SortableProjectItem key={project.id} project={project} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
            <Send size={16} />
            Publish Portfolio
          </button>
        </div>
      </aside>

      {/* Live Preview Pane */}
      <section className="flex-1 relative bg-gray-200 p-8 flex items-center justify-center">
        <div className="w-full h-full bg-white shadow-2xl rounded-sm overflow-hidden border border-gray-300">
           <LivePreview />
        </div>
        
        {/* Floating Tooltip */}
        <div className="absolute bottom-12 right-12 bg-black text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg animate-bounce">
          <Sparkles size={14} />
          AI is syncing your changes in real-time
        </div>
      </section>
    </main>
  );
}