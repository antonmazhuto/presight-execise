# Presight Exercise - Server

Backend API server for the Presight recruitment exercise.

## API Endpoints

- **Users**:
  - `GET /users`: Paginated users list with search and filtering.
  - `GET /users/stats`: Aggregated statistics for filters (top hobbies/nationalities).
- **Text Streaming**:
  - `GET /stream`: Real-time text response using chunked transfer encoding.
- **Jobs Queue**:
  - `POST /jobs`: Create a new asynchronous job.
  - **WebSockets**: Real-time job completion notifications via Socket.io.

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Real-time**: Socket.io
- **Data Mocking**: Faker.js

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file based on `.env.example`:
    ```env
    PORT=3000
    FRONTEND_ORIGIN=http://localhost:5173
    ```

3.  **Run development server**:
    ```bash
    npm run start:dev
    ```

4.  **Run tests**:
    ```bash
    npm run test
    ```
