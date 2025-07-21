# ProductHub - Frontend Assignment

A modern React-based product catalog application with user authentication, product browsing, searching, filtering, and pagination. Built with React 19, TypeScript, and Vite.

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)
- [Limitations](#limitations)

## ✨ Features

- **Authentication**:
  - Login with form validation
  - JWT token handling and session management
  - Protected routes
  - Social login buttons **`(⚠️ UI ONLY - NOT FUNCTIONAL)`**

- **Product Dashboard**:
  - Product listing with "Load More" pagination
  - Search functionality with debounce for better performance
  - Sorting by name, price, and rating
  - Category filtering
  - Responsive grid layout

- **UI Components**:
  - Modern header with search and user profile
  - Product cards with key information
  - Toast notifications for user feedback
  - Loading states and error handling with ErrorBoundary

## 📸 Screenshots

> ### ⚠️ **IMPORTANT NOTE:** 
> 
> ```diff
> - Social login options (Google, Facebook, Twitter) are NOT IMPLEMENTED in this project.
> ```
> 
> These are placeholder UI elements only and do not have actual functionality.

### Login Page
<img width="1149" height="1018" alt="Screenshot 2025-07-21 222926" src="https://github.com/user-attachments/assets/98e7a9d9-f0a6-4a60-9c2f-1e65bb070bb5" />

### Dashboard / Product Catalog
<img width="1152" height="809" alt="Screenshot 2025-07-21 223025" src="https://github.com/user-attachments/assets/cae3c52c-9927-46b2-9c2c-669ab9e4963b" />

### Responsiveness
<img width="905" height="817" alt="Screenshot 2025-07-21 223259" src="https://github.com/user-attachments/assets/2e37d83f-f0d9-490a-8915-ee778c1d98dd" />


## 🛠️ Technologies Used

- **React 19** - UI Library
- **TypeScript** - Type checking and improved developer experience
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - API requests
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **DummyJSON** - Mock API for products and authentication

## API Endpoints

The application uses the following DummyJSON API endpoints:
- Authentication: `https://dummyjson.com/auth/login`
- Products: `https://dummyjson.com/products`
- Product search: `https://dummyjson.com/products/search`
- Categories: `https://dummyjson.com/products/categories`

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-2-frontend-assignment.git
   cd task-2-frontend-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see next section)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# API Configuration
VITE_API_URL=https://dummyjson.com

# Authentication Settings
VITE_AUTH_ENABLED=true

# Demo Mode Settings
VITE_DEMO_MODE=true  # Set to false in production

# Demo Credentials (for development only)
VITE_DEMO_USERNAME=kminchelle
VITE_DEMO_PASSWORD=0lelplR
```

> **Note:** For security reasons, do not commit your `.env` file to version control. A `.env.example` file has been included as a template.

## 📖 Usage

### Login

Use the demo credentials to log in:
- Username: `kminchelle`
- Password: `0lelplR`

Or register your own account (if supported by the API).

### Browsing Products

- Use the search bar to find specific products
- Filter products by category using the dropdown menu
- Sort products by name, price, or rating
- Click "Load More" to see additional products

### Logout

Click the logout button in the header to end your session.

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, etc.)
├── components/      # Reusable UI components
├── constants/       # Application constants
├── context/         # React context providers (auth, etc.)
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## 🧹 Code Quality

This project follows best practices for code quality:

- **TypeScript** for type safety
- **ESLint** for code linting
- **ErrorBoundary** for graceful error handling
- **Constants** for configuration values
- **Utilities** for reusable functions
- **Debounced search** for performance optimization
- **Environment variables** for configuration
- **Component-based architecture** for maintainability

## ⚠️ Limitations

- **`⚠️ IMPORTANT: Social login (Google, Facebook, Twitter) is not implemented`** - These buttons are UI elements only
- The application uses a mock API (DummyJSON) which has limited data
- Some features may be simulated due to API limitations
- The cart and checkout functionality is limited to UI demonstration

