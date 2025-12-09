# News Explorer Frontend

## Overview

News Explorer is a React-based frontend application for searching and saving news articles. Built as part of a bootcamp project, it provides a clean interface for users to search news via an external API, view results, and save articles to their personal collection. The application features user authentication flows and responsive design for various screen sizes.

## Recent Changes (December 2024)

- **Saved News Page (Saved_News_Logged_In)**: Complete implementation with:
  - SavedNewsHeader with white background, "Artigos salvos" eyebrow, user name display
  - Shows "{userName}, você tem X artigos salvos" heading
  - Keywords list (2 shown, rest as "e X outras")
  - NewsCard with keyword tag (top-left) and trash icon for saved page
  - "Remove from saved" tooltip on trash hover
  - Gray background (#F5F6F7) for cards section
- **Main_Logged_In**: Navigation with user button showing logged-in user name, logout functionality
- **Main_Results_Logged_In**: Bookmark cards functionality, blue filled bookmark for saved articles
- **Main_Results_Loading**: Spinner with "Procurando notícias..." text
- **Main_Results_No_Results**: "Nada encontrado" with sad face icon
- **Search Results Section**: Implemented Main_Results_Not_Logged_In with:
  - NewsCard (400x576px) with proper layout: date, title, description, source
  - 3-column grid layout with responsive breakpoints
  - "Mostrar mais" pagination (3 cards initially)
  - Tooltip "Sign in to save articles" for non-logged users
- **SignupPopup**: Registration form with email, password, username validation
- **SignupSuccessPopup**: Success message with "Entrar" link
- **Header**: Added subtle bottom border line for visual separation
- **Hero Section**: Centered all content (title, subtitle, search form)
- **Subtitle text**: Updated to "Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal."
- **Search placeholder**: Changed to "Inserir tema"
- **About Section**: Updated texts to match Figma design
- **Footer**: Adjusted styling (copyright color, link colors)
- **Vite config**: Configured with allowedHosts for Replit deployment

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
  - SearchResults - displays search results with pagination (3 cards per page)
  - NewsCard/NewsCardList - article display cards with bookmark functionality and tooltip
  - SavedNews/SavedNewsHeader - user's saved articles section
  - About - informational section about the application
- **UI Components**:
  - Preloader - loading state indicator
  - PopupWithForm/ModalWithForm - reusable modal dialogs
  - LoginPopup - authentication modal
  - SignupPopup - registration modal
  - SignupSuccessPopup - registration success message

### Styling Approach
- Component-scoped CSS files (each component has its own .css file)
- Custom fonts (Inter, Roboto, Roboto Slab, Source Sans Pro) loaded via @font-face
- CSS custom properties for consistent theming
- Mobile-responsive breakpoints (1280px, 960px, 880px, 768px, 640px, 480px)
- Figma design specs: colors #1A1B22, #B6BCBF, #2F71E5, #F5F6F7

### State Management
Currently uses React's built-in state management:
- isLoggedIn - user authentication status
- currentUser - { name: 'username' } or null
- registeredUser - stores registered user info for login
- results - search results array
- isLoading - loading state for search
- hasSearched - tracks if search was performed (for NotFound display)
- userSavedCards - array of saved card objects
- savedCardIds - derived array of saved card IDs
- isLoginOpen, isSignupOpen, isSignupSuccessOpen - popup visibility states

### Routing Structure
- Main/Home page (/) with search functionality and results
- Saved articles page (/saved-news) for authenticated users

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
- A **Backend API** for user authentication and saved articles management

### Assets
- Custom web fonts (Inter, Roboto families) stored in `src/vendor/fonts`
- Static images in `src/images` including hero background, icons (bookmark, close-button)
