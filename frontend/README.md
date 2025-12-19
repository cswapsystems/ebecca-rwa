Ebecca

This is a Next.js
 project bootstrapped with create-next-app
.

Project Structure

This project follows a modular structure to ensure maintainability and scalability. Here's a breakdown of the folder structure:

/app

Contains page-specific files: The app directory is used for routing and page-specific components in Next.js 13+.

Example:

/home/index.tsx - The home page of the app, which collects and renders individual sections like Hero, Features, etc.

/about, /explore, /how-it-works - Separate folders for other pages in the app.

/components

Reusable UI components: This folder holds all the smaller, reusable UI components such as buttons, forms, modals, etc.

Example:

/common - For common UI elements like buttons, navigation, and headers.

/layout - For layout-specific components like header, footer, etc.

/styles

Global styles and theme management: This folder is responsible for global styles, themes, and utility classes used throughout the app.

Example:

globals.css - Global styles applied across all pages.

theme.css - Theme-related styling variables (colors, typography).

utils.module.css - Utility classes (e.g., margin, padding, etc.) to be reused throughout the app.

/types

TypeScript types: Contains all the type definitions used in the app, including types for components, props, and API responses.

/public

Static assets: This folder holds static files such as images, fonts, and other assets that are publicly available.

Example Folder Structure:
/src
├── /app
│   ├── /home
│   │   ├── /components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── NextEra.tsx
│   │   │   └── WhyEbecca.tsx
│   │   └── index.tsx          <-- HomePage (root)
│   ├── /about
│   ├── /explore
│   ├── /how-it-works
│   ├── globals.css
│   └── layout.tsx             <-- Global layout (e.g., header, footer)
├── /components                # Reusable components (buttons, modals, etc.)
├── /styles                    # Global and component-specific styles
├── /types                     # TypeScript types
└── /public                    # Static files (images, fonts)

Getting Started

To get started with the project, follow these steps:

Clone the Repository:

git clone <repository-url>
cd <project-folder>


Install Dependencies:

npm install
# or
yarn
# or
pnpm install


Run the Development Server:

npm run dev
# or
yarn dev
# or
pnpm dev


Open http://localhost:3000
 in your browser to see the result.

The page will automatically update as you edit files.

Editing the Home Page:

You can start editing the page by modifying app/home/index.tsx. The page auto-updates as you edit the file.