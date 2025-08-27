# Vue.js Professional Chat System

A modern, professional chat application built with Vue.js 3, Tailwind CSS, and following Vue.js best practices. Features real-time messaging simulation, file sharing, and responsive design.

## ✨ Tech Stack

- **Vue.js 3** - Modern JavaScript framework with Composition API
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3** - Utility-first CSS framework  
- **ES Modules** - Modern JavaScript module system

## 🏗️ Project Structure (Vue.js Best Practices)

```
src/
├── assets/
│   └── styles/
│       └── main.css                 # Tailwind CSS configuration
├── components/
│   └── chat/                        # Feature-based component organization
│       ├── ChatRoomList.vue         # Room selection component
│       ├── ChatWindow.vue           # Main chat interface
│       ├── MessageItem.vue          # Individual message display
│       ├── MessageInput.vue         # Message input with file upload
│       └── MediaPreview.vue         # Media file preview component
├── composables/                     # Reusable business logic
│   ├── useChat.js                   # Chat state management
│   └── useRoom.js                   # Room-related utilities
├── data/                           # Static data files
│   └── dummy.json                   # Chat data
├── lib/                            # Utility functions
│   └── utils.js                     # Pure utility functions
├── views/                          # Page-level components
│   └── ChatApp.vue                  # Main chat application
├── App.vue                         # Root component
└── main.js                         # Application entry point
```

## ✅ Key Improvements Made

### **1. Fixed Tailwind CSS Configuration**
- ✅ Proper Tailwind CSS v3 installation (not v4 beta)
- ✅ Correct PostCSS configuration
- ✅ Working utility classes and responsive design
- ✅ Custom component classes in `@layer components`

### **2. Vue.js Best Practices Folder Structure**
- ✅ **Feature-based organization** - Components grouped by functionality
- ✅ **Clear separation of concerns** - Views, components, composables, utils
- ✅ **Proper naming conventions** - Descriptive and consistent naming
- ✅ **Path aliasing** - `@/` alias for clean imports

### **3. Modern Vue.js Patterns**
- ✅ **Composition API** - All components use `<script setup>`
- ✅ **Composables** - Reusable business logic extraction
- ✅ **Clean imports** - Organized import statements with aliases
- ✅ **TypeScript ready** - Proper prop definitions for easy TS migration

### **4. Professional Design System**
- ✅ **Consistent styling** - Tailwind CSS utility classes
- ✅ **Component system** - Reusable avatar, button, status classes
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Modern UI** - Clean, professional appearance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Features

### **Core Functionality**
- **4 Chat Rooms**: 1 Group chat + 3 Single chats with proper naming
- **Smart Single Chat**: Shows contact names directly (not "Chat with X")
- **Auto-read Messages**: Messages marked as read when opening chat
- **Unread Counters**: Badges that disappear when chat is opened
- **File Attachments**: Upload and preview images, videos, documents

### **Professional Features**  
- **Message Status**: Visual indicators (✓, ✓✓, ✓✓ blue)
- **User Presence**: Online/offline status with last seen
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Professional Tailwind CSS styling
- **Touch Optimized**: Mobile-friendly interactions

## 🎨 Design System

### **Tailwind CSS Classes**
```css
/* Avatar sizes */
.avatar-sm    /* w-8 h-8 - Small avatars in messages */
.avatar-md    /* w-10 h-10 - Medium avatars in headers */  
.avatar-lg    /* w-12 h-12 - Large avatars in profile */

/* Message bubbles */
.chat-bubble       /* Base bubble styling */
.chat-bubble-own   /* User's own messages (blue) */
.chat-bubble-other /* Other users' messages (white) */

/* Status indicators */
.status-indicator  /* Base status dot */
.status-online     /* Green for online */
.status-offline    /* Gray for offline */
```

### **Color Palette**
```javascript
primary: {
  500: '#3b82f6', // Primary blue for actions
  600: '#2563eb', // Darker blue for hover states
}
```

## 🔧 Technical Architecture

### **Composables Pattern**
```javascript
// useChat.js - Centralized state management
export function useChat() {
  const currentRoom = ref(null)
  const rooms = ref([])
  const currentUser = ref(null)
  
  const selectRoom = (room) => {
    currentRoom.value = room
    markRoomAsRead(room) // Auto-read functionality
  }
  
  return {
    currentRoom, rooms, currentUser,
    selectRoom, sendMessage, markRoomAsRead
  }
}
```

### **Component Communication**
```javascript
// Parent-child communication via props and events
<ChatRoomList 
  :rooms="chat.rooms.value" 
  :current-user="chat.currentUser.value"
  @select-room="chat.selectRoom" 
/>
```

### **Path Aliasing**
```javascript
// Clean imports with @ alias
import ChatRoomList from '@/components/chat/ChatRoomList.vue'
import { useChat } from '@/composables/useChat.js'
import { formatTime } from '@/lib/utils.js'
```

## 📊 Data Structure

The chat system uses a comprehensive JSON structure:

```json
{
  "current_user": {
    "id": "user@mail.com",
    "name": "Regular User", 
    "role": 3,
    "avatar_url": "https://picsum.photos/id/64/100/100"
  },
  "rooms": [
    {
      "id": 12456,
      "name": "Product A - Group Chat",
      "type": "group",
      "participants": [...],
      "messages": [...],
      "unread_count": 3,
      "last_message": {...}
    }
  ]
}
```

## 🚀 Development Workflow

### **Development Server**
```bash
npm run dev  # Starts Vite dev server at localhost:3000
```

### **File Structure Benefits**
- **Scalability** - Easy to add new features and components
- **Maintainability** - Clear separation of concerns
- **Reusability** - Composables and utilities can be reused
- **Team Development** - Multiple developers can work without conflicts

## 🔍 Testing

### **Features to Test**
1. **Room Navigation** - Click between different chat rooms
2. **Auto-read Functionality** - Unread badges disappear when opening chats
3. **Message Sending** - Send text messages and watch status progression  
4. **File Upload** - Test image, video, and document attachments
5. **Responsive Design** - Test on different screen sizes
6. **Single Chat Display** - Verify contact names show correctly

## 📈 Performance Benefits

- **Vite Fast HMR** - Instant hot module replacement
- **Optimized Builds** - Tree-shaking and code splitting
- **Modern CSS** - Utility-first approach reduces bundle size
- **Lazy Loading** - Components loaded on demand

## 🛠️ Configuration Files

### **Vite Configuration**
```javascript
// vite.config.js - Path aliasing and Vue support
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

### **Tailwind Configuration**  
```javascript
// tailwind.config.js - Custom colors and plugins
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: { 500: '#3b82f6' } }
    }
  }
}
```

---

**✅ Aplikasi sudah siap digunakan di `http://localhost:3000`**

*Struktur folder yang rapih, Tailwind CSS yang bekerja sempurna, dan Vue.js best practices yang diimplementasikan dengan baik!*