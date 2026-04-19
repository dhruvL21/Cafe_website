# Cup o' Joy - Immersive Cafe Experience

This is a Next.js starter project for "Cup o' Joy", an immersive and aesthetic website for a fictional cafe. The project is built with Next.js, ShadCN UI, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/) (v10.x or later recommended)

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Install Dependencies

First, install the project dependencies using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

This project requires an API key for Google Maps for full functionality.

1.  Create a new file named `.env` in the root of your project directory.
2.  Add the following environment variable to the `.env` file, replacing the placeholder value with your actual API key:

    ```
    # For Google Maps display on the Location page
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    ```

    - You can get a **Google Maps API key** from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview).

### 3. Run the Development Server

Start the Next.js development server:
```bash
npm run dev
```
Your application will be available at `http://localhost:9002`.

Now you can access the application in your browser and start developing!

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the project files.
