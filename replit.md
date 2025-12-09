# News Explorer Frontend

## Overview

News Explorer is a React-based frontend application for searching and saving news articles. Built as part of a bootcamp project, it provides a clean interface for users to search news via an external API, view results, and save articles to their personal collection. The application features user authentication flows and responsive design for various screen sizes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with functional components
- **Vite** as the build tool and development server (configured on port 5000)
- **React Router DOM v6** for client-side routing

### Component Structure
The application follows a component-based architecture with CSS modules for styling:

- **Layout Components**: Header, Footer, Navigation - provide consistent page structure
- **Feature Components**: 
  - SearchForm - handles news search input
  - SearchResults - displays search results with pagination
  - NewsCard/NewsCardList - article display cards with bookmark functionality
  - SavedNews/SavedNewsHeader - user's saved articles section
  - About - informational section about the application
- **UI Components**:
  - Preloader - loading state indicator
  - PopupWithForm/ModalWithForm - reusable modal dialogs
  - LoginPopup - authentication modal

### Styling Approach
- Component-scoped CSS files (each component has its own .css file)
- Custom fonts (Inter, Roboto, Roboto Slab) loaded via @font-face
- CSS custom properties for consistent theming
- Mobile-responsive breakpoints (primarily at 900px and 640px)

### State Management
Currently uses React's built-in state management. No external state library is configured.

### Routing Structure
The application appears to have at least two main routes:
- Main/Home page with search functionality
- Saved articles page for authenticated users

## External Dependencies

### Runtime Dependencies
- **react** (^18.3.1) - UI library
- **react-dom** (^18.3.1) - React DOM renderer
- **react-router-dom** (^6.28.0) - Client-side routing

### Development Dependencies
- **vite** (^5.4.2) - Build tool and dev server
- **@vitejs/plugin-react** - React support for Vite
- **eslint** with react-hooks and react-refresh plugins - Code linting

### External APIs
The application is designed to integrate with:
- A **News API** for fetching news articles (implementation in `src/utils`)
- A **Backend API** for user authentication and saved articles management (not yet visible in current structure)

### Assets
- Custom web fonts (Inter, Roboto families) stored in `src/vendor/fonts`
- Static images in `src/images` including hero background and icons