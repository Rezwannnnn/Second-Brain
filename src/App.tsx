import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import NoteCard from './components/NoteCard';
import TaskCard from './components/TaskCard';
import NoteEditor from './components/NoteEditor';
import TaskEditor from './components/TaskEditor';
import SettingsModal from './components/SettingsModal';
import { useNotes, useTasks, useSettings } from './hooks';
import type { Note, Task, ViewMode } from './types';
import { themes } from './themes';

function App() {
  const [notes, setNotes] = useNotes();
  const [tasks, setTasks] = useTasks();
  const [settings, setSettings] = useSettings();
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [isTaskEditorOpen, setIsTaskEditorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const theme = themes[settings.theme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  // Note operations
  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    if (editingNote) {
      setNotes(notes.map(n => 
        n.id === editingNote.id 
          ? { ...noteData, id: n.id, createdAt: n.createdAt }
          : n
      ));
    } else {
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setNotes([newNote, ...notes]);
    }
    setEditingNote(null);
    setIsNoteEditorOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const handlePinNote = (id: string) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsNoteEditorOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setIsNoteEditorOpen(true);
  };

  // Task operations
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? { ...taskData, id: t.id, createdAt: t.createdAt }
          : t
      ));
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setTasks([newTask, ...tasks]);
    }
    setEditingTask(null);
    setIsTaskEditorOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskEditorOpen(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsTaskEditorOpen(true);
  };

  // Filter and search
  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const shouldShowNotes = viewMode === 'all' || viewMode === 'notes';
  const shouldShowTasks = viewMode === 'all' || viewMode === 'tasks';

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <div 
      className={`flex h-screen ${getFontSizeClass()}`}
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Sidebar */}
      <Sidebar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNewNote={handleNewNote}
        onNewTask={handleNewTask}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        currentTheme={settings.theme}
        layout={settings.layout}
        onLayoutChange={(layout) => setSettings({ ...settings, layout })}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header 
          className="border-b p-6"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50" 
                  size={20} 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes, tasks, and tags..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: theme.text,
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNewNote}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
                style={{ backgroundColor: theme.primary, color: '#fff' }}
              >
                <Plus size={20} />
                New Note
              </button>
              <button
                onClick={handleNewTask}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
                style={{ backgroundColor: theme.accent, color: '#fff' }}
              >
                <Plus size={20} />
                New Task
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Empty State */}
            {filteredNotes.length === 0 && filteredTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] opacity-50">
                <div className="text-6xl mb-4">🧠</div>
                <h2 className="text-2xl font-bold mb-2">Your Second Brain Awaits</h2>
                <p className="text-center max-w-md mb-6">
                  {searchQuery 
                    ? 'No results found. Try a different search term.'
                    : 'Start building your knowledge base by creating notes and tasks.'}
                </p>
                {!searchQuery && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleNewNote}
                      className="px-6 py-3 rounded-xl font-medium"
                      style={{ backgroundColor: theme.primary, color: '#fff' }}
                    >
                      Create First Note
                    </button>
                    <button
                      onClick={handleNewTask}
                      className="px-6 py-3 rounded-xl font-medium"
                      style={{ backgroundColor: theme.accent, color: '#fff' }}
                    >
                      Create First Task
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Notes Section */}
            {shouldShowNotes && filteredNotes.length > 0 && (
              <div className={settings.compactMode ? 'mb-6' : 'mb-12'}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.primary }}>
                  📝 Notes
                  <span className="text-sm opacity-50 font-normal">({filteredNotes.length})</span>
                </h2>
                <div className={
                  settings.layout === 'grid'
                    ? `grid gap-${settings.compactMode ? '4' : '6'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
                    : 'space-y-4'
                }>
                  {filteredNotes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onPin={handlePinNote}
                      layout={settings.layout}
                      currentTheme={settings.theme}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Section */}
            {shouldShowTasks && filteredTasks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.primary }}>
                  ✅ Tasks
                  <span className="text-sm opacity-50 font-normal">
                    ({filteredTasks.filter(t => !t.completed).length} active)
                  </span>
                </h2>
                <div className={
                  settings.layout === 'grid'
                    ? `grid gap-${settings.compactMode ? '4' : '6'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
                    : 'space-y-4'
                }>
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onToggle={handleToggleTask}
                      layout={settings.layout}
                      currentTheme={settings.theme}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {isNoteEditorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setIsNoteEditorOpen(false);
            setEditingNote(null);
          }}
          currentTheme={settings.theme}
        />
      )}

      {isTaskEditorOpen && (
        <TaskEditor
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsTaskEditorOpen(false);
            setEditingTask(null);
          }}
          currentTheme={settings.theme}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
