# Presight Exercise - Client

Frontend application for the Presight recruitment exercise.

## Features

- **Users Page**: Infinite scroll list of users with filtering by nationality and hobbies.
- **Text Streaming**: Real-time character-by-character text rendering from a streamed API response.
- **Jobs Queue**: Real-time job status tracking using WebSockets.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State & Data Fetching**: TanStack Query (React Query)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file based on `.env.example`:
    ```env
    VITE_API_URL=http://localhost:3000
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```
