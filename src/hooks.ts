import { useState } from 'react';
import type { Note, Task, UserSettings } from './types';

const STORAGE_KEYS = {
  NOTES: 'secondbrain_notes',
  TASKS: 'secondbrain_tasks',
  SETTINGS: 'secondbrain_settings',
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useNotes() {
  return useLocalStorage<Note[]>(STORAGE_KEYS.NOTES, []);
}

export function useTasks() {
  return useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);
}

export function useSettings() {
  return useLocalStorage<UserSettings>(STORAGE_KEYS.SETTINGS, {
    theme: 'ocean',
    layout: 'grid',
    fontSize: 'medium',
    compactMode: false,
  });
}
