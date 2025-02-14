# IANDAI - Backend API Service

## Overview

IANDAI is a backend service that serves as an API, connecting to a MongoDB database and the ChatGPT API. It provides data to a Next.js frontend. This README provides information on setting up and using the IANDAI backend service.

## Installation

Make sure you have Node.js installed on your machine.

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd iandai
``` 

3. Install dependencies:
```bash
npm install
```

## Configuration

### Environment Variables

Create a .env file in the project root and configure the following variables:

```env
# MongoDB Connection String
MONGO_URI=your-mongodb-connection-string

# ChatGPT API Key
OPENAI_API_KEY=your-chatgpt-api-key

# Port for the server
PORT=3000
```

## Project Structure

- app.js: Entry point for the application.
- controllers/: Contains controllers handling business logic.
- routes/: Defines API routes.
- config/: Configuration files (e.g., database connection).
- models/: MongoDB schema models.
- utils/: Utility functions.

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start at the specified port in the .env file (default is 3000).

