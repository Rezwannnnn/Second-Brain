import { CheckCircle2, Circle, Trash2, Edit, Calendar, Flag } from 'lucide-react';
import type { Task } from '../types';
import { themes } from '../themes';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  layout: 'grid' | 'list';
  currentTheme: string;
}

export default function TaskCard({ task, onEdit, onDelete, onToggle, layout, currentTheme }: TaskCardProps) {
  const theme = themes[currentTheme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return theme.text;
    }
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
        opacity: task.completed ? 0.6 : 1,
      }}
    >
      {/* Priority Badge */}
      <div
        className="absolute top-3 right-3 p-1.5 rounded-full"
        style={{ backgroundColor: getPriorityColor(task.priority) }}
      >
        <Flag size={14} className="text-white" />
      </div>

      {/* Checkbox and Title */}
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 flex-shrink-0"
          style={{ color: theme.primary }}
        >
          {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${task.completed ? 'line-through opacity-70' : ''}`}
            style={{ color: theme.primary }}
          >
            {task.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="opacity-70 mb-4 ml-9 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 ml-9">
          {task.tags.map((tag, index) => (
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
      <div className="flex items-center justify-between opacity-60 text-sm ml-9">
        <div className="flex items-center gap-4">
          {task.dueDate && (
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: getPriorityColor(task.priority), color: '#fff' }}>
            {task.priority}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
            style={{ color: theme.text }}
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
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
