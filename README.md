# MPFSDC - Madhya Pradesh Forest State Development Corporation

A modern web application for the Madhya Pradesh Forest State Development Corporation built with React, Vite, and Tailwind CSS.

## Features

- **Multi-language Support**: Hindi and English language switching
- **Accessibility Features**: Comprehensive accessibility panel for better user experience
- **Search Functionality**: Global search modal across all content
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Client-side Routing**: React Router for smooth navigation
- **Context Management**: Global state management with React Context

## Pages

- **Home**: Main landing page with overview
- **About Us**: Information about MPFSDC
- **Services**: Detailed services offered
- **Projects**: Current and past projects
- **Auctions**: Forest auction information
- **Gallery**: Photo gallery of activities
- **Tenders**: Current tender opportunities
- **Contact**: Contact information and form

## Technology Stack

- **Frontend**: React 19.2.5
- **Routing**: React Router DOM 7.15.0
- **Build Tool**: Vite 8.0.10
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Language**: JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccessibilityPanel.jsx
│   ├── SearchModal.jsx
│   └── ...
├── context/             # React Context providers
│   ├── LanguageContext.jsx
│   └── AppContext.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   └── ...
├── assets/             # Static assets
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## React Compiler

The React Compiler is enabled on this project. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
