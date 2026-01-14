import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface PortfolioState {
  projects: Project[];
  theme: 'minimal' | 'brutalist' | 'classic';
  accentColor: string;
  setProjects: (projects: Project[]) => void;
  reorderProjects: (activeId: string, overId: string) => void;
  updateTheme: (theme: PortfolioState['theme']) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  projects: [
    { id: '1', title: 'Abstract Geometry', category: 'Digital Art', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
    { id: '2', title: 'Urban Silence', category: 'Photography', imageUrl: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=80' },
    { id: '3', title: 'Future Interface', category: 'UI/UX', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80' },
  ],
  theme: 'minimal',
  accentColor: '#000000',
  
  setProjects: (projects) => set({ projects }),
  
  reorderProjects: (activeId, overId) => set((state) => {
    const oldIndex = state.projects.findIndex((p) => p.id === activeId);
    const newIndex = state.projects.findIndex((p) => p.id === overId);
    return {
      projects: arrayMove(state.projects, oldIndex, newIndex),
    };
  }),

  updateTheme: (theme) => set({ theme }),
}));