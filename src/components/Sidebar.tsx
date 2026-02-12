import { 
  Home, FileText, CheckSquare, Settings, Plus, Grid, List
} from 'lucide-react';
import type { ViewMode } from '../types';
import { themes } from '../themes';

interface SidebarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNewNote: () => void;
  onNewTask: () => void;
  onSettingsOpen: () => void;
  currentTheme: string;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
}

export default function Sidebar({
  viewMode,
  onViewModeChange,
  onNewNote,
  onNewTask,
  onSettingsOpen,
  currentTheme,
  layout,
  onLayoutChange,
}: SidebarProps) {
  const theme = themes[currentTheme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  return (
    <div 
      className="w-64 h-screen flex flex-col border-r"
      style={{ 
        backgroundColor: theme.surface,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        color: theme.text 
      }}
    >
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.primary }}>
          Second Brain
        </h1>
        <p className="text-sm opacity-70">Your personal knowledge hub</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <button
          onClick={() => onViewModeChange('all')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            viewMode === 'all' ? 'font-medium' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: viewMode === 'all' ? theme.primary : 'transparent',
            color: viewMode === 'all' ? '#fff' : theme.text,
          }}
        >
          <Home size={20} />
          <span>All Items</span>
        </button>

        <button
          onClick={() => onViewModeChange('notes')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            viewMode === 'notes' ? 'font-medium' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: viewMode === 'notes' ? theme.primary : 'transparent',
            color: viewMode === 'notes' ? '#fff' : theme.text,
          }}
        >
          <FileText size={20} />
          <span>Notes</span>
        </button>

        <button
          onClick={() => onViewModeChange('tasks')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            viewMode === 'tasks' ? 'font-medium' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: viewMode === 'tasks' ? theme.primary : 'transparent',
            color: viewMode === 'tasks' ? '#fff' : theme.text,
          }}
        >
          <CheckSquare size={20} />
          <span>Tasks</span>
        </button>

        <div className="h-px my-4 opacity-20" style={{ backgroundColor: theme.text }} />

        {/* Quick Actions */}
        <div className="space-y-2">
          <button
            onClick={onNewNote}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg opacity-70 hover:opacity-100 transition-all"
            style={{ color: theme.text }}
          >
            <Plus size={20} />
            <span>New Note</span>
          </button>

          <button
            onClick={onNewTask}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg opacity-70 hover:opacity-100 transition-all"
            style={{ color: theme.text }}
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>
      </nav>

      {/* Bottom Controls */}
      <div className="p-3 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm opacity-70">Layout</span>
          <div className="flex gap-1">
            <button
              onClick={() => onLayoutChange('grid')}
              className={`p-2 rounded transition-all ${layout === 'grid' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              style={{ color: theme.text }}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => onLayoutChange('list')}
              className={`p-2 rounded transition-all ${layout === 'list' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              style={{ color: theme.text }}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <button
          onClick={onSettingsOpen}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg opacity-70 hover:opacity-100 transition-all"
          style={{ color: theme.text }}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
