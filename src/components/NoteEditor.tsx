import { useState, useEffect } from 'react';
import { X, Save, Tag as TagIcon } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import type { Note } from '../types';
import { themes } from '../themes';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  currentTheme: string;
}

export default function NoteEditor({ note, onSave, onClose, currentTheme }: NoteEditorProps) {
  const theme = themes[currentTheme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  const [title, setTitle] = useState(note?.title || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your note...',
      }),
    ],
    content: note?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
        style: `color: ${theme.text}`,
      },
    },
  });

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content);
    }
  }, [note, editor]);

  const handleSave = () => {
    if (!editor) return;

    const content = editor.getHTML();
    onSave({
      title: title || 'Untitled Note',
      content,
      tags,
      updatedAt: new Date(),
      isPinned: note?.isPinned || false,
    });
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        style={{ backgroundColor: theme.surface, color: theme.text }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="text-2xl font-bold bg-transparent border-none outline-none flex-1"
            style={{ color: theme.primary }}
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg opacity-70 hover:opacity-100 transition-all"
            style={{ color: theme.text }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-6">
          <EditorContent editor={editor} />
        </div>

        {/* Tags Section */}
        <div className="p-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-2 mb-3">
            <TagIcon size={18} className="opacity-70" />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tags..."
              className="flex-1 px-3 py-2 rounded-lg border outline-none"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: theme.text,
              }}
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={{ backgroundColor: theme.accent, color: '#fff' }}
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: theme.accent,
                  }}
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:opacity-70"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium opacity-70 hover:opacity-100 transition-all"
            style={{ color: theme.text }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all"
            style={{ backgroundColor: theme.primary, color: '#fff' }}
          >
            <Save size={18} />
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
