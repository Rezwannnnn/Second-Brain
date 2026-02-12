# Second Brain - Feature Documentation

## Overview
Second Brain is a modern, aesthetic personal knowledge management system built with React, TypeScript, and Tailwind CSS. It provides a beautiful alternative to Notion and Lunatask with enhanced personalization options.

## Core Features

### 1. Note-Taking System
- **Rich Text Editor**: Built with TipTap, supports formatting, lists, and more
- **Tagging**: Organize notes with custom tags
- **Pinning**: Pin important notes to keep them at the top
- **Search**: Full-text search across titles, content, and tags
- **Timestamps**: Automatic creation and update timestamps

### 2. Task Management
- **Priority Levels**: Low (green), Medium (orange), High (red)
- **Due Dates**: Optional deadline tracking
- **Completion**: Check off tasks with visual feedback
- **Description**: Rich descriptions for detailed task information
- **Filtering**: Tasks sorted by completion status

### 3. Personalization

#### Themes (6 Options)
1. **Ocean**: Blue tones (#0ea5e9, #06b6d4, #3b82f6)
2. **Sunset**: Orange/Red (#f59e0b, #ef4444, #ec4899)
3. **Forest**: Green tones (#10b981, #059669, #34d399)
4. **Lavender**: Purple hues (#a855f7, #8b5cf6, #c084fc)
5. **Light**: White background with colorful accents
6. **Dark**: Dark background with bright accents

#### Layout Options
- **Grid View**: Cards displayed in a responsive grid
- **List View**: Cards displayed in a vertical list

#### Font Sizes
- **Small**: Compact text for more content
- **Medium**: Balanced (default)
- **Large**: Enhanced readability

#### Display Settings
- **Compact Mode**: Reduced spacing for denser layouts
- **Normal Mode**: Comfortable spacing (default)

### 4. User Interface

#### Sidebar Navigation
- View all items, notes only, or tasks only
- Quick action buttons for creating notes/tasks
- Layout toggle (Grid/List)
- Settings access

#### Main Content Area
- Search bar with real-time filtering
- Quick action buttons in header
- Empty state with helpful prompts
- Smooth animations and transitions

#### Modals
- **Note Editor**: Full-screen editor with rich text
- **Task Editor**: Form-based task creation
- **Settings**: Theme and preference customization

### 5. Data Management
- **Local Storage**: All data stored in browser
- **Auto-Save**: Changes saved immediately
- **Privacy**: No server communication
- **Persistence**: Data survives page reloads

## Technical Details

### Architecture
- **Component-Based**: Modular React components
- **Type-Safe**: Full TypeScript coverage
- **Hooks**: Custom hooks for state management
- **Responsive**: Mobile-first design

### Performance
- **Fast Loading**: Vite for instant dev server
- **Optimized Build**: Production-ready bundles
- **Lazy Loading**: Components loaded on demand
- **Minimal Dependencies**: Only essential packages

### Accessibility
- **Semantic HTML**: Proper element usage
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant colors
- **Focus Management**: Clear focus indicators

## Usage Guide

### Creating a Note
1. Click "New Note" button
2. Enter a title
3. Write content using the rich text editor
4. Add tags (optional)
5. Click "Save Note"

### Creating a Task
1. Click "New Task" button
2. Enter title and description
3. Set priority level
4. Choose due date (optional)
5. Add tags (optional)
6. Click "Save Task"

### Customizing Appearance
1. Click "Settings" in sidebar
2. Choose a theme from 6 options
3. Select font size
4. Toggle compact mode
5. Click "Done"

### Searching Content
1. Type in the search bar
2. Results filter in real-time
3. Search works across titles, content, and tags

### Organizing Content
- **View Modes**: Switch between All/Notes/Tasks
- **Layouts**: Toggle Grid/List view
- **Pin Notes**: Click pin icon on important notes
- **Tags**: Add tags for categorization

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with localStorage support

## Future Enhancements (Optional)
- Export/Import functionality
- Cloud sync option
- Markdown export
- Additional themes
- Collaboration features
- Mobile apps

## License
MIT License - Open source and free to use
