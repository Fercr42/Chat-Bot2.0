# 🤖 Chat-Bot 2.0 - Labor Law Consultation Assistant

An intelligent chatbot built with React that uses **OpenAI GPT-4o** to provide consultations about **Costa Rica's Labor Code**. The project maintains conversation context, allows managing multiple simultaneous chats, and offers a smooth user experience with animations and a customizable theme system.

## ✨ Key Features

### 🎯 Functionality

- **Contextual AI Conversation**: Maintains full conversation history for coherent responses
- **Persistent History**: Local storage of conversations with search functionality
- **Multiple Chats**: Management of several simultaneous chats
- **Real-time Search**: Message filtering within the conversation history
- **Copy Messages**: Functionality to copy responses to clipboard

### 🎨 User Experience

- **Dark/Light Theme**: Theme system with localStorage persistence
- **Smooth Animations**: Fluid transitions with Framer Motion
- **Responsive Design**: Adaptable to different screen sizes
- **Loading States**: Visual indicators during API requests
- **Error Handling**: Clear and friendly error messages

### 🏗️ Architecture

- **Custom Hooks**: Reusable logic encapsulated in custom hooks
- **Context API**: Global state management for the theme system
- **Separation of Concerns**: Modular organization (hooks, services, components, styles)
- **Performance Optimization**: Use of `useCallback` and strategic `React.memo` analysis
- **Modular Components**: Scalable and maintainable architecture

## 🛠️ Technologies Used

### Frontend

- **React 19.1.1** - Main framework with Hooks and Context API
- **Vite 7.1.7** - Ultra-fast build tool and dev server
- **TailwindCSS 4.1.13** - Utility-first CSS framework
- **Framer Motion 12.23.22** - Animation library

### State Management & Data

- **TanStack Query 5.90.1** - Server state management, caching, and asynchronous requests
- **React Context API** - Global state for the theme system
- **LocalStorage API** - Browser-based conversation persistence

### Integration

- **OpenAI API (GPT-3.5-turbo)** - Language model for chatbot responses

### Testing & Tools

- **Jest 30.2.0** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Babel** - Transpilation

## 📁 Project Structure

```
my-app/
├── src/
│   ├── components/          # React Components
│   │   ├── chat-component.jsx
│   │   ├── menu-component.jsx
│   │   ├── history-component.jsx
│   │   ├── messages-component.jsx
│   │   └── header-chat.component.jsx
│   ├── context/             # Context API
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom Hooks
│   │   ├── use-query-chat.hook.jsx
│   │   ├── use-localStorage-chat.hook.jsx
│   │   └── useTheme-hook.jsx
│   ├── services/            # Services and Configuration
│   │   └── env-services.js
│   ├── shared/              # Shared Components
│   │   ├── button.component.jsx
│   │   └── input.component.jsx
│   ├── styles/              # Styles and Themes
│   │   └── chat-styles.js
│   └── test/                # Tests
│       ├── components/
│       ├── hooks/
│       └── services/
├── package.json
└── vite.config.js
```

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Chat-Bot2.0
```

2. **Install dependencies**

```bash
cd my-app
npm install
```

3. **Configure environment variables**

   - Create a `.env` file in the project root `my-app/`
   - Add your OpenAI API key:

   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
   ```

4. **Start the development server**

```bash
npm run dev
```

5. **Open in browser**
   - The application will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🎯 Usage

1. **Create a new chat**: Click on "Create new chat" from the main menu
2. **Send messages**: Type your question about Labor Code and press send
3. **Search conversations**: Use the search bar to filter messages
4. **Manage chats**: Access the history to load or delete previous conversations
5. **Change theme**: Use the theme button in the menu to toggle between light and dark mode

## 🧪 Testing

The project includes unit tests for components, hooks, and services:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🏛️ Architecture & Patterns

### Custom Hooks

- **`useQueryChat`**: Handles OpenAI API requests with React Query
- **`useLocalStorageChat`**: Manages local storage of conversations
- **`useTheme`**: Custom hook to access the theme context

### Context API

- **`ThemeContext`**: Provides global theme state to the entire application

### Optimizations

- **`useCallback`**: Function memoization to prevent unnecessary re-renders
- **`React.memo` Analysis**: Strategic evaluation of when to use memoization

### Separation of Concerns

- **Components**: Only handle presentation
- **Hooks**: Contain business logic
- **Services**: Configuration and communication with external APIs
- **Styles**: Centralized styles and themes

## 🔧 Configuration

### Environment Variables

The `src/services/env-services.js` file handles API configuration:

```javascript
export default {
  ChatApiConfig: {
    url: import.meta.env.VITE_OPENAI_API_URL,
    key: import.meta.env.VITE_OPENAI_API_KEY,
  },
};
```

## 📦 Production Build

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder. You can preview the build with:

```bash
npm run preview
```

## 🎓 Implemented Concepts

- ✅ React Hooks (useState, useEffect, useCallback, useContext)
- ✅ Custom Hooks Pattern
- ✅ Context API and Provider Pattern
- ✅ Component Composition
- ✅ Server State Management with TanStack Query
- ✅ Local Storage Persistence
- ✅ Performance Optimization
- ✅ Error Handling
- ✅ Loading States
- ✅ Responsive Design
- ✅ Animation Libraries

## 📄 License

This project is private and intended solely for educational and portfolio purposes.

## 👤 Author

Developed as a personal project to demonstrate skills in React, API integration, and modern application architecture.

---

⭐ If you find this project useful, consider giving it a star on GitHub.
