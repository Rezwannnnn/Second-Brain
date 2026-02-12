import { X, Palette, Type, Layout } from 'lucide-react';
import type { UserSettings } from '../types';
import { themes } from '../themes';

interface SettingsModalProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
  onClose: () => void;
}

export default function SettingsModal({ settings, onSettingsChange, onClose }: SettingsModalProps) {
  const theme = themes[settings.theme] || themes.ocean;
  const isDark = theme.background === '#0f172a' || theme.background === '#1c1917' || 
                theme.background === '#064e3b' || theme.background === '#1e1b4b';

  const handleThemeChange = (themeName: string) => {
    onSettingsChange({ ...settings, theme: themeName });
  };

  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    onSettingsChange({ ...settings, fontSize });
  };

  const handleCompactModeToggle = () => {
    onSettingsChange({ ...settings, compactMode: !settings.compactMode });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-2xl"
        style={{ backgroundColor: theme.surface, color: theme.text }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg opacity-70 hover:opacity-100 transition-all"
            style={{ color: theme.text }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Theme Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette size={20} style={{ color: theme.primary }} />
              <h3 className="text-lg font-semibold">Theme</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(themes).map(([key, themeOption]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.theme === key ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: themeOption.surface,
                    borderColor: settings.theme === key ? theme.primary : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: themeOption.primary }}
                    />
                    <span className="font-medium" style={{ color: themeOption.text }}>
                      {themeOption.name}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="w-full h-2 rounded"
                      style={{ backgroundColor: themeOption.primary }}
                    />
                    <div
                      className="w-full h-2 rounded"
                      style={{ backgroundColor: themeOption.secondary }}
                    />
                    <div
                      className="w-full h-2 rounded"
                      style={{ backgroundColor: themeOption.accent }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Type size={20} style={{ color: theme.primary }} />
              <h3 className="text-lg font-semibold">Font Size</h3>
            </div>
            <div className="flex gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                    settings.fontSize === size ? 'font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: settings.fontSize === size ? theme.primary : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: settings.fontSize === size ? theme.primary : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: settings.fontSize === size ? '#fff' : theme.text,
                  }}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Mode */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layout size={20} style={{ color: theme.primary }} />
              <h3 className="text-lg font-semibold">Display</h3>
            </div>
            <button
              onClick={handleCompactModeToggle}
              className="w-full flex items-center justify-between p-4 rounded-lg border transition-all"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            >
              <div>
                <div className="font-medium mb-1">Compact Mode</div>
                <div className="text-sm opacity-70">Reduce spacing for more content</div>
              </div>
              <div
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.compactMode ? '' : 'opacity-50'
                }`}
                style={{ backgroundColor: settings.compactMode ? theme.primary : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.compactMode ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </div>
            </button>
          </div>

          {/* Info */}
          <div className="pt-4 border-t opacity-70 text-sm" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <p>Second Brain - Your Personal Knowledge Management System</p>
            <p className="mt-2">All data is stored locally in your browser.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: theme.primary, color: '#fff' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
