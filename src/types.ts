export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  tags: string[];
  isPinned: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  category?: string;
  tags: string[];
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface UserSettings {
  theme: string;
  layout: 'grid' | 'list';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
}

export type ViewMode = 'notes' | 'tasks' | 'all';
