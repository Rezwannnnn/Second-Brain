import { Pin, Trash2, Edit, Calendar } from 'lucide-react';
import type { Note } from '../types';
import { themes } from '../themes';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  layout: 'grid' | 'list';
  currentTheme: string;
}

export default function NoteCard({ note, onEdit, onDelete, onPin, layout, currentTheme }: NoteCardProps) {
  const theme = themes[currentTheme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div
      className={`rounded-xl p-5 shadow-lg transition-all hover:shadow-xl relative group ${
        layout === 'list' ? 'mb-3' : ''
      }`}
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        color: theme.text,
      }}
    >
      {/* Pin Badge */}
      {note.isPinned && (
        <div
          className="absolute top-3 right-3 p-1.5 rounded-full"
          style={{ backgroundColor: theme.primary }}
        >
          <Pin size={14} className="text-white" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 pr-8" style={{ color: theme.primary }}>
        {note.title || 'Untitled Note'}
      </h3>

      {/* Content Preview */}
      <p className="opacity-70 mb-4 line-clamp-3">
        {stripHtml(note.content).substring(0, 150)}
        {stripHtml(note.content).length > 150 ? '...' : ''}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: theme.accent,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between opacity-60 text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formatDate(note.updatedAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onPin(note.id)}
            className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
            style={{ color: note.isPinned ? theme.primary : theme.text }}
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin size={16} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
            style={{ color: theme.text }}
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 rounded-lg hover:bg-opacity-20 transition-all text-red-500"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
